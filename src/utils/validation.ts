export interface ValidationRule {
  test: (value: unknown) => boolean
  message: string
}

export interface ValidationSchema {
  [key: string]: ValidationRule[]
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const createValidationRule = (
  test: (value: unknown) => boolean,
  message: string
): ValidationRule => ({
  test,
  message
})
export const required = (message = 'This field is required'): ValidationRule =>
  createValidationRule(
    (value: unknown) => value !== null && value !== undefined && value !== '',
    message
  )

export const minLength = (
  length: number,
  message = `Must be at least ${length} characters`
): ValidationRule =>
  createValidationRule(
    (value: unknown) =>
      Boolean(value && typeof value === 'string' && value.length >= length),
    message
  )

export const maxLength = (
  length: number,
  message = `Must be no more than ${length} characters`
): ValidationRule =>
  createValidationRule(
    (value: unknown) =>
      !value || (typeof value === 'string' && value.length <= length),
    message
  )

export const isNumber = (message = 'Must be a number'): ValidationRule =>
  createValidationRule(
    (value: unknown) =>
      !value ||
      (typeof value === 'string' &&
        !isNaN(parseFloat(value)) &&
        isFinite(parseFloat(value))),
    message
  )

export const isPositiveNumber = (
  message = 'Must be a positive number'
): ValidationRule =>
  createValidationRule(
    (value: unknown) =>
      !value ||
      (typeof value === 'string' &&
        !isNaN(parseFloat(value)) &&
        parseFloat(value) > 0),
    message
  )

export const isValidPokemonId = (
  message = 'Pokemon ID must be between 1 and 1025'
): ValidationRule =>
  createValidationRule((value: unknown) => {
    if (!value) return true
    const strValue =
      typeof value === 'number' ? value.toString() : String(value)
    const num = parseInt(strValue, 10)
    return !isNaN(num) && num >= 1 && num <= 1025
  }, message)

export const isValidPokemonName = (
  message = 'Pokemon name can only contain letters, numbers, and hyphens'
): ValidationRule =>
  createValidationRule((value: unknown) => {
    if (!value) return true
    if (typeof value !== 'string') return false
    return /^[a-zA-Z0-9-]+$/.test(value)
  }, message)
export const searchValidationSchema: ValidationSchema = {
  searchTerm: [
    maxLength(50, 'Search term must be no more than 50 characters'),
    isValidPokemonName('Search can only contain letters, numbers, and hyphens')
  ]
}
export const pokemonDataValidationSchema: ValidationSchema = {
  id: [required('Pokemon ID is required'), isValidPokemonId()],
  name: [required('Pokemon name is required'), isValidPokemonName()],
  height: [isPositiveNumber('Height must be a positive number')],
  weight: [isPositiveNumber('Weight must be a positive number')]
}

export const validateData = (
  data: Record<string, unknown>,
  schema: ValidationSchema
): ValidationResult => {
  const errors: Record<string, string> = {}

  Object.keys(schema).forEach((field) => {
    const value = data[field]
    const rules = schema[field]

    for (const rule of rules) {
      if (!rule.test(value)) {
        errors[field] = rule.message
        break
      }
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateField = (
  value: unknown,
  rules: ValidationRule[]
): { isValid: boolean; error: string | null } => {
  for (const rule of rules) {
    if (!rule.test(value)) {
      return {
        isValid: false,
        error: rule.message
      }
    }
  }

  return {
    isValid: true,
    error: null
  }
}
