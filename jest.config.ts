import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";
import { defaults as tsjPreset } from "ts-jest/presets";

const jestConfig: JestConfigWithTsJest = {
  testEnvironment: 'node',
  transform: {
    ...tsjPreset.transform,
  },

  collectCoverageFrom: [
    '<rootDir>/packages/**/*'
  ],

  /*
   * What is going on with jest where this is necessary to have the collectCoverageFrom config?
   * Relevant Issue: https://github.com/jestjs/jest/issues/9324
   */
  coverageProvider: 'v8',

  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths /*, { prefix: '<rootDir>/' } */
  ),
  modulePaths: ['<rootDir>'],
};

export default jestConfig;
