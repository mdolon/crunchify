/**
 * Example settings array
 */
const settings = [
  {
    id: 'testCheckbox',
    defaultValue: true,
  },
  {
    id: 'testInput',
    defaultValue: 'John Doe',
  },
];

/**
 * Get settings values from local storage.
 * @return {Object} Settings
 */
const getOptions = callback => chrome.storage.sync.get(settings.map(s => s.id), callback);

const statusBox = document.getElementById('status');

/**
 * Set statusbox text for one second then remove it.
 */
const setStatusBox = (msg = 'Options saved.', clear = true, duration = 1000) => {
  statusBox.textContent = msg;

  if (clear) {
    setTimeout(() => {
      statusBox.textContent = '';
    }, duration);
  }
};

/**
 * Fetch option fields
 */
const saveOptions = () => {
  const values = {};
  let input;

  // Iterate through settings and get values
  settings.forEach((s) => {
    input = document.getElementById(s.id);
    values[s.id] = input.type === 'checkbox' ? input.checked : input.value;
  });

  // Persist values and alert the user that options have been saved
  chrome.storage.sync.set(values, setStatusBox);
};

/**
 * Get options from local storage and update UI to reflect their state
 */
const restoreOptions = () => {
  getOptions((optionValues) => {
    let input;

    settings.forEach((s) => {
      input = document.getElementById(s.id);

      if (input.type === 'checkbox' && optionValues[s.id]) {
        input.checked = true;
      } else {
        input.value = optionValues[s.id];
      }
    });
  });
};

/* Set event listener and restore options only after the dom has fully loaded */
document.addEventListener('DOMContentLoaded', () => {
  /* When someone presses 'save', persist the options to local storage. */
  document.getElementById('save').addEventListener('click', saveOptions);

  /* Once the settings page has loaded, ensure UI reflects settings stored locally. */
  restoreOptions();
});
