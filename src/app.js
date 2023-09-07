import {
    onChosenNameClick,
    onNameSequenceBlockClick,
    onSparklyButtonClick,
    onTeamToggleChange
} from "./eventListeners.js";
import {getToggleValue} from "./localStorage.js";
import {teams} from "./teams.js";


let weights = {};

function initializeWeights() {
    const {teamOne, teamRocket} = teams;

    const storedWeights = localStorage.getItem("weights");
    if (storedWeights) {
        weights = {...weights, ...JSON.parse(storedWeights)};
    }

    const teamMembers = [...teamOne,...teamRocket];

    for (const name of teamMembers) {
        if (!weights[name]) {
            weights[name] = 10;
        }
    }

    // cleanup old members from storage
    for (const name of Object.keys(weights)) {
        if (!teamMembers.includes(name)) {
            delete weights[name];
        }
    }
}

function lowerWeight(name) {
    weights[name] -= 2;
}

function resetTeamWeights(team) {
    for (const name of team) {
        weights[name] = 10;
    }
}

/**
 * This function picks a random name from the array of names
 * And lowers the weight of the chosen name, so it is less likely to be chosen again
 * @param {string[]} namesArray
 * @returns {string} - person to start
 */
export function pickName(namesArray) {
    const totalWeight = namesArray.reduce((acc, name) => acc + weights[name], 0);
    const random = Math.floor(Math.random() * totalWeight);

    let currentEnd = 0;
    let ranges = namesArray.reduce((acc, name) => {

        acc.push({
            start: currentEnd,
            end: currentEnd + weights[name],
            name: name
        });

        currentEnd += weights[name];
        return acc;
    }, []);

    let selectedRange = ranges.filter(range => range.start <= random && range.end > random)[0];
    let selectedName = selectedRange.name;

    lowerWeight(selectedName);

    let currentTeamWeights = namesArray.reduce((acc, name) => {
        acc[name] = weights[name];
        return acc;
    }, {})

    // if over halve has had their weight lowered, reset the weights
    if (Object.values(currentTeamWeights).filter(weight => weight < 8).length > Object.values(currentTeamWeights).length / 2) {
        resetTeamWeights(namesArray);
    }

    localStorage.setItem("weights", JSON.stringify(weights));

    return selectedName;
}

export function removeName(nameToRemove, array) {
    const names = [...array];
    const index = names.indexOf(nameToRemove);
    if (index > -1) {
        names.splice(index, 1);
    }
    return names
}

export function getRandomSequence(array) {
    const shuffledArray = [...array]; // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.join(" -> ");
}

function initializeToggle() {
    const toggle = document.getElementById("team-toggle");
    toggle.checked = getToggleValue();
}

function setupEventListeners() {
    document.querySelector('#sparkly-button')?.addEventListener('click', onSparklyButtonClick);
    document.querySelector('#chosen-name')?.addEventListener('click', onChosenNameClick);
    document.querySelector('#team-toggle')?.addEventListener('change', onTeamToggleChange);
    document.querySelector('#names-sequence-block')?.addEventListener('click', onNameSequenceBlockClick)
}

setupEventListeners();

initializeWeights();
initializeToggle();
