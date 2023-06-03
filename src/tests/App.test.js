import { render, waitFor, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';

import testData from './mocks/testData';
import { 
  INPUT_FILTER_NAME,
  COLUMN_FILTER,
  COMPARISON_FILTER,
  VALUE_FILTER,
  BUTTON_FILTER,
  BUTTON_REMOVE_FILTER,
  BUTTON_REMOVE_FILTERS,
} from './utils/dataTestIds'

// Crie o mock usando a função jest.mock e passa testData como retorno
beforeEach(() => {
  // Cria uma função global do tipo fetch para simular todas as functions do mesmo tipo e determina o retorno da function json como testData
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
});

describe('Testa toda a aplicação', () => {
  it('Teste de chamada à API', async () => {
    render(<App />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('Testa se a tabela contém 10 linhas', async () => {
    render(<App />);

    const table = screen.getByRole('table');
    await waitFor(() => {
      const tableRows = within(table).getAllByRole('row');
  
      // Ignora a primeira linha do cabeçalho
      const tableBodyRows = tableRows.slice(1);
  
      expect(tableBodyRows.length).toBe(10);
    });
    
  });
  

  it('Testa se ao digitar dois "o"s apenas o planeta Tatooine e Naboo renderizam na tabela', async () => {
    render(<App />);

    const table = screen.getByRole('table');
    await waitFor(() => {
      const tableRows = within(table).getAllByRole('row');
  
      // Ignora a primeira linha do cabeçalho
      const tableBodyRows = tableRows.slice(1);
  
      const filterText = screen.getByTestId(INPUT_FILTER_NAME);
      expect(filterText).toBeDefined();

      fireEvent.change(filterText, { target: { value: "oo"}})

      expect(tableBodyRows.length).toBe(2);
    });
  });

  it('Testa os filtros', async () => {
    render(<App />)

    const filterColumn = screen.getByTestId(COLUMN_FILTER)
    const filterComparison = screen.getByTestId(COMPARISON_FILTER)
    const valueFilter = screen.getByTestId(VALUE_FILTER)
    const buttonFilter = screen.getByTestId(BUTTON_FILTER)

    expect(filterColumn).toBeDefined()
    expect(filterComparison).toBeDefined()
    expect(valueFilter).toBeDefined()
    expect(buttonFilter).toBeDefined()

    fireEvent.change(filterColumn, { target: { value: "rotation_period"}})
    fireEvent.change(filterComparison, { target: { value: "menor que"}})
    fireEvent.change(valueFilter, { target: { value: 20}})
    fireEvent.click(buttonFilter)

    const table = screen.getByRole('table');
    await waitFor(() => {
      const tableRows = within(table).getAllByRole('row');
  
      // Ignora a primeira linha do cabeçalho
      const tableBodyRows = tableRows.slice(1);
  
      expect(tableBodyRows.length).toBe(2);
    });
  });

  it('Testa dois filtros ao mesmo tempo', async () => {
    render(<App />)

    const filterColumn = screen.getByTestId(COLUMN_FILTER)
    const filterComparison = screen.getByTestId(COMPARISON_FILTER)
    const valueFilter = screen.getByTestId(VALUE_FILTER)
    const buttonFilter = screen.getByTestId(BUTTON_FILTER)

    fireEvent.change(filterColumn, { target: { value: "rotation_period"}})
    fireEvent.change(filterComparison, { target: { value: "menor que"}})
    fireEvent.change(valueFilter, { target: { value: 20}})
    fireEvent.click(buttonFilter)

    fireEvent.change(filterColumn, { target: { value: "orbital_period"}})
    fireEvent.change(filterComparison, { target: { value: "maior que"}})
    fireEvent.change(valueFilter, { target: { value: 500}})
    fireEvent.click(buttonFilter)

    const table = screen.getByRole('table');
    await waitFor(() => {
      const tableRows = within(table).getAllByRole('row');
  
      // Ignora a primeira linha do cabeçalho
      const tableBodyRows = tableRows.slice(1);
  
      expect(tableBodyRows.length).toBe(1);
    });
  });
  
  it('Testa o botão de remover apenas o filtro', async () => {
    render(<App />)

    const filterColumn = screen.getByTestId(COLUMN_FILTER)
    const filterComparison = screen.getByTestId(COMPARISON_FILTER)
    const valueFilter = screen.getByTestId(VALUE_FILTER)
    const buttonFilter = screen.getByTestId(BUTTON_FILTER)

    fireEvent.change(filterColumn, { target: { value: "rotation_period"}})
    fireEvent.change(filterComparison, { target: { value: "menor que"}})
    fireEvent.change(valueFilter, { target: { value: 20}})
    fireEvent.click(buttonFilter)

    const buttonRemoveFilter = screen.getByTestId(BUTTON_REMOVE_FILTER)
    fireEvent.click(buttonRemoveFilter)

    fireEvent.change(filterColumn, { target: { value: "diameter"}})
    fireEvent.change(filterComparison, { target: { value: "igual a"}})
    fireEvent.change(valueFilter, { target: { value: 7200}})
    fireEvent.click(buttonFilter)

    const table = screen.getByRole('table');
    await waitFor(() => {
      const tableRows = within(table).getAllByRole('row');
  
      // Ignora a primeira linha do cabeçalho
      const tableBodyRows = tableRows.slice(1);
  
      expect(tableBodyRows.length).toBe(1);
    });
  });
  
});
