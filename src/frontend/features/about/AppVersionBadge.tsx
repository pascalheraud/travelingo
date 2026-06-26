import { Badge } from '@ui/atoms';
import { useUserLang } from '@contexts/UserLangContext';
import { i18nServiceInstance, type I18nService } from '@services';
import type { AppVersion } from '@/models';

interface AppVersionBadgeProps {
  version:      AppVersion;
  i18nService?: I18nService;
}

export function AppVersionBadge({ version, i18nService = i18nServiceInstance }: AppVersionBadgeProps) {
  const { userLang } = useUserLang();
  const strings = i18nService.getStrings(userLang);

  return <Badge label={`${strings.version} ${version}`} color="gray" size="sm" />;
}
