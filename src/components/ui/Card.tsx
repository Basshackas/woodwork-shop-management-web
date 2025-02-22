import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  headerAction?: React.ReactNode;
}

export function Card({
  children,
  className = '',
  title,
  description,
  footer,
  headerAction
}: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {(title || description || headerAction) && (
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
            </div>
            {headerAction && <div>{headerAction}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 bg-gray-50 border-t rounded-b-lg">{footer}</div>}
    </div>
  );
}