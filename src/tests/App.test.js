// import { render, waitFor } from '@testing-library/react';
// import App from '../App';

// // Importa o módulo para substituir o retorno da function useFetch
// import useFetch from '../hooks/useFetch';

// import testData from '../../cypress/mocks/testData';

// // Crie o mock usando a função jest.mock e passa testData como retorno
// beforeEach(() => {
//   jest.spyOn(global, 'fetch');
//   global.fetch.mockResolvedValue(testData);
// });

// describe('Testa toda a aplicação', () => {
//   it('Teste de chamada à API', async () => {
//     render(<App />);

//     await waitFor(() => {
//       expect(useFetch).toHaveBeenCalled();
//     });
//   });
// });
