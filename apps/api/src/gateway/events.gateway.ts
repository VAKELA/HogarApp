import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server = {} as Server;

  handleConnection(client: Socket) {
    const householdId = client.handshake.auth.householdId;
    if (householdId) {
      client.join(`household:${householdId}`);
    }
  }

  handleDisconnect(client: Socket) {
    // Socket.io handles room cleanup automatically
  }

  emitToHousehold(householdId: string, event: string, data: any) {
    this.server.to(`household:${householdId}`).emit(event, data);
  }
}
