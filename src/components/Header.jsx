import React from 'react';

import style from './Header.module.css';

import useHandleChange from '../hooks/useHandleChange';
// import FilterContext from '../context/FilterContext';

function Header() {
  const { value, handleChange } = useHandleChange('');
  // const { globalState, setGlobalState } = useContext(FilterContext);

  return (
    <section className={ style.section }>
      <header className={ style.header }>
        <h1>Star Wars</h1>
        <input
          type="text"
          placeholder="Pesquise por um Planeta"
          value={ value }
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </header>
    </section>
  );
}

export default Header;
