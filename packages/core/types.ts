import { EventEmitter } from 'events';

export type MessageEnvelope = {
    id: string;
    displayName: string;
    message: string;
}

export declare interface Platform extends EventEmitter {
    authenticate(): Promise<void>;

    on(event: 'message', callback: (envelope: MessageEnvelope) => void): this;
    emit(event: 'message', envelope: MessageEnvelope): boolean;
}