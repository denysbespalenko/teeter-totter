import createBox from "@/utils/createBox";
import {
  BOX_DISPLAY_QUANTITY,
  BASIC_TIMEOUT_DURATION,
  BASIC_TIMEOUT_STEP,
  STEPS_TO_LEVELUP,
} from "@/settings/setup";

export default {
  /**
   * Toggles game pause
   *
   * @param {*} state
   */

  togglePause(state) {
    state.isPaused = !state.isPaused;
  },

  /**
   * Toggles side of action
   *
   * @param {*} state
   */
  toggleTurn(state) {
    state.isLeftTurn = !state.isLeftTurn;
  },

  /**
   * Creates new randome box
   * Push it to leftSideFallingBoxes
   *
   * @param {*} state
   */
  addLeftSideFallingBox(state) {
    const box = createBox();
    state.leftSideFallingBoxes.push(box);
  },

  /**
   * Creates new randome box
   * Push it to righttSideFallingBoxes
   *
   * @param {*} state
   */
  addRightSideFallingBox(state) {
    const box = createBox();
    state.rightSideFallingBoxes.push(box);
  },

  /**
   * Takes first element from leftSideFallingBoxes
   * Push it to leftSideBoxes
   *
   * @param {*} state
   */
  pushBoxToLeftSide(state) {
    const box = state.leftSideFallingBoxes.shift();
    state.leftSideBoxes.push(box);
  },

  /**
   * Takes first element from rightSideFallingBoxes
   * Push it to rightSideBoxes
   *
   * @param {*} state
   */
  pushBoxToRightSide(state) {
    const box = state.rightSideFallingBoxes.shift();
    state.rightSideBoxes.push(box);
  },

  /**
   * Creates first rundome boxes for each side when game is started
   * Fills sideFallingBox arrays for each side
   *
   * @param {*} state
   */
  initBoxes(state) {
    for (let count = 0; count < BOX_DISPLAY_QUANTITY; count++) {
      const boxLeft = createBox();
      const boxRight = createBox();
      state.leftSideFallingBoxes.push(boxLeft);
      state.rightSideFallingBoxes.push(boxRight);
    }
  },
  /**
   * Checks if game isn't on pause or box is on last available  left position
   * If yes the box do not change the position
   * If no box goes left
   *
   * @param {*} state
   */
  slideLeft(state) {
    if (state.isPaused || state.leftSideFallingBoxes[0].offset >= 5) return;
    state.leftSideFallingBoxes[0].offset += 1;
  },

  /**
   * Checks if game isn't on pause or box is on last available  right position
   * If yes the box do not change the position
   * If no box goes right
   *
   * @param {*} state
   */
  slideRight(state) {
    if (state.isPaused || state.leftSideFallingBoxes[0].offset <= 1) return;
    state.leftSideFallingBoxes[0].offset -= 1;
  },

  /**
   * Increases currentLevelUpCount counter
   * Decreases game step timeout duration by 1
   * If counter riches STEPS_TO_LEVELUP number
   * Counter is reseted to 0
   * timeoutDuration for animations increases by BASIC_TIMEOUT_STEP number
   *
   * @param {*} state
   */
  decreaseTimeoutDuration(state) {
    state.currentLevelUpCount += 1;

    if (state.currentLevelUpCount >= STEPS_TO_LEVELUP) {
      state.currentLevelUpCount = 0;
      state.timeoutDuration -= BASIC_TIMEOUT_STEP;
    }
  },

  /**
   * Sets default settings to all state options
   *
   * @param {*} state
   */

  resetState(state) {
    state.isPaused = true;
    state.isLeftTurn = true;
    state.leftSideBoxes = [];
    state.rightSideBoxes = [];
    state.leftSideFallingBoxes = [];
    state.rightSideFallingBoxes = [];
    state.timeoutDuration = BASIC_TIMEOUT_DURATION;
    state.currentLevelUpCount = 0;
    state.currentRotationAngle = 0;
  },
};
