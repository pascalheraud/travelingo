# Travelingo — Phase Publication sur le store Android

**Langue du code et de la documentation :** English (code and docs in English).

## Objectif

Préparer et valider la publication Google Play d'une application Android Capacitor 6 basée sur Travelingo. Cette phase couvre la production d'un AAB signé, la configuration des métadonnées Play Store et la mise en place d'un workflow de build/release sécurisé.

## Ce qui est attendu

- Build Android Capacitor 6 stable et testable.
- AAB de production signé prêt pour le Play Store.
- Fiche Play Store complète : description, captures écran, icônes, politique de confidentialité.
- GitHub Actions de release avec gestion sécurisée du keystore.
- Données produit conformes : analytics contrôlé, monitoring natif, politique de confidentialité accessible.

## Pré-requis

- Application React/Vite fonctionnelle pour la cible Android.
- Capacitor 6 installé et synchronisé avec le projet.
- `android` platform déjà ajoutée.
- Structure de navigation prête : support React Router et compatibilité avec le bouton Android Back.
- Identifiants de version Android configurés : `versionCode`, `versionName`, `minSdkVersion`, `targetSdkVersion`.

## Étapes de préparation Android

1. Vérifier la configuration Capacitor
   - `capacitor.config.ts` ou `capacitor.config.json` correct.
   - `server.url` retiré en production.
   - `appId`, `appName`, icônes et splash screen définis.

2. Synchroniser le Web build vers Android
   - `npm run build`
   - `npx cap sync android`

3. Tester l'application en mode debug
   - `npx cap open android`
   - construire et installer un APK debug.
   - vérifier l'affichage, le WebView, le back button et le stockage IndexedDB.

4. Vérifier les assets Android
   - icônes app valides pour toutes les densités.
   - `AndroidManifest.xml` sans erreurs.
   - ressources de splash screen et thème Android valides.

5. Configurer la signature
   - générer ou réutiliser un keystore sécurisé.
   - stocker les secrets dans GitHub Actions : `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`.

## Publication Play Store

- Choisir AAB comme format de production.
- Préparer une fiche produit claire et concise.
- Ajouter captures écran et icônes correspondantes.
- Ajouter la politique de confidentialité et la mention de l'analytics si utilisé.
- Remplir la page Data Safety selon les dépendances et la collecte de données.
- Générer des notes de version alignées sur le contenu et les fonctionnalités.

## Workflow GitHub Actions recommandé

- `build-dev.yml` : build debug APK pour tests rapides.
- `build-release.yml` : build release AAB signé pour Play Store.

Le workflow release doit :

- installer Node.js et dépendances,
- compiler l'app Vite,
- exécuter `npx cap sync android`,
- construire l'AAB Android,
- signer et vérifier l'AAB,
- publier l'artefact sur une GitHub Release ou un stockage sécurisé.

## Contrôles qualité spécifiques Android

- Back button Android fonctionnel et non bloquant.
- WebView Android charge l'app depuis `capacitor://localhost/`.
- Test sur appareil réel ou émulateur mid-range.
- Aucun élément fixe empêchant l'accès au clavier.
- Sentry et analytics activés uniquement en production.
- Politique de confidentialité accessible depuis l'app.

## Ce qui reste Phase 2

- Toute extension multilingue de contenu (packs cibles FR, ES, IT, DE, RO).
- Tout nouveau flux métier ajouté après l'architecture de navigation.
- Les écrans de test de placement et les éventuelles fonctionnalités vocales.
- Les adaptions UI/UX spécifiques aux langues cibles supplémentaires.
