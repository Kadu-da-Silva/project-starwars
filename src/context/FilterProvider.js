import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const [globalState, setGlobalState] = useState('');
  const [filters, setFilters] = useState([{
    column: '',
    comparator: '',
    number: '',
  }]);
  return (
    <FilterContext.Provider
      value={
        { globalState, setGlobalState, filters, setFilters }
      }
    >
      <main>
        {children}
      </main>
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default FilterProvider;
