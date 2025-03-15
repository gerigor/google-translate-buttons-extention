// List of available languages and their codes
const languages = {
  'English': 'en',
  'Ukrainian': 'ua',
  'Georgian': 'ka',
  'Polish': 'pl'
};

// Function to load saved language preferences and display checkboxes
// Retrieves preferences from Chrome storage, then dynamically creates and displays checkboxes for each language
function loadLanguagePreferences() {
  chrome.storage.local.get('languagePreferences', (data) => {
    const preferences = data.languagePreferences || {};
    const languageOptionsContainer = document.getElementById('language-options');

    languageOptionsContainer.innerHTML = '';

    Object.keys(languages).forEach(languageName => {
      const languageCode = languages[languageName];
      const isChecked = preferences[languageCode] !== false;
      const checkbox = createLanguageCheckbox(languageName, languageCode, isChecked);
      languageOptionsContainer.appendChild(checkbox);
    });
  });
}

/**
 * Function to create a checkbox for each language
 *
 * @returns {HTMLElement} The label element containing the checkbox for the language.
 */
function createLanguageCheckbox(languageName, languageCode, isChecked) {
  const checkboxContainer = document.createElement('div');
  checkboxContainer.classList.add('checkbox-container');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = isChecked;
  checkbox.value = languageCode;
  checkbox.id = languageCode;

  const label = document.createElement('label');
  label.setAttribute('for', languageCode);
  label.innerText = languageName;

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);

  return checkboxContainer;
}

// Function to save language preferences to Chrome Storage
function saveLanguagePreferences() {
  const preferences = {};
  const checkboxes = document.querySelectorAll('#language-options input[type="checkbox"]');

  checkboxes.forEach(checkbox => {
    preferences[checkbox.value] = checkbox.checked;
  });

  chrome.storage.local.set({ 'languagePreferences': preferences }, () => {
    chrome.runtime.sendMessage({ action: 'updateLanguageButtons' });
    window.close();
  });
}

// Event listener for the save button
document.getElementById('save-button').addEventListener('click', saveLanguagePreferences);

// Load preferences when popup is opened
document.addEventListener('DOMContentLoaded', loadLanguagePreferences);