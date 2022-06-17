/**
 * Returns object with crossbar position params
 *
 * @return {object}
 */

export default function getCrossbarCoordinates() {
  return document.querySelector(".crossbar").getBoundingClientRect();
}
