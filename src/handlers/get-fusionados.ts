import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SWAPIService } from '../services/swapi.service';
import { WeatherService } from '../services/weather.service';
import { CacheService } from '../services/cache.service';
import { StorageService } from '../services/storage.service';
import { DataFusionService } from '../services/data-fusion.service';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Verificar si hay datos en caché
    const cachedData = await CacheService.getCachedData('fusionados');
    if (cachedData) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(cachedData)
      };
    }

    // Obtener datos de ambas APIs
    const [characters, weatherData] = await Promise.all([
      SWAPIService.getCharacters(),
      WeatherService.getWeatherData()
    ]);

    // Fusionar y normalizar datos
    const fusedData = await DataFusionService.fuseData(characters, weatherData);

    // Almacenar en base de datos para historial
    await StorageService.saveFusedData(fusedData);

    // Almacenar en caché por 30 minutos
    await CacheService.cacheData('fusionados', fusedData, 1800);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(fusedData)
    };
  } catch (error) {
    console.error('Error en /fusionados:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};