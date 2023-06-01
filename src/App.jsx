import React from 'react';

import './App.css';

import Table from './components/Table';
import Header from './components/Header';

import FilterProvider from './context/FilterProvider';

function App() {
  return (
    <FilterProvider>
      <Header />
      <Table />
    </FilterProvider>
  );
}

export default App;
