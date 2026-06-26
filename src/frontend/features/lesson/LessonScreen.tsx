import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { useParams } from 'react-router-dom';
import styles from './LessonScreen.module.scss';
import { AppHeader } from '@features/layout';
import { LoadingState } from '@ui/organisms';
import { QuizCard } from './QuizCard';
import { ChoiceGrid, type ChoiceItem } from './ChoiceGrid';
import { ActionBar } from './ActionBar';
import { FeedbackBanner } from './FeedbackBanner';
import { LessonDoneScreen } from './LessonDoneScreen';
import { ReviewDoneScreen } from './ReviewDoneScreen';
import { GrammarSheet } from './GrammarSheet';
import { ReportSheet } from './ReportSheet';
import { DevPanel, DevPanelButton } from '@features/dev';
import { useUserLang } from '@contexts/UserLangContext';
import { useManifestContext } from '@contexts/ManifestContext';
import {
  gameServiceInstance, audioServiceInstance, packsStoreInstance, progressStoreInstance, progressServiceInstance,
  i18nServiceInstance, langsServiceInstance, reportServiceInstance, WIN_TARGET,
  type GameService, type AudioService, type PacksStore, type ProgressStore, type ProgressService, type I18nService, type LangsService, type ReportService,
} from '@services';
import { useAppNavigate } from '@/useAppNavigate';
import { buildRoute, ROUTES } from '@/routes';
import type { TargetLangCode, LessonId, GameState, AnswerResult, LessonMode, ReportType } from '@/models';

interface LessonScreenProps {
  gameService?:     GameService;
  audioService?:    AudioService;
  packsStore?:      PacksStore;
  progressStore?:   ProgressStore;
  progressService?: ProgressService;
  i18nService?:     I18nService;
  langsService?:    LangsService;
  reportService?:   ReportService;
}

