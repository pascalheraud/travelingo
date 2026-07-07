import { IDB_STORES } from '@/models';
import type { TargetLangCode } from '@/models';
import { Store } from './Store';
import type { ActiveLangsService } from './ActiveLangsService';
import type { IdbService } from './IdbService';

/** Stores purged when a target language is no longer active — everything keyed `{targetLang}:...`. */
const PREFIXED_PURGEABLE_STORES = [
  IDB_STORES.TRANSLATION_PACKS,
  IDB_STORES.AUDIO,
  IDB_STORES.PROGRESS,
  IDB_STORES.PLACEMENT,
];

export class ActiveLangsStore extends Store<TargetLangCode[]> {
  constructor(
    private readonly service: ActiveLangsService,
    private readonly idb: IdbService,
  ) {
    super(service.load());
  }

  add = (lang: TargetLangCode): void => {
    this.setValue(this.service.add(this.getSnapshot(), lang));
  };

  remove = (lang: TargetLangCode): void => {
    this.setValue(this.service.remove(this.getSnapshot(), lang));
    void this.purgeUnreferenced(lang);
  };

  /** Per `doc/initial-spec.md` §10.5: a removed language is no longer referenced by the app, so its offline data is deleted. */
  private async purgeUnreferenced(lang: TargetLangCode): Promise<void> {
    const prefix = `${lang}:`;
    await Promise.all([
      this.idb.del(IDB_STORES.LEARNING_PACKS, lang),
      this.idb.del(IDB_STORES.NEW_LESSONS, lang),
      ...PREFIXED_PURGEABLE_STORES.map((store) => this.idb.purgeByPrefix(store, prefix)),
    ]);
  }
}
