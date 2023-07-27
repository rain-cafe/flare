import { FlarieChannel } from './channel';
import { FlarieServer } from './server';
import { FlarieUser } from './user';

export enum FlarieContextTypes {
  SERVER,
  DM,
}

export class FlarieContext {
  public readonly type: FlarieContextTypes;

  /**
   * The channel info
   */
  channel: FlarieChannel;

  user: FlarieUser;

  constructor(options: FlarieContext.Options) {
    this.type = options.type;
    this.channel = options.channel;
    this.user = options.user;
  }

  isServer(): this is FlarieServerContext {
    return this.type === FlarieContextTypes.SERVER;
  }

  isDM(): this is FlarieDMContext {
    return this.type === FlarieContextTypes.DM;
  }
}

export class FlarieServerContext extends FlarieContext {
  declare type: FlarieContextTypes.SERVER;

  /**
   * The server info
   */
  server: FlarieServer;

  constructor(options: Omit<FlarieContext.ServerOptions, 'type'>) {
    super({
      type: FlarieContextTypes.SERVER,
      ...options,
    });

    this.server = options.server;
  }
}

export class FlarieDMContext extends FlarieContext {
  declare type: FlarieContextTypes.DM;

  constructor(options: Omit<FlarieContext.DMOptions, 'type'>) {
    super({
      type: FlarieContextTypes.DM,
      ...options,
    });
  }
}

export namespace FlarieContext {
  export type Options = ServerOptions | DMOptions;

  type SharedOptions = {
    /**
     * The channel info
     */
    channel: FlarieChannel;

    user: FlarieUser;
  };

  export type ServerOptions = SharedOptions & {
    type: FlarieContextTypes.SERVER;

    /**
     * The server info
     */
    server: FlarieServer;
  };

  export type DMOptions = SharedOptions & {
    type: FlarieContextTypes.DM;
  };
}
