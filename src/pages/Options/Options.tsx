import React from 'react';
import './Options.css';
import defaultSites from '../Content/modules/defaultSites';

interface Props {
  props: string;
}

interface Message {
  text: string;
  type: string;
}

interface InputProps {
  initValue: string;
  onChange: Function;
}

const Input: React.FC<InputProps> = ({ initValue, onChange }: InputProps) => {
  const [value, setValue] = React.useState(initValue);

  function update(e: React.FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
  }

  return (
    <React.Fragment>
      <input value={value} onChange={update} />
    </React.Fragment>
  );
};

const Options: React.FC = () => {
  const [sites, setSites] = React.useState(defaultSites);
  const [message, setMessage] = React.useState({ text: '', type: '' });

  React.useEffect(() => {
    chrome.storage.sync.get({ sites: defaultSites }, function (items) {
      setSites(items.sites);
    });
  }, []);

  function deleteSite(index: number) {
    console.log({ index });
    const temp = [...sites];
    temp.splice(index, 1);
    setSites(temp);
  }

  function addMessage(type: string, text: string) {
    setMessage({ type, text });
  }

  function validateSites() {
    for (let site of sites) {
      if (!site.name || !site.searchString) {
        return false;
      }
    }

    return true;
  }

  function save() {
    if (!validateSites()) {
      addMessage('error', 'Fields should not be emtpy');
      return;
    }
    //chrome.storage.sync.set({ sites: [...sites] });
    chrome.storage.sync.set({ sites });

    addMessage('success', 'Options saved');
  }

  function addOne() {
    setSites([
      ...sites,
      {
        name: '',
        searchString: '',
      },
    ]);
  }

  function restoreDefault() {
    chrome.storage.sync.clear(() => setSites(defaultSites));
  }
  return (
    <div id="sites-options">
      <ul>
        {sites.map((site, index) => (
          <li key={index}>
            <Input
              initValue={site.name}
              onChange={(value: string) => (site.name = value)}
            />
            <Input
              initValue={site.searchString}
              onChange={(value: string) => (site.searchString = value)}
            />
            <button onClick={() => deleteSite(index)}>delete</button>
          </li>
        ))}
        <li>
          <button onClick={addOne}>Add One</button>
          <button onClick={save}>Save</button>
          <button onClick={restoreDefault}>Restore Default</button>
        </li>
      </ul>
      <div className={message.type}>
        {message.text && <div>{message.text}</div>}
      </div>
    </div>
  );
};

export default Options;
