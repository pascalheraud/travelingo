import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LessonScreen } from './LessonScreen';
import type {
  GameService, AudioService, PacksStore, ProgressStore, ProgressService, I18nService, LangsService, ReportService, PackPair,
} from '@services';
import type { LoadState } from '@services/Store';
import type {
  AppStrings, GameState, AnswerResult, LearningPack, TranslationPack,
} from '@/models';

function makeLearningPack(): LearningPack {
  return {
    uuid: 'lp1', targetLang: 'en', version: '1', createdAt: '2024-01-01',
    lessons: [{ id: 'l01', emoji: '👋', phrases: [
      { id: 'p001', target: 'Hello', audio: 'p01_001_v1.mp3' },
      { id: 'p002', target: 'Goodbye', audio: 'p01_002_v1.mp3' },
    ] }],
  };
}

function makeTranslationPack(): TranslationPack {
  return {
    uuid: 'tp1', learningPackRef: 'lp1', targetLang: 'en', sourceLang: 'fr', version: '1', createdAt: '2024-01-01',
    lessons: [{ id: 'l01', title: 'Greetings', subtitle: 'Say hello', phrases: [
      { id: 'p001', source: 'Bonjour', phonetic: 'hɛˈloʊ', grammar: 'Comes from Old English.', complements: [] },
      { id: 'p002', source: 'Au revoir', phonetic: 'ɡʊdˈbaɪ', grammar: '', complements: [] },
    ] }],
  };
}

function makeGame(): GameState {
  return {
    active: [{ id: 'p001', target: 'Hello', audio: 'a.mp3', score: 0 }],
    waiting: [{ id: 'p002', target: 'Goodbye', audio: 'b.mp3', score: 0 }],
    done: [],
  };
}

const PACK_PAIR_STATE: LoadState<PackPair> = {
  status: 'loaded',
  value: { learningPack: makeLearningPack(), translationPack: makeTranslationPack() },
};

const EMPTY_PROGRESS_STATE: LoadState<unknown> = { status: 'empty' };

function makePacksStore(): PacksStore {
  return {
    packPairKey: () => 'key',
    load: () => {},
    subscribe: () => () => {},
    getSnapshot: () => PACK_PAIR_STATE,
  } as unknown as PacksStore;
}

function makeProgressStore(): ProgressStore {
  return {
    subscribe: () => () => {},
    getSnapshot: () => EMPTY_PROGRESS_STATE,
    load: () => {},
    save: () => Promise.resolve(),
    reset: () => Promise.resolve(),
  } as unknown as ProgressStore;
}

function makeProgressService(): ProgressService {
  return { progressKey: () => 'progress-key' } as unknown as ProgressService;
}

function makeGameService(game: GameState, answerResult: AnswerResult): GameService {
  return {
    initGame: () => game,
    getChoices: () => ['Hello', 'Goodbye'],
    applyAnswer: () => ({ result: answerResult, nextGame: game }),
  } as unknown as GameService;
}

function makeI18nService(): I18nService {
  return {
    getStrings: () => ({
      howToSay: 'How do you say', validate: 'Check', next: 'Continue', bravo: 'Correct!',
      wrongAnswer: 'Wrong, it was:', learnMore: 'Learn more', report: 'Report', grammar: 'Grammar',
      explanation: 'Explanation', toRemember: 'Key points', close: 'Close', reportOn: 'Which phrase?',
      reportType: 'Error type', reportPhonetic: 'Phonetics', reportAudio: 'Audio', reportSpelling: 'Spelling',
      reportTranslation: 'Translation', reportPlaceholder: 'Add details…', reportSend: 'Send',
      reportThanks: 'Thank you!', reportSent: 'Sent.', cancel: 'Cancel', doneLessons: 'Lesson mastered!',
      doneDesc: 'Well done.', backHome: 'Back home',
    } as AppStrings),
  } as I18nService;
}

function makeLangsService(): LangsService {
  return { getLangName: () => 'English' } as unknown as LangsService;
}

function makeReportService(): ReportService {
  return { submitReport: () => Promise.resolve() } as unknown as ReportService;
}

function renderScreen(answerResult: AnswerResult = {
  correct: true, selectedTarget: 'Hello', correctTarget: 'Hello', phraseId: 'p001', newScore: 1, phraseDone: false, lessonDone: false,
}) {
  const game = makeGame();
  return render(
    <MemoryRouter initialEntries={['/lang/en/lesson/l01']}>
      <Routes>
        <Route
          path="/lang/:code/lesson/:lessonId"
          element={
            <LessonScreen
              gameService={makeGameService(game, answerResult)}
              audioService={{ playPhraseAudio: () => Promise.resolve() } as unknown as AudioService}
              packsStore={makePacksStore()}
              progressStore={makeProgressStore()}
              progressService={makeProgressService()}
              i18nService={makeI18nService()}
              langsService={makeLangsService()}
              reportService={makeReportService()}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LessonScreen', () => {
  it('renders the question and the choices', () => {
    renderScreen();
    expect(screen.getByText('« Bonjour »')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Goodbye')).toBeInTheDocument();
  });

  it('enables validate once a choice is selected, then shows feedback on validate', async () => {
    renderScreen();
    expect(screen.getByText('Check')).toBeDisabled();
    fireEvent.click(screen.getByText('Hello'));
    expect(screen.getByText('Check')).not.toBeDisabled();
    fireEvent.click(screen.getByText('Check'));
    expect(await screen.findByText('Correct!')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('shows the lesson-done screen after continuing past a lessonDone result', async () => {
    renderScreen({
      correct: true, selectedTarget: 'Hello', correctTarget: 'Hello', phraseId: 'p001', newScore: 3, phraseDone: true, lessonDone: true,
    });
    fireEvent.click(screen.getByText('Hello'));
    fireEvent.click(screen.getByText('Check'));
    await screen.findByText('Correct!');
    fireEvent.click(screen.getByText('Continue'));
    expect(await screen.findByText('Lesson mastered!')).toBeInTheDocument();
  });

  it('opens the grammar sheet via the learn-more link', async () => {
    renderScreen();
    fireEvent.click(screen.getByText('Hello'));
    fireEvent.click(screen.getByText('Check'));
    await screen.findByText('Correct!');
    fireEvent.click(screen.getByText('Learn more'));
    expect(screen.getByText('Comes from Old English.')).toBeInTheDocument();
  });
});
