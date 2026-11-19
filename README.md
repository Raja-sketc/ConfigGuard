# ConfigGuard 🛡️

Zero-dependency schema validation and environment configuration guard that prevents runtime crashes in Node.js and backend applications.

## Features
- **Zero Dependencies**: Ultra-lightweight (< 2KB) and fast.
- **Fail-Fast Validation**: Catches missing or invalid environment variables at startup.
- **Auto Type-Casting**: Safely parses `string`, `number`, and `boolean` values.
- **Immutable Output**: Freezes the validated config object to prevent accidental mutations.

## Installation
```bash
npm install configguard
```

## Quick Usage
```javascript
const { validateConfig } = require("configguard");

const config = validateConfig({
  PORT: { type: "number", default: 3000 },
  NODE_ENV: { type: "string", enum: ["development", "production", "test"], default: "development" },
  DATABASE_URL: { type: "string", required: true },
  ENABLE_CACHE: { type: "boolean", default: false }
});

console.log(config.PORT); // 3000
```

## License
MIT
