module.exports = () => ({
  description: "Clear the terminal output",
  stdin: "clear",
  stdout: emulator => emulator.clearStdout()
});
