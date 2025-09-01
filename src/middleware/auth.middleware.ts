// src/middleware/auth.middleware.ts
import { APIGatewayProxyEvent } from 'aws-lambda';
import jwt from 'jsonwebtoken';

export const authenticate = (event: APIGatewayProxyEvent): boolean => {
  const authHeader = event.headers.Authorization || event.headers.authorization;
  
  if (!authHeader) {
    return false;
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT secret not configured');
    }
    
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    console.error('Authentication error:', error);
    return false;
  }
};

// Uso en los handlers
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Verificar autenticación para endpoints protegidos
  if (!authenticate(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'No autorizado' })
    };
  }
  
  // Resto del código del handler...
};