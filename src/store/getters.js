import {
  MAX_WEIGHT_DIFFERENCE,
  CROSSBAR_MAX_BENDING,
  CROSSBAR_MIN_BENDING,
} from "@/settings/setup";

export default {
  /**
   * Returns left side Boxes weights
   *
   * @param {*} state
   * @return {number}
   */

  leftSideWeight(state) {
    return state.leftSideBoxes.reduce((acc, box) => {
      return (acc += box.weight * box.offset);
    }, 0);
  },

  /**
   * Returns right side Boxes weights
   *
   * @param {*} state
   * @return {number}
   */

  rightSideWeight(state) {
    return state.rightSideBoxes.reduce((acc, box) => {
      return (acc += box.weight * box.offset);
    }, 0);
  },

  /**
   * Returns crossbar rotation angle
   *
   * @param {*} getters
   * @return {number}
   */

  rotationAngle(_, getters) {
    const { rightSideWeight, leftSideWeight } = getters;

    if (!leftSideWeight || leftSideWeight === rightSideWeight) return 0;
    const maxValue = Math.max(rightSideWeight, leftSideWeight);

    return ((rightSideWeight - leftSideWeight) / maxValue) * 100;
  },

  /**
   * Returns Game status, is it started
   *
   * @param {*} getters
   * @return {boolean}
   */

  isGameStarted(_, getters) {
    const { rightSideWeight } = getters;

    return Boolean(rightSideWeight);
  },

  /**
   * Returns Game status, is it over or not
   *
   * @param {*} getters
   * @return {boolean}
   */

  isGameOver(_, getters) {
    const { rightSideWeight, leftSideWeight, rotationAngle, isGameStarted } =
      getters;

    return (
      !isGameStarted ||
      rotationAngle >= CROSSBAR_MAX_BENDING ||
      rotationAngle <= CROSSBAR_MIN_BENDING ||
      (Math.abs(leftSideWeight - rightSideWeight) >= MAX_WEIGHT_DIFFERENCE &&
        leftSideWeight !== 0)
    );
  },
};
