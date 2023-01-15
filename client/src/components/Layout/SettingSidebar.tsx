import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import RangeSlider from '~components/RangeSlider';
import EditorConfig from '~store/config/editor';

export function Component() {
  const [editorConfig] = useState(() => EditorConfig);

  const { autoSaveDelay, setAutoSaveDelay } = editorConfig;

  const handleDelayChange = (e: ChangeEvent<any>) => {
    setAutoSaveDelay(e.target.value);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">Settings</a>
      </div>
      <RangeSlider
        min={1}
        max={10}
        value={autoSaveDelay}
        onChange={handleDelayChange}
      />
      <li className="p-2">Code will be saved after {autoSaveDelay}s</li>
    </>
  );
}

export default observer(Component);
