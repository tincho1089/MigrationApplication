import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Migration } from '../migration/entities/migration.entity';

@WebSocketGateway(8001, { cors: '*' })
export class EventGateway {
  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() newMigration: Migration): Promise<void> {
    this.server.emit('message_new_migration', newMigration);
  }
}
