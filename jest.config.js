module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.(css|scss|sass)$': 'jest-transform-stub',
        '^.+\\.(png|jpg|jpeg|gif|svg)$': 'jest-transform-stub',
    },
    moduleNameMapper: {
        '^components/(.*)$': '<rootDir>/src/components/$1',
        '^services/(.*)$': '<rootDir>/src/services/$1',
        '^context/(.*)$': '<rootDir>/src/context/$1.tsx',
        '^utils/(.*)$': '<rootDir>/src/utils/$1.tsx',
        '^assets/(.*)$': '<rootDir>/src/assets/$1',
        '^config$': '<rootDir>/src/config.ts',
        '\\.(css|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testPathIgnorePatterns: ['/node_modules/', '/forServer/'],
};
