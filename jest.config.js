module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    modulePathIgnorePatterns: ['<rootDir>/e2e/'],
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "babel-jest"
      }
}