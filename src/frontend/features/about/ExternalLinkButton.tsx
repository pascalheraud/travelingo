import { Button } from '@ui/atoms';

interface ExternalLinkButtonProps {
  label: string;
  href:  string;
}

export function ExternalLinkButton({ label, href }: ExternalLinkButtonProps) {
  function handleClick() {
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <Button variant="secondary" fullWidth onClick={handleClick}>{label}</Button>
  );
}
