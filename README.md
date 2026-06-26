# Travelingo

Travelingo is an offline-first phrase-learning app (React + Vite + Capacitor).

Important notes

- Language for code and documentation: English. Write code comments, commits and docs in English.

Quick start (development)

```bash
# install
npm install

# run dev server
npm run dev

# build web
npm run build

# sync with Capacitor android (if platform added)
npx cap sync android
```

Building a release AAB (overview)

```bash
npm run build
npx cap sync android
# open Android Studio and build signed AAB
npx cap open android
```

Docs

- See `doc/init-spec.md` for the product specification.
- See `doc/travelingo-plan-phase1.md` and `doc/travelingo-plan-phase2.md` for phase plans.

Contributing

- Follow the coding and naming conventions in `doc/travelingo-naming.md`.
- Open PRs with English descriptions.

License

- See `LICENSE` file in project root.
