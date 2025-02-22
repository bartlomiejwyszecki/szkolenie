import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^services/(.*)$": "<rootDir>/services/$1",
    "^features/(.*)$": "<rootDir>/features/$1",
    "^@/(.*)$": "<rootDir>/$1",
  },
};

export default createJestConfig(customJestConfig);
