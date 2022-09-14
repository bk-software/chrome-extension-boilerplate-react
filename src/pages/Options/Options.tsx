import React from 'react';
import './Options.css';
import ChooseModifier from './Components/ChooseModifier';
import SearchEnginsList from './Components/SearchEnginesList';

const Options: React.FC = () => {
  return (
    <div>
      <h2>Search Engines List</h2>
      <SearchEnginsList />

      <h2>Choose the right modifier for you</h2>
      <ChooseModifier />
    </div>
  );
};

export default Options;
