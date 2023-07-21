import { Logger } from './logger';
import { FlarieInteraction } from './types';

export class FlarieCommand {
  #name: string;
  #callback: FlarieCommand.Callback;

  constructor(format: string, callback: FlarieCommand.Callback) {
    const [name, ...parts] = format.split(' ');

    this.#name = name;
    this.#callback = callback;

    for (const part of parts) {
      Logger.info(part);
    }
  }

  public get name(): string {
    return this.#name;
  }

  public async invoke(interaction: FlarieInteraction): Promise<void> {
    return this.#callback(interaction);
  }
}

export namespace FlarieCommand {
  export type Callback = (interaction: FlarieInteraction) => Promise<void>;
}
