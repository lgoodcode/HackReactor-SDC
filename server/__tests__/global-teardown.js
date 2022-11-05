// https://stackoverflow.com/a/71143769/17703865
// Need to use this to end the server process because mongoose will remain open
module.exports = () => {
  // Need to allow the process to continue running when watching the tests
  if (process.env.WATCH !== 'true') {
    process.exit(0)
  }
}
