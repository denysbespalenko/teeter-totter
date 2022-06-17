<template>
  <button
    class="ui-button"
    :style="cssPropsButton"
  >
    <span :style="cssPropsText">
      <slot></slot>
    </span>
    <span>
      <slot name="icon"></slot>
    </span>
  </button>
</template>

<script>
import {
  BUTTON_COLOR_DEFAULT,
  BUTTON_COLOR_SUCCESS,
  BUTTON_COLOR_ERROR,
  COLOR_BLACK,
  COLOR_WHITE,
} from "@/settings/theme";

const BASIC_COLOR_STATES = ["success", "error"];

export default {
  name: "UIButton",
  props: {
    bg_color: {
      type: String,
      default: BUTTON_COLOR_DEFAULT,
    },
    text_color: {
      type: String,
      default: COLOR_BLACK,
    },
  },

  methods: {
    /**
     * Checks if comparebleValues has currentValue value
     *
     * @param {string} currentValue - color option from props.bg_colors
     * @param {(string|string[])} comparableValues comparable values for currentValue
     * @return {boolean}
     */
    compareValues(currentValue, comparableValues = BASIC_COLOR_STATES) {
      if (!Array.isArray(comparableValues))
        comparableValues = [comparableValues];

      return comparableValues.some((value) => value === currentValue);
    },
  },

  computed: {
    /**
     * Checks if props.bg_color has basic string value or set propsed color value
     *
     * @return {string}
     */
    cssPropsButton() {
      const { bg_color } = this;

      return {
        "background-color": this.compareValues(bg_color, "success")
          ? BUTTON_COLOR_SUCCESS
          : this.compareValues(bg_color, "error")
          ? BUTTON_COLOR_ERROR
          : bg_color,
      };
    },

    /**
     * Checks if props.bg_color provides color  state from BASIC_COLOR_STATES
     * If yes returns color from COLOR_WHITE variable
     * If no takes color from props.text_color
     *
     * @return {string}
     */
    cssPropsText() {
      return {
        color: this.compareValues(this.bg_color)
          ? COLOR_WHITE
          : this.text_color,
      };
    },
  },
};
</script>

<style scoped>
.ui-button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 20px;
  width: 100%;
  max-width: 200px;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
