import { useState, useMemo } from 'react';

interface FilterConfig<T> {
  searchFields: (keyof T)[];
  defaultFilters?: Partial<Record<keyof T, any>>;
}

export function useFilter<T extends Record<string, any>>(items: T[], config: FilterConfig<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Partial<Record<keyof T, any>>>(config.defaultFilters || {});

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Search term filtering
      const matchesSearch = config.searchFields.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Additional filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || value === 'all') return true;
        return item[key] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, searchTerm, filters, config.searchFields]);

  const updateFilter = (field: keyof T, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return {
    filteredItems,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter
  };
}