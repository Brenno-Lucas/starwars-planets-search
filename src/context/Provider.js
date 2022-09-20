import React, { Component } from 'react';
import PropTypes from 'prop-types';
import context from './Context';
import listOfPlanets from '../services/requestPlanetsAPI';

export default class Provider extends Component {
  state = {
    planets: [],
  };

  componentDidMount = async () => {
    const planets = await listOfPlanets();
    this.setState({
      planets,
    });
  };

  render() {
    const { children } = this.props;
    const { planets } = this.state;
    return (
      <context.Provider value={ planets }>
        { children }
      </context.Provider>
    );
  }
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
