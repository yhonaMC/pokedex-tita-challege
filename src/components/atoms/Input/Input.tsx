import { type InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = false,
  startIcon,
  endIcon,
  className = '',
  ...props
}, ref) => {
  const baseClass = 'input-wrapper';
  const fullWidthClass = fullWidth ? 'input-wrapper--full-width' : '';
  const errorClass = error ? 'input-wrapper--error' : '';
  
  const wrapperClasses = [baseClass, fullWidthClass, errorClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <div className="input-container">
        {startIcon && (
          <div className="input-icon input-icon--start">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`input ${startIcon ? 'input--with-start-icon' : ''} ${endIcon ? 'input--with-end-icon' : ''}`}
          {...props}
        />
        {endIcon && (
          <div className="input-icon input-icon--end">
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <span className="input-error">
          {error}
        </span>
      )}
    </div>
  );
});