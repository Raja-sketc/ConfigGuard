export interface FieldRule {
  type?: "string" | "number" | "boolean";
  required?: boolean;
  default?: string | number | boolean;
  enum?: Array<string | number | boolean>;
}

export type ConfigSchema = Record<string, FieldRule>;

export function validateConfig<T = Record<string, any>>(
  schema: ConfigSchema,
  source?: Record<string, any>
): Readonly<T>;
