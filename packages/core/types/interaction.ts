import { FlarieContext } from './context';
import { FlarieMessageEphemeral } from './message';

export type FlarieInteraction = {
  reply(message: string | FlarieMessageEphemeral): Promise<void>;

  replied: boolean;

  /**
   * The context the interaction occurred in.
   */
  context: FlarieContext;
};
