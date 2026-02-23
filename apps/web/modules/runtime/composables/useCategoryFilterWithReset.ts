import type { Filters } from '~/composables/useCategoryFilter/types.ts';

export const useCategoryFilterWithReset = () => {
  const { getFacetsFromURL, updateQuery, ...rest } = useCategoryFilter();

  /**
   * Updates filters and resets pagination to page 1
   * Merges new filters with existing ones (same logic as updateFilters)
   */
  const updateFiltersAndResetPage = (filters: Filters) => {
    // Get current filters from URL
    const currentFacets = getFacetsFromURL().facets?.split(',') ?? [];
    const currentFilters: Filters = {};
    currentFacets.forEach((facet: string) => {
      currentFilters[facet] = true;
    });
    
    // Merge current filters with new filters
    const mergedFilters = { ...currentFilters };
    Object.keys(filters).forEach((key) => {
      mergedFilters[key] = filters[key] ?? false;
    });
    
    // Get only the active filters
    const activeFilters = Object.keys(mergedFilters)
      .filter((key) => mergedFilters[key])
      .join(',');
    
    // Update with page reset
    updateQuery({ 
      facets: activeFilters || null,
      page: null
    });
  };

  /**
   * Updates prices and resets pagination to page 1
   */
  const updatePricesAndResetPage = (priceMin: string, priceMax: string) => {
    updateQuery({
      priceMin: priceMin || null,
      priceMax: priceMax || null,
      page: null
    });
  };

  /**
   * Clears all filters and resets pagination
   */
  const clearAllFilters = () => {
    updateQuery({ 
      facets: null,
      page: null,
      priceMin: null,
      priceMax: null
    });
  };

  return {
    getFacetsFromURL,
    updateQuery,
    updateFiltersAndResetPage,
    updatePricesAndResetPage,
    clearAllFilters,
    ...rest
  };
};