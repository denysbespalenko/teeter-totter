export default {
  /**
   * Checks if now is a turn for left side falling
   * If yes pushes first left falling box to boxes on crossbar
   * Pushes new randome falling box to state.leftSideFallingBoxes
   *
   * Checks if there are less boxes lays on right side
   * If yes changes state.isLeftTurn to false
   * Adds new randome falling box to state.rightSideFallingBoxes
   * Pushes first right falling box to boxes on crossbar
   * Changes state.isLeftTurn to true
   *
   * Checks if game is over
   * If yes toggle pause to false
   *
   * @param {*} { commit, state, getters }
   *
   */
  newBoxesCircle({ commit, state, getters }) {
    if (state.isLeftTurn) {
      commit("pushBoxToLeftSide");
      commit("addLeftSideFallingBox");
    }

    if (state.leftSideBoxes.length > state.rightSideBoxes.length) {
      commit("toggleTurn");
      commit("addRightSideFallingBox");
      commit("pushBoxToRightSide");
      commit("toggleTurn");
    }

    if (getters.isGameOver) {
      commit("togglePause");
    }
  },

  /**
   * Resets state
   * Inits new left, right boxes
   * Pushes first right falling box to boxes on crossbar
   *
   * @param {*} { commit }
   *
   */

  startTheGame({ commit }) {
    commit("resetState");
    commit("initBoxes");
    commit("pushBoxToRightSide");
  },
};
