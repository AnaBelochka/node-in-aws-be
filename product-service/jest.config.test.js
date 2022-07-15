/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import { pathsToModuleNameMapper }from "ts-jest";
import { compilerOptions } from "./tsconfig.paths.json";

module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  testEnvironment: "node",
  testMatch: [
    "**/tests/*.test.ts"
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
