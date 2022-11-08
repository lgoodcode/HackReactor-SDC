/** @type {import('jest').Config} */
module.exports = {
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/server'],
  // Set this preset to execute the jest test runner while using `ts-jest` for typescript
  preset: 'ts-jest',
  // An array of glob patterns to match files that coverage should be collected from.
  // https://jestjs.io/docs/configuration#collectcoveragefrom-array
  collectCoverageFrom: ['<rootDir>/server/**/*.ts'],
  // The threshold to determine what percentage of coverage is acceptable
  // https://jestjs.io/docs/configuration#coveragethreshold-object
  coverageThreshold: {
    // We are deeming that 70% of all lines covered is acceptable
    global: {
      lines: 70,
    },
  },
  // Glob pattern to determine what files to test
  testMatch: ['<rootDir>/server/__tests__/*{spec,test}.ts'],
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  // Need to use dotenv to load the environment variables for testing since the dotenv-webpack
  // plugin is used to handle loading them during dev and build
  globalSetup: '<rootDir>/server/__tests__/global-setup.js',
  // Need to end the process because mongoose will remain open, this file will export
  // a function that simply kills Node
  // https://stackoverflow.com/a/71143769/17703865
  globalTeardown: '<rootDir>/server/__tests__/global-teardown.js',
  // An array of regexp pattern strings that are matched against all source file
  // paths that should not be transformed
  // https://jestjs.io/docs/configuration#transformignorepatterns-arraystring
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$'],
  // Maps custom mode paths to their actual path
  moduleNameMapper: {
    // Handles the custom webpack alias
    // () is group capture; capture the directory and then the file path
    // $1/$2 are match references; $1 is the directory and then $2 is the relative file path
    '^@/(.*)/(.*)$': '<rootDir>/server/$1/$2',
  },
}
