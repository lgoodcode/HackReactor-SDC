// https://stackoverflow.com/a/71143769/17703865
// Need to use this to end the server process because mongoose will remain open
module.exports = () => {
  // Need to allow the process to continue running when watching the tests and to
  // not exit with 0 when running the tests in CI
  if (process.env.WATCH !== 'true' && process.env.CI !== 'true') {
    process.exit(0)
  }
}
