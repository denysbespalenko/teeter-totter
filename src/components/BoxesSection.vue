<template>
  <div class="boxes-section">
    <FallingBox
      v-for="(box, index) in leftSideFallingBoxes"
      :key="box.id"
      :box="box"
      :isLeft="true"
      :itemIndex="index"
    />
    <FallingBox
      v-for="(box, index) in rightSideFallingBoxes"
      :key="box.id"
      :box="box"
      :isLeft="false"
      :itemIndex="index"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FallingBox from "@/components/FallingBox.vue";

export default {
  name: "BoxesSection",

  components: {
    FallingBox,
  },

  computed: {
    ...mapState(["leftSideFallingBoxes", "rightSideFallingBoxes"]),
  },

  methods: {
    ...mapMutations(["slideLeft", "slideRight"]),

    /**
     * Moves falling box to left, right sides
     * Using slideLeft and slideRight mutations
     *
     */
    moveBox(event) {
      if (event.keyCode === 37) this.slideLeft();
      if (event.keyCode === 39) this.slideRight();
    },
  },

  beforeMount() {
    window.addEventListener("keydown", this.moveBox);
  },

  beforeDestroy() {
    window.removeEventListener("keydown", this.moveBox);
  },
};
</script>

<style scoped>
.boxes-section {
  position: relative;
  height: 70%;
}
</style>