export function LessonScreen({
  gameService = gameServiceInstance,
  audioService = audioServiceInstance,
  packsStore = packsStoreInstance,
  progressStore = progressStoreInstance,
  progressService = progressServiceInstance,
  i18nService = i18nServiceInstance,
  langsService = langsServiceInstance,
  reportService = reportServiceInstance,
}: LessonScreenProps) {
  const { code, lessonId } = useParams<{ code: TargetLangCode; lessonId: LessonId }>();
  const navigate = useAppNavigate();
  const { userLang } = useUserLang();
  const { manifest } = useManifestContext();
  const strings = i18nService.getStrings(userLang);

  const targetLang = code as TargetLangCode;
  const packRef = manifest.learningPacks.find((p) => p.targetLang === targetLang);

  const packPairKey = packsStore.packPairKey(targetLang, userLang);
  packsStore.load(targetLang, userLang);
  const packPairState = useSyncExternalStore(packsStore.subscribe, () => packsStore.getSnapshot(packPairKey));
  const packPair = packPairState.status === 'loaded' ? packPairState.value : undefined;

  const progressKey = progressService.progressKey(targetLang, lessonId as LessonId);
  progressStore.load(targetLang, lessonId as LessonId);
  const progressState = useSyncExternalStore(progressStore.subscribe, () => progressStore.getSnapshot(progressKey));
  const initialProgress = progressState.status === 'loaded' ? progressState.value : undefined;

  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [pendingGame, setPendingGame] = useState<GameState | undefined>(undefined);
  const [selected, setSelected] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const [result, setResult] = useState<AnswerResult | undefined>(undefined);
  const [lessonDone, setLessonDone] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewCorrect, setReviewCorrect] = useState(0);
  const [showGrammar, setShowGrammar] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const lessonMetaForGuard = packPair?.learningPack?.lessons.find((l) => l.id === lessonId);
  const lessonExists = packPair?.learningPack ? lessonMetaForGuard !== undefined : undefined;
  const lessonMastered = lessonMetaForGuard && initialProgress
    ? initialProgress.doneIds.length >= lessonMetaForGuard.phrases.length
    : false;

  useEffect(() => {
    if (!packRef) {
      navigate(ROUTES.dashboard, { replace: true });
      return;
    }
    if (packPairState.status === 'empty' || lessonExists === false) {
      navigate(buildRoute.langHome(targetLang), { replace: true });
    }
  }, [packRef, packPairState.status, lessonExists, navigate, targetLang]);

  if (!game && packPair?.learningPack && progressState.status !== 'loading') {
    if (lessonMastered && initialProgress) {
      const reviewGame = gameService.initReview(packPair.learningPack, lessonId as LessonId, initialProgress);
      setGame(reviewGame);
      setReviewMode(true);
      setReviewTotal(reviewGame.active.length + reviewGame.waiting.length);
    } else {
      setGame(gameService.initGame(packPair.learningPack, lessonId as LessonId, initialProgress));
    }
  }

  const current = game?.active[0];

  const choices = useMemo<ChoiceItem[]>(() => {
    if (!game || !current || !packPair?.translationPack) return [];
    const targets = gameService.getChoices(game, current);
    const pool = [...game.active, ...game.waiting, ...game.done];
    const lessonTranslation = packPair.translationPack!.lessons.find((l) => l.id === lessonId);
    return targets.map((target) => {
      const phrase = pool.find((p) => p.target === target)!;
      const tr = lessonTranslation?.phrases.find((p) => p.id === phrase.id);
      return { phraseId: phrase.id, target, phonetic: tr?.phonetic ?? '' };
    });
  }, [game, current, packPair, gameService]);

  if (!packPair?.learningPack || !packPair?.translationPack || !game || !current) {
    return <LoadingState />;
  }

  const learningPack = packPair.learningPack;
  const translationPack = packPair.translationPack;
  const lessonIndex = learningPack.lessons.findIndex((l) => l.id === lessonId);
  const lessonMeta = learningPack.lessons.find((l) => l.id === lessonId);
  const totalPhrases = lessonMeta?.phrases.length ?? 0;
  const lessonTranslationMeta = translationPack.lessons.find((l) => l.id === lessonId);
  const lessonHeaderTitle = `${lessonIndex + 1}. ${lessonTranslationMeta?.title ?? ''}`;
  const currentTr = lessonTranslationMeta?.phrases.find((p) => p.id === current.id);
  const targetName = langsService.getLangName(targetLang, userLang);

  function handleBack() {
    navigate(buildRoute.langHome(targetLang));
  }

  function handleLearnMore() {
    setShowGrammar(true);
  }

  function handleReport() {
    setShowReport(true);
  }

  async function handleSubmitReport(type: ReportType, comment: string) {
    if (!current) return;
    await reportService.submitReport({
      phraseId:   current.id,
      targetLang,
      sourceLang: userLang,
      lessonId:   lessonId as LessonId,
      type,
      comment,
      appVersion: manifest.appVersion,
      reportedAt: new Date().toISOString(),
    });
  }

  async function handlePlayAudio(phraseId: string) {
    await audioService.playPhraseAudio(targetLang, lessonId as LessonId, phraseId);
  }

  function handleSelect(target: string) {
    if (validated) return;
    setSelected(target);
    const choice = choices.find((c) => c.target === target);
    if (choice) void handlePlayAudio(choice.phraseId);
  }

  async function handleValidate() {
    if (!selected || !current) return;
    const { result: answerResult, nextGame } = reviewMode
      ? gameService.applyAnswer(game, current, selected, WIN_TARGET, true)
      : gameService.applyAnswer(game, current, selected);
    setValidated(true);
    setResult(answerResult);
    setPendingGame(nextGame);
    if (reviewMode) {
      if (answerResult.correct) setReviewCorrect((c) => c + 1);
    } else {
      await persistProgress(nextGame);
    }
  }

  async function persistProgress(nextGame: GameState) {
    const scores: Record<string, number> = {};
    [...nextGame.active, ...nextGame.waiting].forEach((p) => { scores[p.id] = p.score; });
    const mode: LessonMode = initialProgress?.mode ?? 'text';
    await progressStore.save(targetLang, lessonId as LessonId, {
      scores,
      doneIds: nextGame.done.map((p) => p.id),
      mode,
      savedAt: new Date().toISOString(),
    });
  }

  async function handleDevValidatePhrase() {
    if (validated || !current) return;
    setSelected(current.target);
    const { result: answerResult, nextGame } = reviewMode
      ? gameService.applyAnswer(game, current, current.target, WIN_TARGET, true)
      : gameService.applyAnswer(game, current, current.target, 1);
    setValidated(true);
    setResult(answerResult);
    setPendingGame(nextGame);
    if (reviewMode) {
      if (answerResult.correct) setReviewCorrect((c) => c + 1);
    } else {
      await persistProgress(nextGame);
    }
  }

  async function handleDevMarkAllComplete() {
    if (!game) return;
    const remaining = [...game.active, ...game.waiting];

    if (reviewMode) {
      setReviewCorrect((c) => c + remaining.length);
      setReviewDone(true);
      return;
    }

    const scores: Record<string, number> = {};
    game.done.forEach((p) => { scores[p.id] = p.score; });
    remaining.forEach((p) => { scores[p.id] = WIN_TARGET; });
    const doneIds = [...game.done, ...remaining].map((p) => p.id);
    const mode: LessonMode = initialProgress?.mode ?? 'text';
    await progressStore.save(targetLang, lessonId as LessonId, {
      scores,
      doneIds,
      mode,
      savedAt: new Date().toISOString(),
    });
    setLessonDone(true);
  }

  async function handleDevReset() {
    await progressStore.reset(targetLang, lessonId as LessonId);
    setGame(undefined);
    setPendingGame(undefined);
    setSelected(null);
    setValidated(false);
    setResult(undefined);
    setLessonDone(false);
    setReviewMode(false);
    setReviewDone(false);
    setReviewCorrect(0);
    setReviewTotal(0);
  }

  function handleContinue() {
    if (!pendingGame) return;
    if (result?.lessonDone) {
      if (reviewMode) {
        setReviewDone(true);
      } else {
        setLessonDone(true);
      }
      setPendingGame(undefined);
      setSelected(null);
      setValidated(false);
      setResult(undefined);
      return;
    }
    setGame(pendingGame);
    setPendingGame(undefined);
    setSelected(null);
    setValidated(false);
    setResult(undefined);
  }

  function handleStartReview() {
    if (!packPair?.learningPack || !initialProgress) return;
    const reviewGame = gameService.initReview(packPair.learningPack, lessonId as LessonId, initialProgress);
    setReviewMode(true);
    setLessonDone(false);
    setReviewDone(false);
    setReviewCorrect(0);
    setReviewTotal(reviewGame.active.length + reviewGame.waiting.length);
    setGame(reviewGame);
    setSelected(null);
    setValidated(false);
    setResult(undefined);
  }

  if (lessonDone) {
    return (
      <LessonDoneScreen
        title={strings.doneLessons}
        description={strings.doneDesc}
        backLabel={strings.backHome}
        reviewLabel={strings.review}
        onBack={handleBack}
        onReview={handleStartReview}
      />
    );
  }

  if (reviewDone) {
    return (
      <ReviewDoneScreen
        title={strings.reviewDone}
        scoreLabel={strings.reviewScore}
        correctCount={reviewCorrect}
        totalCount={reviewTotal}
        incentiveLabel={strings.reviewIncentive}
        restartLabel={strings.reviewRestart}
        backLabel={strings.backHome}
        onRestart={handleStartReview}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className={styles.screen}>
      <AppHeader
        title={lessonHeaderTitle}
        subtitle={reviewMode ? `${game.done.length}/${reviewTotal} ${strings.phrases}` : `${game.done.length}/${totalPhrases} ${strings.phrases}`}
        progress={reviewMode ? (game.done.length / reviewTotal) * 100 : (game.done.length / totalPhrases) * 100}
        onBack={handleBack}
        compact
      />
      <div className={styles.body}>
        <QuizCard
          targetLang={targetLang}
          howToSay={strings.howToSay}
          targetName={targetName}
          source={currentTr?.source ?? ''}
        >
          <ChoiceGrid
            choices={choices}
            selected={selected}
            validated={validated}
            correctTarget={current.target}
            onSelect={handleSelect}
            onPlayAudio={handlePlayAudio}
          />
        </QuizCard>
        <div className={styles.inset}>
          <ActionBar
            validated={validated}
            selected={selected}
            validateLabel={strings.validate}
            nextLabel={strings.next}
            onValidate={handleValidate}
            onContinue={handleContinue}
          />
          {validated && result && (
            <FeedbackBanner
              correct={result.correct}
              correctTarget={result.correctTarget}
              bravoLabel={strings.bravo}
              wrongLabel={strings.wrongAnswer}
            />
          )}
          {validated && (
            <>
              <button className={styles.learnMore} onClick={handleLearnMore}>{strings.learnMore}</button>
              <button className={styles.report} onClick={handleReport}>{strings.report}</button>
            </>
          )}
        </div>
      </div>
      <GrammarSheet
        open={showGrammar}
        source={currentTr?.source ?? ''}
        target={current.target}
        grammar={currentTr?.grammar ?? ''}
        complements={currentTr?.complements ?? []}
        titleLabel={strings.grammar}
        explanationLabel={strings.explanation}
        toRememberLabel={strings.toRemember}
        closeLabel={strings.close}
        onClose={() => setShowGrammar(false)}
      />
      <ReportSheet
        open={showReport}
        source={currentTr?.source ?? ''}
        target={current.target}
        strings={strings}
        onClose={() => setShowReport(false)}
        onSubmit={handleSubmitReport}
      />
      {import.meta.env.DEV && (
        <DevPanel>
          <DevPanelButton label="Validate phrase" onClick={handleDevValidatePhrase} />
          <DevPanelButton label="Mark all complete" onClick={handleDevMarkAllComplete} />
          <DevPanelButton label="Reset progress" onClick={handleDevReset} />
        </DevPanel>
      )}
    </div>
  );
}
