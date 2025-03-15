# Language Preferences Chrome Extension

A simple Chrome extension to allow to customize the language options on the Google Translate page. 


## Tutorial Links
- [Extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/extensions-101/)

## Features
- Compatible with Google Translate page (`https://translate.google.com/`).
- Supports only English and Russian interface languages.
- Save and load language preferences using `chrome.storage`.

## Installation
- Unpack the extension.
- Open **Chrome** and navigate to `chrome://extensions/`.
- Enable **Developer mode** (top-right toggle).
- Click on **Load unpacked** and select the **folder** where the extension's files are located.

## Usage
- The extension displays customizable target language buttons on the Google Translate page.
- The user can toggle which languages are visible by saving their preferences (click on extension icon in top bar).

### File Structure
- popup.html: A form for inputting API details.
- popup.js: Handles the popup window for the extension, allowing to select and save language preferences.
- background.js: Listens for messages and coordinates tasks like updating language buttons across open tabs.
- content.js: Script that interacts with the Google Translate page
