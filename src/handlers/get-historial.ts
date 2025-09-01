import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StorageService } from '../services/storage.service';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Obtener parámetros de paginación
    const limit = parseInt(event.queryStringParameters?.limit || '10');
    const lastEvaluatedKey = event.queryStringParameters?.lastKey;
    
    // Obtener historial paginado
    const history = await StorageService.getHistory(limit, lastEvaluatedKey);

    return {
      statusCode: 200,
      body: JSON.stringify(history)
    };
  } catch (error) {
    console.error('Error en /historial:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};