/**
 * Get the value of the team toggle
 * @return {boolean}
 */
export function getToggleValue() {
    return localStorage.getItem("toggleValue") === "team_rocket";
}

/**
 * This functions sets the selected team in the local storage
 * @param {boolean} value - true for team_rocket, false for team_one
 */
export function setToggleValue(value) {
    localStorage.setItem("toggleValue", value ? "team_rocket" : "team_one");
}
