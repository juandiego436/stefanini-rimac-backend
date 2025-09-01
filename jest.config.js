module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-reports',
      outputName: 'jest-junit.xml',
    }]
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@handlers/(.*)$': '<rootDir>/src/handlers/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  }
};