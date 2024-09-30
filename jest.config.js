module.exports = {
    testEnvironment: 'jsdom',
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageReporters: ["json", "lcov", "text", "clover"],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': 'identity-obj-proxy' // If you need to mock CSS files as well
      },
};
