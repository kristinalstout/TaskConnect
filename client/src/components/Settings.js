import React from "react";

function Settings({ darkMode, handleToggleDarkMode }) {
  return (
    <div className="settings">
      <button
        onClick={handleToggleDarkMode}
        className={`toggle-dark-mode ${darkMode ? 'dark-mode' : ''}`}
      >
        Toggle Mode
      </button>
    </div>
  );
}

export default Settings;
