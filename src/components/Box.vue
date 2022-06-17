<template>
  <div
    class="box"
    :class="propsClassName"
    :style="propsStyles"
  >
    {{ box.weight }}
  </div>
</template>
<script>
import { BOX_TYPES } from "@/settings/setup";

import { BOX_COLORS } from "@/settings/theme";

import { mapState } from "vuex";

export default {
  name: "Box",

  props: {
    box: {
      type: Object,
      require: true,
    },
    top: {
      type: Number,
      default: 0,
    },
    isLeft: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapState(["timeoutDuration"]),

    /**
     * Returns class name following props.box.type and [BOX_TYPES]
     *
     * @return {string}
     */
    propsClassName() {
      const { type } = this.box;
      return `box-${BOX_TYPES[type]}`;
    },

    /**
     * Return left position for box following props.isLeft
     *
     * @return {string}
     */
    offsetPosition() {
      const { offset } = this.box;
      if (this.isLeft) {
        return { left: `${50 - offset * 10}%` };
      } else {
        return { left: `${50 + offset * 10}%` };
      }
    },

    /**
     * Returns object of inline styles for box following props.box.size,
     * and props.box.type and [BOX_COLORS]
     *
     * @return {object}
     */
    propsStyles() {
      const { type, size } = this.box;
      let styles = {};

      if (type === 0) {
        styles = {
          borderWidth: `0 ${size}px ${size}px ${size / 3}px`,
          lineHeight: `${size}px`,
          borderColor: `transparent transparent ${BOX_COLORS[type]} transparent`,
        };
      } else {
        styles = {
          height: `${size}px`,
          width: `${size}px`,
          lineHeight: `${size}px`,
          backgroundColor: BOX_COLORS[type],
        };
      }

      return {
        transition: `${this.timeoutDuration}ms`,
        top: `${this.top}px`,
        ...this.offsetPosition,
        ...styles,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  transform: translate(-50%, -100%);
  text-align: center;
  transition: 250ms;

  &-rectangle {
    border: 1px solid #fff;
  }

  &-triangle {
    width: 0;
    height: 0;
    border-style: solid;
  }

  &-circle {
    border-radius: 50%;
  }
}
</style>
