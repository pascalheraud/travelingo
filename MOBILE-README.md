# Travelingo — Android build & deploy

## Prerequisites (one-time setup)

- **Node 24** managed by `nvm` (already installed on this machine). The project pins its version via `src/frontend/.nvmrc`:
  ```bash
  cd src/frontend
  source ~/.nvm/nvm.sh   # if not already loaded in your shell
  nvm use                # reads .nvmrc, installs Node 24 if needed
  ```
- **Android SDK** already present on this machine: `/home/pascal/dev/softs/android/sdk` (platform `android-35`, build-tools `35.0.0`, platform-tools). Export the env vars (add to `~/.bashrc`/`~/.zshrc` for permanent use):
  ```bash
  export ANDROID_HOME=/home/pascal/dev/softs/android/sdk
  export ANDROID_SDK_ROOT=$ANDROID_HOME
  export PATH=$ANDROID_HOME/platform-tools:$PATH
  ```

## Build the web app + Capacitor sync

From `src/frontend`:

```bash
npm install            # if dependencies changed
npx tsc --noEmit       # never bare tsc, see skill frontend-tsc-readonly
npx vite build         # outputs dist/
npx cap sync android   # copies dist/ + plugins into android/app/src/main/assets
```

## Build the APK (debug)

```bash
cd android
echo "sdk.dir=$ANDROID_HOME" > local.properties   # if missing — gitignored
./gradlew assembleDebug
```

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

First build downloads Gradle/AGP/dependencies and can take several minutes. Subsequent builds are fast (Gradle cache).

## Deploy to a USB-connected phone

1. Enable **developer mode** + **USB debugging** on the phone (Settings → About → tap Build number 7 times, then Developer options → USB debugging).
2. Plug in the phone and accept the "Allow USB debugging" prompt on the phone screen.
3. Verify the phone is detected:
   ```bash
   adb devices -l
   ```
4. Install the APK:
   ```bash
   adb install -r android/app/build/outputs/apk/debug/app-debug.apk
   ```
   (`-r` = reinstall/overwrite if already present)

### If `adb devices` sees nothing / USB permission error

- Check that your user is in the `plugdev` group (`groups` should list `plugdev`) — log out and back in if you were just added.
- If the `adb` server can't open the device (`failed to open device: Access denied`), restart it **as root** in a real terminal (not via an agent/sandbox that can't prompt for a password):
  ```bash
  sudo adb kill-server
  sudo adb start-server
  adb devices -l   # subsequent commands don't need sudo once the server is running as root
  ```
- If running from a sandboxed/containerised environment (e.g. an AI agent, a VM, a Docker container) without direct access to the host machine's USB bus, `adb` won't see the phone even if the host does — run `adb install` directly from a terminal on the host, not from inside the sandbox.
- Wireless alternative: enable **Wireless debugging** (Android 11+) then `adb pair`/`adb connect <ip>:<port>`.

## Open in Android Studio (optional, for visual debugging/logs)

```bash
npx cap open android
```

## Known gotchas

- **Capacitor version**: v8.x requires Node ≥22. If you see `The Capacitor CLI requires NodeJS >=22.0.0`, check `node --version` and run `nvm use`.
- **`kotlin-stdlib-jdk7`/`jdk8` duplicate class**: already fixed in `android/build.gradle` (`exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jdk7'` + `-jdk8`, with `resolutionStrategy.force 'kotlin-stdlib:1.8.22'`). If it comes back after a plugin update, it's the same type of transitive Kotlin conflict.
- **`local.properties`** is gitignored (machine-local SDK path) — recreate it on any new build machine using the command above.
- After any change in `src/frontend` (code, assets), you must **rebuild + re-sync** (`vite build` then `cap sync android`) before running `gradlew assembleDebug` again — Capacitor does not watch files continuously for native builds.
