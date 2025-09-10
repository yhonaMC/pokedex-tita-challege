import { useState, useCallback, useEffect } from 'react';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
import { useDebounce } from '../../../hooks';
import { validateField, searchValidationSchema } from '../../../utils/validation';
import './SearchBar.css';

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (term: string) => void;
  onClear?: () => void;
  value?: string;
  fullWidth?: boolean;
}

export const SearchBar = ({ 
  placeholder = "Search Pokemon...", 
  onSearch,
  onClear,
  value = '',
  fullWidth = false
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [validationError, setValidationError] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm !== value) {
      const validationRules = searchValidationSchema.searchTerm || [];
      const validation = validateField(debouncedSearchTerm, validationRules);
      
      if (validation.isValid && onSearch) {
        onSearch(debouncedSearchTerm);
      }
    }
  }, [debouncedSearchTerm, onSearch, value]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    const validationRules = searchValidationSchema.searchTerm || [];
    const validation = validateField(newValue, validationRules);
    
    setValidationError(validation.error || '');
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    setValidationError('');
    if (onClear) {
      onClear();
    }
    if (onSearch) {
      onSearch('');
    }
  }, [onClear, onSearch]);

  return (
    <div className={`search-bar ${fullWidth ? 'search-bar--full-width' : ''}`}>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        fullWidth={fullWidth}
        error={validationError}
        startIcon={<Icon name="search" size={18} />}
        endIcon={
          searchTerm ? (
            <button 
              onClick={handleClear}
              className="search-bar__clear-button"
              type="button"
              aria-label="Clear search"
            >
              <Icon name="close" size={18} />
            </button>
          ) : undefined
        }
      />
    </div>
  );
};