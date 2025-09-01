import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

export class CacheService {
  private static tableName = process.env.CACHE_TABLE;

  static async getCachedData(key: string): Promise<any> {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: { cacheKey: key }
      });
      
      const result = await docClient.send(command);
      
      if (result.Item && this.isCacheValid(result.Item.timestamp)) {
        return result.Item.data;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting cached data:', error);
      return null;
    }
  }

  static async cacheData(key: string, data: any, ttlSeconds: number): Promise<void> {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const expiresAt = timestamp + ttlSeconds;
      
      const command = new PutCommand({
        TableName: this.tableName,
        Item: {
          cacheKey: key,
          data: data,
          timestamp: timestamp,
          expiresAt: expiresAt
        }
      });
      
      await docClient.send(command);
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }

  private static isCacheValid(timestamp: number): boolean {
    const now = Math.floor(Date.now() / 1000);
    return (now - timestamp) < 1800; // 30 minutos en segundos
  }
}