import {getRandomSequence, pickName, removeName} from "./app.js";
import copy from "copy-to-clipboard";
import party from "party-js";
import {teams} from "./teams.js";
import {hideToggle, setDisplay, setText, showToggle} from "./viewHelpers.js";
import {getToggleValue, setToggleValue} from "./localStorage.js";

export function onSparklyButtonClick() {
    const {teamOne, teamRocket} = teams

    const isTeamRocket = getToggleValue();
    const names = isTeamRocket ? teamRocket : teamOne;
    const randomName = pickName(names);

    hideToggle();

    setDisplay("none", "sparkly-button");
    setDisplay("block", "chosen-name", "names-sequence-block");

    setText(randomName, "chosen-name");
    setText(getRandomSequence(removeName(randomName, names)), "names-sequence");
    setText(randomName, "first-person-to-start");

    party.confetti(document.getElementById("chosen-name"));
}

export function onChosenNameClick(e) {
    showToggle();
    const nameDisplay = document.getElementById("chosen-name");
    const button = document.getElementById("sparkly-button");
    const namesSequenceBlock = document.getElementById("names-sequence-block");
    nameDisplay.style.display = "none";
    namesSequenceBlock.style.display = "none";
    button.style.display = "block";
}

export function onTeamToggleChange(e) { setToggleValue(e.target.checked); }

/**
 * On click copy the name sequence to the clipboard
 * @param e {Event}
 */
export function onNameSequenceBlockClick(e) {
    const clipboardText = e.target?.innerText;
    copy(clipboardText, {
        debug: true,
    });
}
