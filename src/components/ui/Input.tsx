import React from 'react';
import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  icon,
  type = 'text',
  fullWidth = false,
  className = '',
  ...props
}: InputProps) {
  const baseStyles = 'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-shadow';
  const width = fullWidth ? 'w-full' : '';
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';
  const iconPadding = icon ? 'pl-10' : '';

  return (
    <div className={`${width}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={`
            ${baseStyles}
            ${width}
            ${errorStyles}
            ${iconPadding}
            ${className}
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export function SearchInput({ ...props }: InputProps) {
  return <Input icon={<Search size={20} />} type="search" {...props} />;
}