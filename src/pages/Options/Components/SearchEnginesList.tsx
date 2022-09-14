import React, { ReactChildren, ReactEventHandler } from 'react';
import './SearchEnginesList.css';
import defaultSites from '../../Content/modules/defaultSites';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
  faTrashCan,
  faFloppyDisk,
  faPlus,
  faRotateRight,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface Message {
  text: string;
  type: string;
}

interface InputProps {
  initValue: string;
  onChange: Function;
}

interface ButtonProps {
  icon: IconDefinition;
  onClick: ReactEventHandler;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  onClick,
  children,
}: ButtonProps) => {
  return (
    <button onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="lg" />
      <>{children}</>
    </button>
  );
};

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

const defaultOptions = {
  sites: defaultSites,
};

const SearchEnginsList: React.FC = () => {
  const [sites, setSites] = React.useState(defaultSites);
  const [message, setMessage] = React.useState({ text: '', type: '' });

  React.useEffect(() => {
    chrome.storage.sync.get(defaultOptions, function (items) {
      setSites(items.sites);
    });
  }, []);

  function deleteSite(index: number) {
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
            <Button
              onClick={() => deleteSite(index)}
              icon={faTrashCan}
            ></Button>
          </li>
        ))}
        <li>
          <div>
            <Button onClick={addOne} icon={faPlus}>
              Add
            </Button>
            <Button onClick={save} icon={faFloppyDisk}>
              Save
            </Button>
            <Button onClick={restoreDefault} icon={faRotateRight}>
              Restore Default
            </Button>
          </div>
        </li>
      </ul>
      <div className={message.type}>
        {message.text && <div>{message.text}</div>}
      </div>
    </div>
  );
};

export default SearchEnginsList;
