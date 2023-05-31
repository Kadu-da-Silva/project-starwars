import React, { useContext } from 'react';

import style from './Table.module.css';

import useFetch from '../hooks/useFetch';
import FilterContext from '../context/FilterContext';

function Table() {
  const { data, error } = useFetch();
  const { globalState } = useContext(FilterContext);
  console.log(globalState);

  const filteredData = data.filter(
    (obj) => obj.name.toLowerCase().includes(globalState.toLowerCase()),
  );

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
          {filteredData.map((obj) => (
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
