import { fireEvent, render, screen } from '@testing-library/react';
import { LessonList } from './LessonList';
import type { PacksService, I18nService } from '@services';
import type { LearningPack, TranslationPack, LessonSummary, AppStrings } from '@/models';

function makeSummaries(): LessonSummary[] {
  return [
    { id: 'l01', emoji: '👋', title: 'Greetings', subtitle: 'Say hello', donePhrases: 2, totalPhrases: 10, isNew: false },
  ];
}

function makePacksService(summaries: LessonSummary[]): PacksService {
  return { buildLessonSummaries: () => summaries } as unknown as PacksService;
}

function makeI18nService(): I18nService {
  return { getStrings: () => ({ allMastered: 'Everything mastered!', allMasteredDesc: 'Come back later.' } as AppStrings) } as I18nService;
}

describe('LessonList', () => {
  it('renders a lesson card per summary', () => {
    render(
      <LessonList
        learningPack={{} as LearningPack}
        translationPack={{} as TranslationPack}
        progressByLesson={{}}
        onSelectLesson={() => {}}
        packsService={makePacksService(makeSummaries())}
        i18nService={makeI18nService()}
      />,
    );
    expect(screen.getByText('Greetings')).toBeInTheDocument();
  });

  it('calls onSelectLesson with the lesson id when a card is started', () => {
    const onSelectLesson = vi.fn();
    render(
      <LessonList
        learningPack={{} as LearningPack}
        translationPack={{} as TranslationPack}
        progressByLesson={{}}
        onSelectLesson={onSelectLesson}
        packsService={makePacksService(makeSummaries())}
        i18nService={makeI18nService()}
      />,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onSelectLesson).toHaveBeenCalledWith('l01');
  });

  it('shows the all-mastered card when every lesson is fully done', () => {
    const summaries: LessonSummary[] = [
      { id: 'l01', emoji: '👋', title: 'Greetings', subtitle: 'Say hello', donePhrases: 10, totalPhrases: 10, isNew: false },
    ];
    render(
      <LessonList
        learningPack={{} as LearningPack}
        translationPack={{} as TranslationPack}
        progressByLesson={{}}
        onSelectLesson={() => {}}
        packsService={makePacksService(summaries)}
        i18nService={makeI18nService()}
      />,
    );
    expect(screen.getByText('🏆 Everything mastered!')).toBeInTheDocument();
  });

  it('does not show the all-mastered card when no lessons exist', () => {
    render(
      <LessonList
        learningPack={{} as LearningPack}
        translationPack={{} as TranslationPack}
        progressByLesson={{}}
        onSelectLesson={() => {}}
        packsService={makePacksService([])}
        i18nService={makeI18nService()}
      />,
    );
    expect(screen.queryByText(/Everything mastered/)).toBeNull();
  });
});
