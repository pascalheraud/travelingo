# Outil — Découpage audio d'une leçon (audio-splitter)

## Objectif

Un script qui prend un seul fichier MP3 contenant les 10 phrases d'une leçon, enregistrées à la suite et séparées par des blancs (silences) de quelques secondes, et qui produit les 10 fichiers MP3 individuels au format attendu par les packs d'apprentissage (voir `doc/initial-spec.md` §"Audio is the exception to..."), prêts à être déposés dans `src/frontend/public/fixtures/learning/{targetLang}/audio/{lessonId}/`.

## Entrée

Un seul fichier audio source contenant exactement 10 phrases, dans l'ordre `p001` → `p010`, chacune séparée de la suivante par un silence d'au moins quelques secondes (silence de début/fin du fichier toléré).

## Usage en ligne de commande

```
audio-splitter <source.mp3> <lessonNum> <version> <destDir>
```

| Paramètre    | Exemple   | Description                                                                 |
|--------------|-----------|-------------------------------------------------------------------------------|
| `source.mp3` | `raw.mp3` | Chemin du fichier MP3 source contenant les 10 phrases                        |
| `lessonNum`  | `1`       | Numéro de la leçon (entier, formaté en 2 chiffres dans le nom de sortie)      |
| `version`    | `1`       | Numéro de version audio `vX` (entier, sans le préfixe `v`)                   |
| `destDir`    | `audio/l01/` | Dossier de destination où écrire les 10 fichiers découpés                 |

Exemple :

```
audio-splitter raw_lesson1.mp3 1 1 src/frontend/public/fixtures/learning/en/audio/l01/
```

Appelé sans aucun paramètre, le script affiche un message d'usage (rappel des 4 paramètres attendus et de l'exemple ci-dessus) sur la sortie standard et se termine sans erreur.

## Sortie

10 fichiers MP3 dans `destDir`, nommés selon la convention du pack (`doc/initial-spec.md`) :

```
p{lessonNum:2 chiffres}_{phraseNum:3 chiffres}_v{version}.mp3
```

Soit pour `lessonNum=1`, `version=1` :

```
p01_001_v1.mp3
p01_002_v1.mp3
...
p01_010_v1.mp3
```

## Comportement de découpage

1. Détecter les silences dans le fichier source (seuil de niveau sonore + durée minimale de silence configurables, avec des valeurs par défaut raisonnables — ex. silence ≥ 1.5s sous -35dB).
2. En déduire les segments non-silencieux (les phrases) — il doit y en avoir exactement 10.
   - Si le nombre de segments détectés est différent de 10, l'outil échoue avec un message d'erreur explicite (nombre de segments trouvés, et suggestion d'ajuster les seuils de détection de silence) plutôt que d'écrire un résultat partiel ou incorrect.
3. Pour chaque segment, découper sans les silences environnants (avec une petite marge de quelques dizaines de ms de chaque côté pour ne pas couper le début/la fin de la phrase), et exporter en MP3.
4. Écrire les 10 fichiers dans `destDir`, créé s'il n'existe pas.

## Erreurs à gérer

- Fichier source introuvable ou illisible.
- Nombre de segments détectés ≠ 10 (voir ci-dessus).
- `destDir` non accessible en écriture.

## Hors scope

- L'outil ne modifie pas le JSON du pack (champ `audio` des phrases) ni `languages.ts` — ces mises à jour restent faites manuellement ou via le skill `travelingo-pack-generation`, qui référencera le nom de fichier produit par cet outil.
- L'outil ne génère pas l'audio (pas de TTS) : il se contente de découper un enregistrement déjà fourni.
- Pas de normalisation de volume ni d'autres traitements audio au-delà du découpage des silences.

## Implémentation suggérée

Script Node.js ou Python s'appuyant sur `ffmpeg` (détection de silence via `silencedetect`, découpage via `-ss`/`-to`) — à choisir selon la stack d'outillage déjà utilisée dans le repo (actuellement aucun script d'outillage n'existe encore dans `travelingo`, voir absence de dossier `scripts/`).
