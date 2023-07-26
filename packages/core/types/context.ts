import { FlarieChannel } from "./channel";
import { FlarieServer } from "./server";

export enum FlarieContextTypes {
  SERVER,
  DM
};

export class FlarieContext {
  public readonly type: FlarieContextTypes;

  /**
   * The channel info
   */
  channel: FlarieChannel;

  constructor(options: FlarieContext.Options) {
    this.type = options.type;
    this.channel = options.channel;
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
      ...options
    });

    this.server = options.server;
  }
}

export class FlarieDMContext extends FlarieContext {
  declare type: FlarieContextTypes.DM;

  constructor(options: Omit<FlarieContext.DMOptions, 'type'>) {
    super({
      type: FlarieContextTypes.DM,
      ...options
    });
  }
}

export namespace FlarieContext {
  export type Options = ServerOptions | DMOptions;

  export type ServerOptions = {
    type: FlarieContextTypes.SERVER;

    /**
     * The server info
     */
    server: FlarieServer;

    /**
     * The channel info
     */
    channel: FlarieChannel;
  }

  export type DMOptions = {
    type: FlarieContextTypes.DM;

    /**
     * The channel info
     */
    channel: FlarieChannel;
  }
}
