import React, { Component } from 'react';
import test from '../context/Context';

class Table extends Component {
  state = {
    nameFilter: '',
    planets: [],
    columnFilters:
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    columnFilter: 'population',
    comparisonFilter: 'maior que',
    valueFilter: 0,
    usedFilters: [],
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.planets.length <= 0) {
      this.setState({
        planets: this.context,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  filterPlanetByName = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { nameFilter } = this.state;
      const planets = this.context;
      const planetsFiltered = planets.filter((item) => {
        const planet = item.name.toLowerCase().replaceAll(' ', '');
        return planet.includes(nameFilter.toLocaleLowerCase().replaceAll(' ', ''));
      });
      this.setState({
        planets: planetsFiltered,
      });
    });
  };

  filterPlanetByColumn = () => {
    const { columnFilter, comparisonFilter, valueFilter, planets } = this.state;
    switch (comparisonFilter) {
    case 'maior que':
      return planets.filter((item) => Number(item[columnFilter]) > Number(valueFilter));
    case 'menor que':
      return planets.filter((item) => Number(item[columnFilter]) < Number(valueFilter));
    default:
      return planets.filter((item) => Number(item[columnFilter]) === Number(valueFilter));
    }
  };

  renderSubmitFiltered = () => {
    const { columnFilter, comparisonFilter, valueFilter, usedFilters } = this.state;
    this.setState({
      planets: this.filterPlanetByColumn(),
      usedFilters: [...usedFilters, {
        columnFilter,
        valueFilter,
        comparisonFilter,
      }],
    });
  };

  test = () => {
    this.renderSubmitFiltered();
    const { columnFilters } = this.state;
    const coloumnValue = document.getElementById('columnFilter').value;
    this.setState({
      columnFilters: columnFilters.filter((item) => item !== coloumnValue),
      columnFilter: columnFilters[0],
    });
  };

  render() {
    const { planets, nameFilter, columnFilters,
      comparisonFilter, columnFilter, valueFilter } = this.state;
    return (
      <div>
        <input
          type="text"
          name="nameFilter"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ this.filterPlanetByName }
        />
        <select
          data-testid="column-filter"
          name="columnFilter"
          id="columnFilter"
          value={ columnFilter }
          onChange={ this.onInputChange }
        >
          {columnFilters.map((column) => (
            <option key={ column } value={ column }>{column}</option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          value={ comparisonFilter }
          onChange={ this.onInputChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          name="valueFilter"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ this.onInputChange }
        />
        <button
          type="submit"
          data-testid="button-filter"
          onClick={ this.test }
        >
          Filtro
        </button>
        <table>
          <thead>
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
        </table>
        <table>
          <tbody>
            {planets.map((planet) => (
              <tr key={ planet.name }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period}</td>
                <td>{ planet.diameter}</td>
                <td>{ planet.climate}</td>
                <td>{ planet.gravity}</td>
                <td>{ planet.terrain}</td>
                <td>{ planet.surface_water}</td>
                <td>{ planet.population}</td>
                <td>{ planet.films}</td>
                <td>{ planet.created}</td>
                <td>{ planet.edited}</td>
                <td>{ planet.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.contextType = test;

export default Table;
