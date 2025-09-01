import axios from 'axios';

export class SWAPIService {
  private static baseUrl = 'https://swapi.dev/api';

  static async getCharacters(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/people`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching SWAPI data:', error);
      throw new Error('No se pudieron obtener los datos de SWAPI');
    }
  }

  static async getPlanet(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching planet data:', error);
      throw new Error('No se pudieron obtener los datos del planeta');
    }
  }
}