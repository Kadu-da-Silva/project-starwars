import React, { useState } from 'react';

import './App.css';

import Table from './components/Table';
import Header from './components/Header';

import FilterContext from './context/FilterContext';

function App() {
  const [globalState, setGlobalState] = useState('');

  return (
    <FilterContext.Provider value={ { globalState, setGlobalState } }>
      <main>
        <Header />
        <Table />
      </main>
    </FilterContext.Provider>
  );
}

export default App;
