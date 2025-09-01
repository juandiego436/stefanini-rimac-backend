export class DataFusionService {
  static async fuseData(characters: any[], weatherData: any): Promise<any[]> {
    const fusedData = [];
    
    for (const character of characters) {
      // Obtener datos del planeta
      const planetData = await SWAPIService.getPlanet(character.homeworld);
      
      // Obtener clima para el planeta
      const weather = await WeatherService.getWeatherForPlanet(planetData.name);
      
      // Normalizar y fusionar datos
      const fusedCharacter = {
        id: character.url.split('/').filter(Boolean).pop(),
        name: character.name,
        height: parseInt(character.height) || 0,
        mass: parseInt(character.mass) || 0,
        homeworld: planetData.name,
        climate: planetData.climate,
        terrain: planetData.terrain,
        currentWeather: {
          temperature: weather.main.temp,
          condition: weather.weather[0].main,
          humidity: weather.main.humidity,
          windSpeed: weather.wind.speed
        },
        lastUpdated: new Date().toISOString()
      };
      
      fusedData.push(fusedCharacter);
    }
    
    return fusedData;
  }
}