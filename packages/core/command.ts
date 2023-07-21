import { Logger } from './logger';
import { FlareInteraction } from './types';

export class FlareCommand {
  #name: string;
  #callback: FlareCommand.Callback;

  constructor(format: string, callback: FlareCommand.Callback) {
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

  public async invoke(interaction: FlareInteraction): Promise<void> {
    return this.#callback(interaction);
  }
}

export namespace FlareCommand {
  export type Callback = (interaction: FlareInteraction) => Promise<void>;
}
