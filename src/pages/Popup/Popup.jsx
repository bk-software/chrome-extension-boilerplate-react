import React from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  function openOptions() {
    chrome.runtime.openOptionsPage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={openOptions}>Open Options</button>
      </header>
    </div>
  );
};

export default Popup;
