/**
 * ConfigGuard - Zero-dependency environment & config validator
 */
function validateConfig(schema, source = process.env) {
  const result = {};
  const errors = [];

  for (const [key, rules] of Object.entries(schema)) {
    const rawValue = source[key];

    if (rawValue === undefined || rawValue === "") {
      if (rules.default !== undefined) {
        result[key] = rules.default;
        continue;
      }
      if (rules.required) {
        errors.push(`Missing required config key: "${key}"`);
        continue;
      }
      result[key] = undefined;
      continue;
    }

    if (rules.type === "number") {
      const num = Number(rawValue);
      if (Number.isNaN(num)) {
        errors.push(`Config "${key}" must be a valid number, received "${rawValue}"`);
      } else {
        result[key] = num;
      }
    } else if (rules.type === "boolean") {
      if (rawValue === "true" || rawValue === "1" || rawValue === true) {
        result[key] = true;
      } else if (rawValue === "false" || rawValue === "0" || rawValue === false) {
        result[key] = false;
      } else {
        errors.push(`Config "${key}" must be a boolean (true/false), received "${rawValue}"`);
      }
    } else {
      result[key] = String(rawValue);
    }

    if (rules.enum && result[key] !== undefined && !rules.enum.includes(result[key])) {
      errors.push(`Config "${key}" must be one of [${rules.enum.join(", ")}]`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`ConfigGuard Validation Failed:\n - ${errors.join("\n - ")}`);
  }

  return Object.freeze(result);
}

module.exports = { validateConfig };
