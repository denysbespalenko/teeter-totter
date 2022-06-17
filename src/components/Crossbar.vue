<template>
  <div
    class="crossbar"
    :class="animateClass ? 'crossbar-gameover' : ''"
    :style="cssSyles"
  >
    <Box
      v-for="box in leftSideBoxes"
      :key="box.id"
      :box="box"
    />

    <Box
      v-for="box in rightSideBoxes"
      :key="box.id"
      :box="box"
      :isLeft="false"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import { COLOR_MAIN } from "@/settings/theme";

import Box from "@/components/Box";

export default {
  name: "Crossbar",
  components: {
    Box,
  },

  computed: {
    ...mapGetters(["rotationAngle", "isGameOver", "isGameStarted"]),
    ...mapState(["leftSideBoxes", "rightSideBoxes"]),

    /**
     * Returns object of inline styles following getter rotationAngle
     * and COLOR_MAIN
     *
     * @return {object}
     */
    cssSyles() {
      return {
        transform: `rotate(${this.rotationAngle / 2}deg)`,
        background: COLOR_MAIN,
      };
    },

    /**
     * Returns true if game is started and game round is over
     *
     * @return {boolean}
     */
    animateClass() {
      return this.isGameOver && this.isGameStarted;
    },
  },
};
</script>

<style lang="scss" scopped>
.crossbar {
  width: 100%;
  height: 10px;
  transform: rotate(0);
  transition: 0.5s;

  &-gameover {
    animation: gameover 2s forwards;
  }

  @keyframes gameover {
    from {
      transform: rotate(0) translate(0, 0);
    }

    to {
      transform: rotate(689deg) translate(-50%, -50%);
    }
  }
}
</style>
