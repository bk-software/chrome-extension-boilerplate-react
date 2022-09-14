import React from 'react';
import { Modifiers } from '../../Content/modules/modifier';

export default function ChooseModifier() {
  const [currentModifier, setCurrentModifier] = React.useState(Modifiers.None);

  React.useEffect(() => {
    chrome.storage.sync.get({ modifier: Modifiers.None }, function (items) {
      setCurrentModifier(items.modifier || Modifiers.None);
    });
  }, []);

  const onChangeValue = (event: any) => {
    const modifier = event.target.value;
    chrome.storage.sync.set({ modifier });
    setCurrentModifier(modifier);
  };

  return (
    <ul>
      {Object.keys(Modifiers).map((modifier) => (
        <li key={modifier}>
          <input
            type="radio"
            value={modifier}
            onChange={onChangeValue}
            checked={modifier === currentModifier}
          />
          {modifier}
        </li>
      ))}
    </ul>
  );
}
