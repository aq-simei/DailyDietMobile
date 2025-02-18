module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  setupFiles: ['<rootDir>/jest.setup.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    '<rootDir>/jest.setup.js'
  ],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$',
    '^@components/(.*)$': '<rootDir>/src/Components/$',
    '^@constants/(.*)$': '<rootDir>/src/Constants/1',
    '^@navigation/(.*)$': '<rootDir>/src/Navigation/$1',
    '^@screens/(.*)$': '<rootDir>/src/Screens/$1',
    '^@types/(.*)$': '<rootDir>/src/@types/$1',
  },
};
