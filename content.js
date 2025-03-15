/**
 * Function to find the container by the button's aria-label text
 *
 * @param {string} labelText - The aria-label text to search for.
 * @returns {HTMLElement|null} The closest div container of the button if found, otherwise null.
 */
function getButtonContainerByAriaLabel(labelText) {
  const button = [...document.querySelectorAll('button')].find(button => {
    const ariaLabel = button.getAttribute('aria-label');
    return ariaLabel && ariaLabel.trim().toLowerCase() === labelText.toLowerCase();
  });
  return button ? button.closest('div') : null;
}

/**
 * Function to create a language button element.
 *
 * @param {string} languageName - The name of the language to display on the button.
 * @param {string} languageCode - The code of the language.
 * @returns {HTMLElement} The created language button element.
 */
function createLanguageButton(languageName, languageCode) {
  const button = document.createElement('div');
  button.className = 'custom-language-btn';
  button.innerText = languageName;
  button.dataset.language = languageCode;
  return button;
}

/**
 * Function to add a click event listener to the language button.
 *
 * @param {HTMLElement} button - The language button element.
 * @param {string} languageName - The name of the language associated with the button.
 */
function addLanguageButtonClickListener(button, languageName) {
  button.addEventListener('click', () => {
    const languageListItems = getLanguageListItems();
    const languageElement = findLanguageElement(languageListItems, languageName);
    if (languageElement) {
      languageElement.click();
    } else {
      console.log(`${languageName} not found`);
    }
  });
}

/**
 * Function to get the language list items from the language container.
 *
 * @returns {NodeListOf<HTMLElement>} The list of language option elements.
 */
function getLanguageListItems() {
  const languageListContainers = document.querySelectorAll('[role="listbox"]');
  const targetLanguageListContainer = languageListContainers[2]; // The 3rd listbox is the one we need
  return targetLanguageListContainer.querySelectorAll('[role="option"]');
}

/**
 * Function to find the language element in the list by its text content.
 *
 * @param {NodeListOf<HTMLElement>} languageListItems - The list of language option elements.
 * @param {string} languageName - The language name to search for.
 * @returns {HTMLElement|null} The language element if found, otherwise null.
 */
function findLanguageElement(languageListItems, languageName) {
  return [...languageListItems].find(el =>
    el.textContent.trim().toLowerCase().includes(languageName.toLowerCase())
  );
}

// Function to create and add language buttons to the container
function addLanguageButtons() {
  const currentLang = document.documentElement.lang;
  const languageNames = getLanguageNames(currentLang);
  const labelText = currentLang === 'ru' ? 'Другие языки перевода' : 'More target languages';
  const container = getButtonContainerByAriaLabel(labelText);

  if (!container) {
    console.log('Language button container not found');
    return;
  }

  Object.entries(languageNames).forEach(([languageName, languageCode]) => {
    const button = createLanguageButton(languageName, languageCode);
    addLanguageButtonClickListener(button, languageName);
    container.appendChild(button);
  });
}

// Function to get the language names based on the current language
function getLanguageNames(currentLang) {
  const languagesByText = {
    'ru': {
      английский: 'en',
      украинский: 'ua',
      грузинский: 'ka',
      польский: 'pl'
    },
    'en': {
      english: 'en',
      ukrainian: 'ua',
      georgian: 'ka',
      polish: 'pl'
    }
  };
  return languagesByText[currentLang] || {};
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateButtons') {
    updateLanguageButtons();
  }
});

// Function to hide or show language buttons based on preferences
function updateLanguageButtons() {
  chrome.storage.local.get('languagePreferences', (data) => {
    const preferences = data.languagePreferences || {};
    document.querySelectorAll('.custom-language-btn').forEach(button => {
      const languageCode = button.dataset.language;
      button.style.display = preferences[languageCode] === false ? 'none' : 'block';
    });
  });
}

// Initialize the language buttons on page load
window.addEventListener('load', () => {
  addLanguageButtons();
  updateLanguageButtons();
});
