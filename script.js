const team_one = [
    "Michiel 1",
    "Michiel 2",
    "Jesse",
    "Kevin",
    "Frank",
    "Ralph",
    "Louise",
    "Tarek",
    "Ashwas",
    "David",
    "William",
    "Bhaskara"
  ];

  const team_rocket = [
    "Ivan",
    "Maria",
    "Sandhya",
    "Dries",
    "Nick",
    "Tonny",
    "Alex",
    "Linh",
    "Kenny",
  ];

  function getToggleValue() {
    return localStorage.getItem("toggleValue") === "team_rocket";
  }

  function setToggleValue(value) {
    localStorage.setItem("toggleValue", value ? "team_rocket" : "team_one");
  }

  function hideToggle() {
    const toggleContainer = document.getElementById("toggle-container");
    toggleContainer.style.display = "none";
  }

  function showToggle() {
    const toggleContainer = document.getElementById("toggle-container");
    toggleContainer.style.display = "flex";
  }

  function pickName(namesArray) {
    return namesArray[Math.floor(Math.random() * namesArray.length)];
  }

  function handleClick() {
    hideToggle();

    const isTeamRocket = getToggleValue();
    const names = isTeamRocket ? team_rocket : team_one;
    const randomName = pickName(names);

    const button = document.getElementById("sparkly-button");
    button.style.display = "none";

    const nameDisplay = document.getElementById("chosen-name");
    nameDisplay.innerText = randomName;
    nameDisplay.style.display = "block";

    const firstPersonToStart = document.getElementById("first-person-to-start");
    firstPersonToStart.innerText = randomName;

    const namesSequenceBlock = document.getElementById("names-sequence-block");
    namesSequenceBlock.style.display = "block";
    const namesSequence = document.getElementById("names-sequence");
    namesSequence.innerText = getRandomSequence(removeName(randomName, names));

    party.confetti(nameDisplay);
  }

  function removeName(nameToRemove, array) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    const index = shuffledArray.indexOf(nameToRemove);
    if (index > -1) {
      shuffledArray.splice(index, 1);
      console.log(`Removed ${nameToRemove} from the list.`);
    } else {
      console.log(`${nameToRemove} is not found in the list.`);
    }
    return shuffledArray
  }

  function getRandomSequence(array) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray.join(" -> ");
  }

  function showButton() {
    showToggle();
    const nameDisplay = document.getElementById("chosen-name");
    const button = document.getElementById("sparkly-button");
    const namesSequenceBlock = document.getElementById("names-sequence-block");
    nameDisplay.style.display = "none";
    namesSequenceBlock.style.display = "none";
    button.style.display = "block";
  }

  function initializeToggle() {
    const toggle = document.getElementById("team-toggle");
    toggle.checked = getToggleValue();
  }

  function handleToggleChange(e) {
    setToggleValue(e.target.checked);
  }

  window.onload = () => {
    initializeToggle();
  };