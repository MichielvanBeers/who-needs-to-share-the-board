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

  /**
   * This functions sets the selected team in the local storage
   * @param {boolean} value - true for team_rocket, false for team_one
   */
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

  /**
   * This function sets display style for all elemnts with id's that are passsed as variadic arguments
   * @param {'block' | 'none'} displayType - display style to set 
   * @param  {...string} arguments - id's of elements to set display style to none
   */
  function setDisplay(displayType) {
    for (let i = 1; i < arguments.length; i++) {
      const element = document.getElementById(arguments[i]);
      element.style.display = displayType;
    }
  }

  /**
   * set innerText by id
   * @param {string} text - text to set
   * @param  {...string} arguments - id's of elements to set innerText
   */
  function setText(text) {
    for (let i = 1; i < arguments.length; i++) {
      const element = document.getElementById(arguments[i]);
      element.innerText = text;
    }
  }

  function handleClick() {
    const isTeamRocket = getToggleValue();
    const names = isTeamRocket ? team_rocket : team_one;
    const randomName = pickName(names);

    hideToggle();

    setDisplay("none", "sparkly-button");
    setDisplay("block", "chosen-name", "names-sequence-block");

    setText(randomName, "chosen-name");
    setText(getRandomSequence(removeName(randomName, names)), "names-sequence");
    setText(randomName, "first-person-to-start");

    party.confetti(document.getElementById("chosen-name"));
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
  