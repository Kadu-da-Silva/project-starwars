import React, { useContext } from 'react';

import style from './Table.module.css';

import useFetch from '../hooks/useFetch';
import FilterContext from '../context/FilterContext';

function Table() {
  // estado com os resultados da API
  const { data, error } = useFetch();

  // estados globais com os filtros
  // globalState = '' filtro digitado pelo usuário
  // filters = { column: '', comparator: '', number: 0 } estados com os filtros criados
  const { globalState, filters } = useContext(FilterContext);

  // array filtrado com o campo de busca
  const filteredData = data.filter(
    (obj) => obj.name.toLowerCase().includes(globalState.toLowerCase()),
  );

  // array com os filtros criados
  // console.log(filters);

  // interage a cada filtro
  const dataWithFilters = filteredData.filter((planet) => filters.every((filter) => {
    const valuePlanet = Number(planet[filter.column]);
    const valueFilter = Number(filter.number);
    // console.log(valueFilter);

    switch (filter.comparator) {
    case 'maior que':
      return valuePlanet > valueFilter;
    case 'menor que':
      return valuePlanet < valueFilter;
    case 'igual a':
      return valuePlanet === valueFilter;
    default:
      return true;
    }
  }));

  // console.log(dataWithFilters);

  if (error) {
    (
      <main>
        <h1>Um erro inesperado aconteceu</h1>
      </main>
    );
  }

  return (
    <section className={ style.section }>
      <div className={ style.filters }>
        {filters.map((filter, index) => (
          <div key={ index } className={ style.filter }>
            <span>{`${filter.column} ${filter.comparator} ${filter.number}`}</span>
          </div>
        ))}
      </div>
      <table className={ style.table }>
        <thead className={ style.thead }>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody className={ style.tbody }>
          {dataWithFilters.map((obj) => (
            <tr key={ obj.name }>
              <td>{obj.name}</td>
              <td>{obj.rotation_period}</td>
              <td>{obj.orbital_period}</td>
              <td>{obj.diameter}</td>
              <td>{obj.climate}</td>
              <td>{obj.gravity}</td>
              <td>{obj.terrain}</td>
              <td>{obj.surface_water}</td>
              <td>{obj.population}</td>
              <td>{obj.films}</td>
              <td>{obj.created}</td>
              <td>{obj.edited}</td>
              <td>{obj.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
