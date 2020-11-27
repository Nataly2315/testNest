import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import {AuthModule} from "../auth/auth.module";
import {AuthService} from "../auth/auth.service";

@Module({
    imports:[AuthModule],
    providers: [EventsGateway, AuthService],
})
export class EventsModule {}