/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    clearMocks: false,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    testEnvironment: "node",
    testMatch: [
        "**/tests/*.test.ts"
    ],
    moduleNameMapper: {
        "@functions/(.*)$": "<rootDir>/src/functions/$1",
        "@libs/(.*)$": "<rootDir>/src/libs/$1",
    }
};