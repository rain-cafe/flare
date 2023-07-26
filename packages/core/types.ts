import { EventEmitter } from 'node:events';
import { FlarieCommand } from './command';

export type MessageEnvelope = {
  id: string;
  displayName: string;
  message: string;
}

export enum FlarieContextTypes {
  SERVER,
  DM
};

export type FlarieInteraction = {
  reply(message: string | FlarieMessage): Promise<void>;

  /**
   * The context the interaction occurred in.
   */
  context: {
    /**
     * Whether this message occurred in a DM or a Server.
     */
    type: FlarieContextTypes;

    /**
     * The id of the server this interaction was sent in
     */
    serverId?: string;

    /**
     * The id of the channel / dm this interaction was sent in
     */
    channelId: string;
  };
};

export type FlarieMessage = {
  content: string;
  ephemeral?: boolean;
}

export declare interface Platform extends EventEmitter {
  send(serverId: string, channelId: string, message: string): Promise<void>;
  authenticate(): Promise<void>;
  register(commands: FlarieCommand[]): Promise<void>;

  on(event: 'ready', callback: () => void): this;
  on(event: 'message', callback: (envelope: MessageEnvelope) => void): this;
  once(event: 'ready', callback: () => void): this;
  once(event: 'message', callback: (envelope: MessageEnvelope) => void): this;
  emit(event: 'ready'): boolean;
  emit(event: 'message', envelope: MessageEnvelope): boolean;
}
