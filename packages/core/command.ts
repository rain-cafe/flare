import { FlarieInteraction } from './types';

export class FlarieCommand {
  public readonly name: string;
  public readonly allowDMs: boolean;
  public readonly description: string;
  public readonly disabled: boolean;
  #callback: FlarieCommand.Callback;

  constructor(rawOptions: string | FlarieCommand.Options, callback: FlarieCommand.Callback) {
    const options: FlarieCommand.Options = typeof rawOptions === 'string' ? { name: rawOptions } : rawOptions;

    this.name = options.name;
    this.allowDMs = options.allowDMs || true;
    this.description = options.description || '<insert-description-here>';
    this.disabled = options.disabled || false;

    this.#callback = callback;
  }

  public async invoke(interaction: FlarieInteraction): Promise<void> {
    return this.#callback(interaction);
  }
}

export namespace FlarieCommand {
  export type Callback = (interaction: FlarieInteraction) => Promise<void>;

  export type Options = {
    name: string;
    description?: string;
    allowDMs?: boolean;

    /**
     * This will make the command usable by only admins
     */
    disabled?: boolean;
  }
}
