import styles from './LessonList.module.scss';
import { LessonCard } from './LessonCard';
import { Card } from '@ui/organisms';
import { useUserLang } from '@contexts/UserLangContext';
import { packsServiceInstance, i18nServiceInstance, type PacksService, type I18nService } from '@services';
import type { LearningPack, TranslationPack, LessonSummary, LessonProgress, LessonId } from '@/models';

interface LessonListProps {
  learningPack:     LearningPack;
  translationPack:  TranslationPack;
  progressByLesson: Partial<Record<LessonId, LessonProgress | undefined>>;
  newLessonIds?:    LessonId[];
  onSelectLesson:   (lessonId: string) => void;
  packsService?:    PacksService;
  i18nService?:     I18nService;
}

export function LessonList({
  learningPack, translationPack, progressByLesson, newLessonIds = [], onSelectLesson,
  packsService = packsServiceInstance,
  i18nService = i18nServiceInstance,
}: LessonListProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);
  const summaries = packsService.buildLessonSummaries(learningPack, translationPack, progressByLesson, newLessonIds);
  const allMastered = summaries.length > 0 && summaries.every((s) => s.totalPhrases > 0 && s.donePhrases >= s.totalPhrases);

  function handleStartLesson(lessonId: string) {
    onSelectLesson(lessonId);
  }

  function LessonItem(summary: LessonSummary, index: number) {
    return (
      <LessonCard
        key={summary.id}
        number={index + 1}
        emoji={summary.emoji}
        title={summary.title}
        subtitle={summary.subtitle}
        donePhrases={summary.donePhrases}
        totalPhrases={summary.totalPhrases}
        isNew={summary.isNew}
        onStart={() => handleStartLesson(summary.id)}
      />
    );
  }

  return (
    <div className={styles.list}>
      {allMastered && (
        <Card className={styles.allMasteredCard}>
          <p className={styles.allMasteredTitle}>🏆 {strings.allMastered}</p>
          <p className={styles.allMasteredDesc}>{strings.allMasteredDesc}</p>
        </Card>
      )}
      {summaries.map(LessonItem)}
    </div>
  );
}
