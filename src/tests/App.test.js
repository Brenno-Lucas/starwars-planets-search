import React from 'react';
import { render, screen, wait, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import mockAPI from './mockAPI'

describe('Testes na página principal', () => {
  it('Testa se os botões, select e inputs são renderizados', () => {
    render(<App />);
    const nameFilter = screen.getByTestId('name-filter');
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });
  it('Testa se a requisição é feita e se o planeta é renderizado', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockAPI),
    });
    const url = 'https://swapi.dev/api/planets';

    render(<App />)
    let textName
    await waitFor(() => {
      textName = screen.getByText('Tatooine');
    })
    expect(textName).toBeInTheDocument();
  });
})
