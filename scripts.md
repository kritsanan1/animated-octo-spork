# Scripts Reference


| Script | Description | Parameters | Example | Troubleshooting |
|--------|-------------|------------|---------|-----------------|
| start | Starts Rork/Expo dev server with tunnel for devices | --web, --tunnel are handled by wrapper | bun run start | If QR fails to load, try: bunx expo start --clear, or use start-web |
| start-web | Starts web preview in browser (React Native Web) with tunnel | None | bun run start-web | If blank page, check EXPO_PUBLIC_RORK_API_BASE_URL and console logs |
| start-web-dev | Starts web preview with DEBUG=expo* verbose logs | None | bun run start-web-dev | Use to diagnose bundler/resolution issues |
| lint | Runs Expo/ESLint against the project | path patterns via eslint | bun run lint | Fix issues or add ignores in eslint.config.js |


Outputs and Behavior
- All start scripts rely on bunx rork start under the hood and honor Expo Router.
- Use CTRL+C to stop; press r to reload when in terminal UI.


Common Errors
- Port already in use: change port or kill the other process.
- Base URL missing: set EXPO_PUBLIC_RORK_API_BASE_URL in .env.local for client TRPC.

