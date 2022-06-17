<script>
import { DEFAULT_BG_COLOR } from "@/settings/theme";

export default {
  name: "UIContainer",

  props: {
    tag: {
      type: String,
      default: "section",
    },
    bg_color: {
      type: String,
      default: DEFAULT_BG_COLOR,
    },
  },

  computed: {
    cssProps() {
      return {
        "background-color": this.bg_color,
      };
    },
  },

  /**
   * Returns VNODE with tag following props.tag
   * @returns {VNODE}
   */
  render(createElement) {
    return createElement(
      this.tag,
      {
        class: "ui-container ",
        style: this.cssProps,
        attrs: {
          id: this.$parent.$options._componentTag,
        },
      },
      this.$slots.default
    );
  },
};
</script>

<style lang="scss" scoped>
.ui-container {
  width: 100%;
  padding: 20px 100px;
  overflow: hidden;
  &-inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1400px;
  }
}
</style>
