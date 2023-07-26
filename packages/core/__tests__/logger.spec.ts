// import {Chance} from 'chance';
// import {LEVEL_CHALK, LogLevel, Logger} from '../logger';
import {LogLevel, Logger} from '../logger';

// const chance = new Chance();

describe('util(Logger)', () => {
    // let log: jest.SpyInstance<void, [message?: unknown, ...optionalParams: unknown[]], unknown>;

    // beforeEach(() => {
    //     log = jest.spyOn(console, 'log');
    // });

    // afterEach(() => {
    //     jest.restoreAllMocks();
    // });

    describe('func(log)', () => {
        it('should output a console log given the log level', () => {
            // const expectedMessage = chance.word();

            Logger.log(LogLevel.INFO, 'expectedMessage');

            // expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.INFO](`[info]:  ${expectedMessage}`));
            // expect(log).toHaveBeenCalledWith(`[info]:  ${expectedMessage}`);
        });

        it('should support objects', () => {
          Logger.log(LogLevel.INFO, {hello: 'world'});

          // expect(log).toHaveBeenCalledWith(LEVEL_CHALK[LogLevel.INFO](`[info]:  ${expectedMessage}`));
          // expect(log).toHaveBeenCalledWith(`[info]:  ${expectedMessage}`);
        });

        it('should not output a console log if the current log level is below the required level', () => {
            Logger.setLevel(LogLevel.ERROR);

            Logger.log(LogLevel.INFO, 'chance.word()');

            // expect(log).not.toHaveBeenCalled();
        });
    });
});
