<template>
  <div class="score">
    <div class="score-item">
      <p>
        Score: <span>{{ leftSideBoxes.length }}</span>
      </p>
    </div>
    <div class="score-item">
      <p>
        Left side weight: <span>{{ leftSideWeight }}</span>
      </p>
    </div>
    <div class="score-item">
      <p>
        Right side weight: <span>{{ rightSideWeight }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Score",
  computed: {
    ...mapGetters(["leftSideWeight", "rightSideWeight"]),
    ...mapState(["leftSideBoxes"]),
  },
};
</script>

<style lang="scss" scope>
.score {
  display: flex;
  color: #fff;
  &-item {
    padding: 5px;
  }
}
</style>
