import { FlarieContext } from './context';
import { FlarieMessage } from './message';

export type FlarieInteraction = {
  reply(message: string | FlarieMessage): Promise<void>;

  /**
   * The context the interaction occurred in.
   */
  context: FlarieContext;
};
