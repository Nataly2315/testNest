import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayDisconnect,
    OnGatewayConnection, WsException,
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {Logger} from "@nestjs/common";
import {AuthService} from "../auth/auth.service";


@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    constructor(private authService: AuthService) {
    }

    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('EventGateway');

    public afterInit(server: Server) {
        this.logger.log('Initialized');
    }


    async handleConnection(client: Socket, ...args): Promise<any> {
        if (client.handshake.headers.authorization) {
            const token = client.handshake.headers.authorization.substring(7);
            const clientPayload = await this.authService.validate(token);
            if (!clientPayload) {
                client.disconnect(true);
            }
        } else {
            client.disconnect(true);
        }
        this.logger.log('Client connected: ' + client.id)
    }

    handleDisconnect(client: Socket): any {
        this.logger.log('Client disconnected: ' + client.id)
    }

    @SubscribeMessage("msgToServe")
    handleMessage(client: Socket, msg: string): void {
        this.wss.emit("message", {data: msg});
    }

    sendEvent(event: string, msg: any): void {
        this.wss.emit(event, {data: msg})
    }

}