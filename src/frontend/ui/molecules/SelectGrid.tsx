import styles from './SelectGrid.module.scss';
import { ChipButton } from '@ui/atoms';

interface SelectGridItem {
  id:      string;
  label:   string;
  icon?:   React.ReactNode;
}

interface SelectGridProps {
  items:      SelectGridItem[];
  selected?:  string;
  onSelect:   (id: string) => void;
}

export function SelectGrid({ items, selected, onSelect }: SelectGridProps) {
  function SelectGridOption(item: SelectGridItem) {
    function handleClick() {
      onSelect(item.id);
    }

    return (
      <ChipButton key={item.id} label={item.label} icon={item.icon} selected={item.id === selected} onClick={handleClick} />
    );
  }

  return (
    <div className={styles.grid}>
      {items.map(SelectGridOption)}
    </div>
  );
}
