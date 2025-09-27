'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';

interface InputTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'resizable';
}

export const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(
  ({ label, error, variant = 'default', className = '', ...props }, ref) => {
    const resizeClass = variant === 'resizable' ? 'resize-y' : 'resize-none';
    const textareaClasses = `input-field ${resizeClass} ${className}`;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-fg">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={textareaClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

InputTextArea.displayName = 'InputTextArea';
