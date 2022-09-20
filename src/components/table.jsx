import React, { Component } from 'react';
import test from '../context/Context';

class Table extends Component {
  state = {
    nameFilter: '',
    planets: [],
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
    this.setState({ [name]: value }, () => {
      this.filterPlanetByName();
    });
  };

  filterPlanetByName = () => {
    const { nameFilter } = this.state;
    const planets = this.context;
    const a = planets.filter((item) => {
      const planet = item.name.toLowerCase().replaceAll(' ', '');
      return planet.includes(nameFilter.toLocaleLowerCase().replaceAll(' ', ''));
    });
    this.setState({
      planets: a,
    });
  };

  render() {
    const { planets, nameFilter } = this.state;
    return (
      <div>
        <input
          type="text"
          name="nameFilter"
          data-testid="name-filter"
          value={ nameFilter }
          onChange={ this.onInputChange }
        />
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
