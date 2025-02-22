import { useState, useMemo } from 'react';

export function useSort<T>(items: T[], defaultField: keyof T) {
  const [sortField, setSortField] = useState<keyof T>(defaultField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
        return direction * (a[sortField] as string).localeCompare(b[sortField] as string);
      }
      
      if (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
        return direction * ((a[sortField] as number) - (b[sortField] as number));
      }

      if (a[sortField] instanceof Date && b[sortField] instanceof Date) {
        return direction * ((a[sortField] as Date).getTime() - (b[sortField] as Date).getTime());
      }

      return 0;
    });
  }, [items, sortField, sortDirection]);

  const toggleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    sortedItems,
    sortField,
    sortDirection,
    toggleSort
  };
}