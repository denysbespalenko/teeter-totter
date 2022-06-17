<template>
  <Box
    :box="box"
    :top="top"
    :isLeft="isLeft"
    :isPaused="isPaused"
    ref="box"
  />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

import { CROSSBAR_WIDTH } from "@/settings/setup";

import getCrossbarCoordinates from "@/utils/getCrossbarCoordinates";

import Box from "@/components/Box";

export default {
  name: "FallingBox",

  components: {
    Box,
  },

  props: {
    box: {
      type: Object,
      required: true,
    },
    itemIndex: {
      type: Number,
      required: true,
    },
    isLeft: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      timerId: null,
      top: this.box.size,
      bottom: null,
      animationStep: 30,
    };
  },

  computed: {
    ...mapState(["isPaused", "isLeftTurn", "timeoutDuration"]),
    ...mapGetters(["rotationAngle"]),
  },

  methods: {
    ...mapActions(["newBoxesCircle"]),
    ...mapMutations(["decreaseTimeoutDuration"]),
    /**
     * Return approximately right falling place for the box following getCrossbarCoordinates(),
     * getter rotationAngle and number CROSSBAR_WIDTH
     * @return {number}
     */
    blockBottomPosition() {
      const { top, bottom } = getCrossbarCoordinates();
      const { offset } = this.box;

      return this.rotationAngle >= 0
        ? top + ((bottom - top) / 2) * (1 - offset / (CROSSBAR_WIDTH / 2))
        : bottom - ((bottom - top) / 2) * (1 - offset / (CROSSBAR_WIDTH / 2));
    },

    /**
     * Method is used for controlled left falling
     * Get current bottom position of the box
     * Set timeout for box falling
     * If the box bottom reachs crossbar top position
     */
    controlledFalling() {
      this.bottom = this.$refs.box.$el.getBoundingClientRect().bottom;

      this.timerId = setTimeout(() => {
        if (this.bottom >= this.blockBottomPosition() - this.animationStep) {
          this.newBoxesCircle();
          this.decreaseTimeoutDuration();

          clearInterval(this.timerId);
        }
        this.top += this.animationStep;
      }, this.timeoutDuration);
    },

    /**
     * Method is used for uncontcolled right falling
     */
    unControlledFalling() {
      this.bottom = this.$refs.box.$el.getBoundingClientRect().bottom;
      this.top = this.blockBottomPosition();
      this.newBoxesCircle();
    },

    /**
     * Method wich we use for every component update
     * If game was paused we stop the box falling
     * if the box isn't a first item in array we stop runnig
     * If the box has left position and the time is for left animation
     * We use method for contcolled falling
     * If the box has right position and the time is for right animation
     * We use method for uncontcolled falling
     */
    boxUpdated() {
      if (this.isPaused) return clearInterval(this.timerId);
      if (this.itemIndex !== 0) return;
      if (this.isLeft && this.isLeftTurn) {
        this.controlledFalling();
      } else if (!this.isLeft && !this.isLeftTurn) {
        this.unControlledFalling();
      }
    },
  },

  watch: {
    isLeftTurn: {
      handler() {
        this.boxUpdated();
      },
      deep: true,
    },

    itemIndex: {
      handler() {
        this.boxUpdated();
      },
      deep: true,
    },
  },

  updated() {
    this.boxUpdated();
  },
};
</script>
