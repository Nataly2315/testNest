import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayDisconnect,
    OnGatewayConnection,
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {Logger} from "@nestjs/common";
import {TaskChanges} from "../task/interfaces/taskChanges.interface";


@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() wss: Server;
    private logger: Logger = new Logger('EventGateway');

    public afterInit(server: Server) {
        this.logger.log('Initialized');
    }

    handleConnection(client: Socket, ...args): any {
        this.logger.log('Client connected: ' + client.id)
    }

    handleDisconnect(client: Socket): any {
        this.logger.log('Client disconnected: ' + client.id)
    }

    @SubscribeMessage("msgToServe")
    handleMessage(client: Socket, msg: string): void {
        this.wss.emit( "message", {data: "I get " + msg + " from " + client.id});
    }

    sendEvent(event: string, msg: any): void{
       this.wss.emit( event, {data:  msg })
    }

}