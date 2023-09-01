import React from 'react';

function Settings({ isDarkMode, toggleMode }) {
  return (
    <div>
      <h2>Settings</h2>
      <button onClick={toggleMode}>
        Toggle Mode
      </button>
    </div>
  );
}

export default Settings;
