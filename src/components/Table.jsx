import React, { useContext } from 'react';

import style from './Table.module.css';

import useFetch from '../hooks/useFetch';
import FilterContext from '../context/FilterContext';

function Table() {
  const { data, error } = useFetch();
  const { globalState, filters } = useContext(FilterContext);
  // console.log(filters);

  const filteredData = data.filter(
    (obj) => obj.name.toLowerCase().includes(globalState.toLowerCase()),
  );

  const dataWithFilters = () => {
    const filterColumn = filters[0];
    const filterOperator = filters[1];
    const filterNumber = Number(filters[2]);

    let filtered = filteredData;

    if (filterOperator === 'maior que') {
      filtered = filteredData.filter(
        (obj) => obj[filterColumn] > filterNumber,
      );
    } else if (filterOperator === 'menor que') {
      filtered = filteredData.filter(
        (obj) => obj[filterColumn] < filterNumber,
      );
    } else if (filterOperator === 'igual a') {
      filtered = filteredData.filter(
        (obj) => obj[filterColumn] === String(filterNumber),
      );
    }

    return filtered;
  };

  if (error) {
    (
      <main>
        <h1>Um erro inesperado aconteceu</h1>
      </main>
    );
  }
  return (
    <section className={ style.section }>
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
          {dataWithFilters().map((obj) => (
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
