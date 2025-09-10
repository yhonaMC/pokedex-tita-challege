import { useState, useCallback } from 'react';
import { validateData, validateField, type ValidationSchema, type ValidationRule } from '../utils/validation';

export interface UseValidationOptions {
  schema?: ValidationSchema;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseValidationReturn {
  errors: Record<string, string>;
  isValid: boolean;
  validate: (data?: Record<string, unknown>) => boolean;
  validateSingle: (field: string, value: unknown, rules?: ValidationRule[]) => boolean;
  clearErrors: () => void;
  clearError: (field: string) => void;
  setError: (field: string, message: string) => void;
}

export const useValidation = (
  initialData: Record<string, unknown> = {},
  options: UseValidationOptions = {}
): UseValidationReturn => {
  const { schema } = options;
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data] = useState(initialData);

  const validate = useCallback((dataToValidate?: Record<string, unknown>): boolean => {
    if (!schema) return true;
    
    const targetData = dataToValidate || data;
    const result = validateData(targetData, schema);
    
    setErrors(result.errors);
    return result.isValid;
  }, [schema, data]);

  const validateSingle = useCallback((
    field: string,
    value: unknown,
    rules?: ValidationRule[]
  ): boolean => {
    const fieldRules = rules || (schema && schema[field]) || [];
    const result = validateField(value, fieldRules);
    
    if (result.error) {
      setErrors(prev => ({ ...prev, [field]: result.error! }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    return result.isValid;
  }, [schema]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const isValid = Object.keys(errors).length === 0;

  return {
    errors,
    isValid,
    validate,
    validateSingle,
    clearErrors,
    clearError,
    setError,
  };
};