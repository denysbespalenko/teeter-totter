<template>
  <UIContainer
    :tag="'header'"
    :bg_color="headerColor"
  >
    <UIButton
      v-if="isGameOver"
      @click.native="startTheGame"
    >
      Start new game
    </UIButton>

    <UIButton
      v-if="!isGameOver"
      @click.native="togglePause"
      :bg_color="isPaused ? 'success' : 'error'"
    >
      {{ isPaused ? "Start" : "Pause" }}
    </UIButton>
    <Score />
  </UIContainer>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";

import { COLOR_MAIN } from "@/settings/theme";

import UIContainer from "@/components/UI/UIContainer";
import UIButton from "@/components/UI/UIButton";
import Score from "@/components/Score";

export default {
  name: "Header",

  data() {
    return {
      headerColor: COLOR_MAIN,
    };
  },

  components: {
    UIContainer,
    UIButton,
    Score,
  },

  methods: {
    ...mapMutations(["togglePause"]),
    ...mapActions(["startTheGame"]),
  },

  computed: {
    ...mapState(["isPaused"]),
    ...mapGetters(["isGameOver"]),
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
}
</style>
