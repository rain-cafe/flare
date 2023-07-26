import { FlarieMessage } from './message';
import { LogLevel } from '../logger';

const DEFAULT_TITLES: {
    [key: string]: string;
} = {
    [LogLevel.ERROR]: '🚨 Internal Server Error 🚨',
    [LogLevel.WARN]: '⚠ Unhandled Error ⚠',
    [LogLevel.INFO]: 'ℹ Info ℹ'
};

export class FlarieError extends Error {
    private options: FlarieError.Options;

    constructor(options: FlarieError.Options) {
        super(options.message);
        this.options = {
            title: DEFAULT_TITLES[options.level],
            ...options,
        }
    }

    get level(): LogLevel {
        return this.options.level;
    }

    toFlarieMessage(): FlarieMessage {
      return {
        embeds: [{
            title: this.options.title,
            description: this.options.message,
            color: this.options.color,
        }],
      };
    }
}


export namespace FlarieError {
    export type Options = {
        title?: string;
        message?: string;
        color?: string;
        level: LogLevel;
    }

    export class Builder {
        static new() {
            return new Builder();
        }

        private options: FlarieError.Options;
        constructor() {
            this.options = {
                level: LogLevel.WARN
            };
        }

        title(value: string): Builder {
            this.options.title = value;
            return this;
        }

        message(value: string): Builder {
            this.options.message = value;
            return this;
        }

        color(value: string|string): Builder {
            this.options.color = value;
            return this;
        }

        level(value: LogLevel): Builder {
            this.options.level = value;
            return this;
        }

        error(): Builder {
            return this.level(LogLevel.ERROR);
        }

        warn(): Builder {
            return this.level(LogLevel.WARN);
        }

        info(): Builder {
            return this.level(LogLevel.INFO);
        }

        silly(): Builder {
            return this.level(LogLevel.SILLY);
        }

        build(): FlarieError {
            return new FlarieError(this.options);
        }
    }
}
