<template>
  <div ref="emulator" @click="!$refs.stdin || $refs.stdin.focus()">
    <div class="wrapper">
      <div
        class="stdout"
        ref="stdout"
        v-html="stdout.map(payload => `<div>${payload}</div>`).join('')"
      ></div>

      <div>
        <template v-if="loggedIn">
          <span class="prompt">{{ prompt }}</span>
          <span>{{ stdin }}</span>

          <!-- Hidden input box to accept user input -->
          <input
            autofocus
            autocapitalize="off"
            autocomplete="off"
            class="stdin"
            name="stdin"
            ref="stdin"
            spellcheck="false"
            type="text"
            :value="stdin"
            @input="handleInput"
            @keydown.ctrl.67.exact="interrupt($refs.stdin.value + '^C')"
            @keydown.down.exact="cycleCommands(-1)"
            @keydown.enter.exact="runCommand($refs.stdin.value, false)"
            @keydown.up.exact="cycleCommands(1)"
          />
        </template>

        <span class="cursor">█</span>
      </div>
    </div>
  </div>
</template>

<script>
import sleep from "@/utils/sleep";

export default {
  name: "TerminalEmulator",
  data() {
    return {
      acceptInput: false,
      commands: new Map(),
      stdin: "",
      history: [""],
      historyIndex: 0,
      hostname: null,
      loggedIn: false,
      stdout: [],
      username: null
    };
  },
  computed: {
    prompt() {
      return `${this.username}@${this.hostname}:${this.cwd}$`;
    }
  },
  props: {
    cwd: {
      default: "~",
      type: String
    },
    typingSpeed: {
      default: 70,
      type: Number,
      validator: value => value > 0
    }
  },
  methods: {
    addCommand(command) {
      const name = command.stdin;

      if (!this.commands.has(name)) {
        this.commands.set(name, command);
      }

      return this;
    },

    clearStdout() {
      this.stdout = [];
    },

    cycleCommands(direction) {
      /* TOOD */

      return this.historyIndex;
    },

    handleInput(event) {
      if (!this.acceptInput || !this.loggedIn) event.preventDefault();
      else this.stdin = event.target.value;
    },

    interrupt(stdin = "") {
      if (!this.acceptInput) return;

      this.stdout.push(`<span class="prompt">${this.prompt}</span>${stdin}`);
      this.stdin = "";
    },

    login(username, hostname) {
      if (this.loggedIn) {
        throw new Error("User is already logged in!");
      }

      const today = new Date();

      const time = today.toLocaleTimeString("en-US", {
        hour12: false,
        timeZoneName: "short"
      });

      const [dayOfWeek, month, dayOfMonth, year] = today
        .toDateString()
        .split(" ");

      this.stdout.push(
        `Last login: ${dayOfWeek} ${month} ${dayOfMonth} ${time} ${year}`,
        "<br>"
      );

      this.acceptInput = true;
      this.loggedIn = true;

      this.hostname = hostname;
      this.username = username;

      return this;
    },

    logout() {
      if (!this.loggedIn) {
        throw new Error("User is already logged out!");
      }

      this.acceptInput = false;
      this.historyIndex = 0;
      this.hostname = null;
      this.loggedIn = false;
      this.stdin = "";
      this.stdout = [];
      this.username = null;

      return this;
    },

    removeCommand(stdin) {
      if (this.commands.has(stdin)) {
        this.commands.delete(stdin);
      }

      return this;
    },

    async runCommand(stdin, type = true) {
      if (!this.loggedIn) {
        throw new Error("You must login before running commands!");
      }

      if (!stdin) return this.interrupt();

      if (type) await this.type(stdin);

      // Slight delay so that the output isn't instant to make it feel more realistic
      await sleep(100);

      this.interrupt(stdin);

      this.history.push(stdin);

      const command = this.commands.get(stdin);
      const stdout = command ? command.stdout(this) : null;

      if (!command) this.stdout.push(`${stdin}: command not found`);
      else this.stdout.push(stdout || "");

      const { emulator } = this.$refs;

      // Scroll emulator all the way to the bottom on next tick
      setTimeout(() => {
        emulator.scrollTop = emulator.scrollHeight;
      });

      return stdout;
    },

    async type(text) {
      if (!this.loggedIn) return;

      this.acceptInput = false;

      for (let i = 0; i < text.length; i += 1) {
        this.stdin += text.charAt(i);
        await sleep(this.typingSpeed);
      }

      this.acceptInput = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.cursor {
  animation: blink 1s steps(2, end) infinite;
  background-color: #fff;
  color: transparent;
  display: inline-block;
  margin-left: 1px;

  @keyframes blink {
    0% {
      visibility: hidden;
    }
  }
}

.prompt,
::v-deep .prompt {
  margin-right: 5px;
}

.stdin {
  border: none;
  color: transparent;
  height: 0;
  outline: none;
  padding: 0;
  position: absolute;

  &:focus + .cursor {
    background-color: #fff;
  }

  &:not(:focus) + .cursor {
    background-color: transparent;
    box-shadow: 0 0 0 1px #fff inset;
  }
}

.stdout::v-deep a {
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.wrapper {
  padding: 20px;
}
</style>
