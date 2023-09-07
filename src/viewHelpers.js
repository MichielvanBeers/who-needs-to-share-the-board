export function hideToggle() {
    const toggleContainer = document.getElementById("toggle-container");
    toggleContainer.style.display = "none";
}

export function showToggle() {
    const toggleContainer = document.getElementById("toggle-container");
    toggleContainer.style.display = "flex";
}

/**
 * This function sets display style for all elements with id's that are passed as variadic arguments
 * @param {'block' | 'none'} displayType - display style to set
 * @param  {...string} arguments - id's of elements to set display style to none
 */
export function setDisplay(displayType) {
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
export function setText(text) {
    for (let i = 1; i < arguments.length; i++) {
        const element = document.getElementById(arguments[i]);
        element.innerText = text;
    }
}
