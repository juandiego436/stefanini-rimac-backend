import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StorageService } from '../services/storage.service';
import { validationSchema } from '../schemas/custom-data.schema';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Cuerpo de la solicitud vacío' })
      };
    }

    const body = JSON.parse(event.body);
    
    // Validar datos
    const { error } = validationSchema.validate(body);
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.details[0].message })
      };
    }

    // Almacenar en base de datos
    const savedItem = await StorageService.saveCustomData(body);

    return {
      statusCode: 201,
      body: JSON.stringify(savedItem)
    };
  } catch (error) {
    console.error('Error en /almacenar:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};