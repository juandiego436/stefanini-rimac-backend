# STEFANINI - RIMAC Backend Challenge

API backend que fusiona datos de SWAPI (Star Wars API) y OpenWeather API, construida con Node.js, TypeScript y Serverless Framework.

## Características

- ✅ API RESTful con 3 endpoints
- ✅ Integración con SWAPI y OpenWeather API
- ✅ Fusión y normalización de datos
- ✅ Almacenamiento en DynamoDB
- ✅ Sistema de caché con expiración de 30 minutos
- ✅ Autenticación JWT (bonus)
- ✅ Tests unitarios e integrales con Jest
- ✅ Documentación Swagger/OpenAPI (bonus)
- ✅ Despliegue en AWS Lambda con API Gateway

## Endpoints

- `GET /fusionados` - Obtiene datos fusionados de ambas APIs
- `POST /almacenar` - Almacena información personalizada
- `GET /historial` - Retorna historial de consultas

## Requisitos

- Node.js 20.x
- Cuenta de AWS con credenciales configuradas
- API Key de OpenWeatherMap

## Instalación

1. Clonar el repositorio
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: `cp .env.example .env.dev`
4. Editar `.env.dev` con tus valores reales

## Despliegue

```bash
# Desplegar en desarrollo
npm run deploy:dev

# Desplegar en producción
npm run deploy:prod