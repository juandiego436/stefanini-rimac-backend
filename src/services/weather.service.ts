import axios from 'axios';

export class WeatherService {
  private static baseUrl = 'https://api.openweathermap.org/data/2.5';
  private static apiKey = process.env.OPENWEATHER_API_KEY;

  static async getWeatherByCity(city: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('No se pudieron obtener los datos meteorológicos');
    }
  }

  // Método para obtener clima basado en planetas de Star Wars
  static async getWeatherForPlanet(planetName: string): Promise<any> {
    // Mapear planetas de Star Wars a ciudades reales
    const planetToCityMap: { [key: string]: string } = {
      'Tatooine': 'Tunis', // Desierto similar
      'Hoth': 'Vostok', // Estación antártica
      'Endor': 'Redwood', // Bosques similares
      'Bespin': 'Venice', // Ciudad en las nubes
      'Coruscant': 'Tokyo', // Planeta ciudad
      'Naboo': 'Florence' // Planeta con arquitectura similar
    };

    const city = planetToCityMap[planetName] || 'London';
    return this.getWeatherByCity(city);
  }
}