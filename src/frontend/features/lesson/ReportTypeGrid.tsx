import { SelectGrid } from '@ui/molecules';
import type { ReportType } from '@/models';

interface ReportTypeGridProps {
  value:            ReportType | null;
  onChange:         (type: ReportType) => void;
  phoneticLabel:    string;
  audioLabel:       string;
  spellingLabel:    string;
  translationLabel: string;
}

export function ReportTypeGrid({ value, onChange, phoneticLabel, audioLabel, spellingLabel, translationLabel }: ReportTypeGridProps) {
  const items = [
    { id: 'phonetic',    label: phoneticLabel },
    { id: 'audio',       label: audioLabel },
    { id: 'spelling',    label: spellingLabel },
    { id: 'translation', label: translationLabel },
  ];

  function handleSelect(id: string) {
    onChange(id as ReportType);
  }

  return <SelectGrid items={items} selected={value ?? undefined} onSelect={handleSelect} />;
}
