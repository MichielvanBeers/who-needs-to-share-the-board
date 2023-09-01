const teamOne = [
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
    "Bhaskara",
    "Ivan",
    "Martins",
  ];

  const teamRocket = [
    "Ivan",
    "Maria",
    "Sandhya",
    "Dries",
    "Nick",
    "Tonny",
    "Alex",
    "Linh",
    "Kenny",
    "Liz"
  ];


  const weights = {};

  function initializeWeights() {

    const storedWeights = localStorage.getItem("weights");
    if (storedWeights) {
      Object.assign(weights, JSON.parse(storedWeights));
      return;
    } 


    for (const name of teamOne.concat(teamRocket)) {
      weights[name] = 10;
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
   * And lowers the weight of the chosen name so it is less likely to be chosen again
   * @param {string[]} namesArray 
   * @returns {string} - person to start
   */
  function pickName(namesArray) {

    const totalWeight = namesArray.reduce((acc, name) => acc + weights[name], 0);
    const random = Math.floor(Math.random() * totalWeight);
    let selectedName = null;
    
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
    selectedName = selectedRange.name;
    
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

  function removeName(nameToRemove, array) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    const index = shuffledArray.indexOf(nameToRemove);
    if (index > -1) {
      shuffledArray.splice(index, 1);
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
    initializeWeights();
    initializeToggle();
  };
