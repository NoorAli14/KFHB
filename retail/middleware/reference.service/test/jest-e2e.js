module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "../",
  testEnvironment: "node",
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  moduleNameMapper: {
    "@rubix/(.*)": "<rootDir>/src/$1",
    "@common/(.*)": "<rootDir>/src/common/$1",
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@core/(.*)": "<rootDir>/src/core/$1",
  }
}
