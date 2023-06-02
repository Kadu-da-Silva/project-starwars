import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import FilterContext from './FilterContext';

function FilterProvider({ children }) {
  const [globalState, setGlobalState] = useState('');
  const [filters, setFilters] = useState([]);
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

// O componente FilterProvider é responsável por fornecer esse contexto aos componentes filhos. Ele usa o useState para criar os estados globalState e filters, bem como as funções setGlobalState e setFilters para atualizar esses estados.

// No retorno do FilterProvider, você envolve o conteúdo dos componentes filhos no <FilterContext.Provider>. Dentro do atributo value desse provider, você passa um objeto contendo as informações do estado global e as funções de atualização.

// Quando você utiliza o FilterProvider na hierarquia de componentes da sua aplicação, ele se torna o contexto ativo e os componentes filhos podem acessar o estado global e as funções de atualização através do consumo desse contexto.
