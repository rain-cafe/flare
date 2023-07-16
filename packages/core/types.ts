import { EventEmitter } from 'events';
import { FlareCommand } from './command';

export type MessageEnvelope = {
    id: string;
    displayName: string;
    message: string;
}

export type FlareInteraction = {
  reply(message: string): Promise<void>;
};

export declare interface Platform extends EventEmitter {
    authenticate(): Promise<void>;
    register(commands: FlareCommand[]): Promise<void>;

    on(event: 'message', callback: (envelope: MessageEnvelope) => void): this;
    emit(event: 'message', envelope: MessageEnvelope): boolean;
}
