<template>
  <div id="home">
    <Terminal class="emulator" ref="emulator" />
  </div>
</template>

<script>
import Terminal from "@/components/Terminal.vue";

import avatar from "@/assets/ascii/avatar";

import sleep from "@/utils/sleep";

import clear from "./commands/clear";
import help from "./commands/help";
import neofetch from "./commands/neofetch";
import restart from "./commands/restart";

export default {
  name: "Home",
  components: {
    Terminal
  },
  data() {
    return {
      birthday: new Date("4/30/2002"),
      hostname: "alex",
      name: "Alex",
      username: "alex"
    };
  },
  mounted() {
    const { emulator } = this.$refs;
    if (!emulator) return;

    emulator
      .addCommand(clear())
      .addCommand(help())
      .addCommand(
        neofetch({
          avatar,
          birthday: this.birthday,
          name: this.name
        })
      )
      .addCommand(restart());

    sleep(1500)
      .then(() => emulator.login(this.username, this.hostname))
      .then(() => sleep(700))
      .then(() => emulator.runCommand("neofetch"));
  }
};
</script>

<style lang="scss" scoped>
.emulator {
  background-color: #000;
  color: #fff;
  cursor: text;
  font-family: "monospace";
  font-size: 15px;
  line-height: 25px;
  height: 100vh;
  overflow: auto;
  width: 100%;
}

// To modify blinking cursor styles
// .emulator::v-deep .cursor {}
</style>
