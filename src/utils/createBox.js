import {
  BOX_TYPES,
  BOX_MAX_WEIGHT,
  BOX_MIN_WEIGHT,
  CROSSBAR_WIDTH,
} from "@/settings/setup";

/**
 * Returns random box
 *
 * @return {object}
 */

export default () => {
  const id = Date.now() + Math.random();
  const type = Math.floor(Math.random() * BOX_TYPES.length);
  const weight = Math.floor(Math.random() * BOX_MAX_WEIGHT) + BOX_MIN_WEIGHT;
  const offset = Math.floor((Math.random() * CROSSBAR_WIDTH) / 2) + 1;
  const size = weight * 12;
  return {
    id,
    type,
    weight,
    offset,
    size,
  };
};
