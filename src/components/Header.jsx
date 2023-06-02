import React, { useContext } from 'react';

import style from './Header.module.css';

import useHandleChange from '../hooks/useHandleChange';

import FilterContext from '../context/FilterContext';

function Header() {
  const enterFilter = useHandleChange('');
  const filterColumn = useHandleChange('population');
  const filterComparative = useHandleChange('maior que');
  const filterNumber = useHandleChange(0);

  const { setGlobalState, setFilters, filters } = useContext(FilterContext);
  setGlobalState(enterFilter.value);

  console.log(filters);

  const handleColumns = () => {
    const columns = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];

    const handleOptions = (options) => !filters.find(
      (filter) => options === filter.column,
    );

    console.log('teste');

    return columns.filter(handleOptions);
  };

  console.log(handleColumns());

  function handleClickFilter() {
    setFilters(
      [...filters,
        {
          column: filterColumn.value,
          comparator: filterComparative.value,
          number: filterNumber.value,
        }],
    );

    filterColumn.setValue(handleColumns()[0]);
  }

  return (
    <section className={ style.section }>
      <header className={ style.header }>
        <h1>Star Wars</h1>
        <input
          type="text"
          placeholder="Pesquise por um Planeta"
          value={ enterFilter.value }
          onChange={ enterFilter.handleChange }
          data-testid="name-filter"
        />

        <div className={ style.selects }>
          <select
            value={ filterColumn.value }
            onChange={ filterColumn.handleChange }
            data-testid="column-filter"
          >
            {handleColumns().map((column) => (
              <option value={ column } key={ column }>
                {column}
              </option>
            ))}
          </select>

          <select
            value={ filterComparative.value }
            onChange={ filterComparative.handleChange }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <input
            type="number"
            value={ filterNumber.value }
            onChange={ filterNumber.handleChange }
            data-testid="value-filter"
          />

          <button
            type="button"
            data-testid="button-filter"
            onClick={ handleClickFilter }
          >
            Filtrar
          </button>
        </div>
      </header>
    </section>
  );
}

export default Header;
