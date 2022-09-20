const requestPlanetsApi = async () => {
  const response = await fetch('https://swapi.dev/api/planets');
  const planets = await response.json();
  return planets.results;
};

const listOfPlanets = async () => {
  const planets = await requestPlanetsApi();
  planets.map((index) => delete index.residents);
  return planets;
};

export default listOfPlanets;
