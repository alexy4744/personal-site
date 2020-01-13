const sleep = require("@/utils/sleep");

module.exports = () => ({
  description: "Restart and log back in",
  stdin: "restart",
  stdout: (emulator) => {
    const { hostname, username } = emulator;

    emulator.logout();

    sleep(1250)
      .then(() => emulator.login(username, hostname))
      .then(() => {
        const { stdin } = emulator.$refs;
        if (stdin) stdin.focus();
      });
  }
});
