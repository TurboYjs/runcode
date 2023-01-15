import classnames from 'classnames';
import { CodeType } from '~utils/codeType';
import Select, { IOption } from '~components/Select';
import EditorConfig, { ThemeType } from '~store/config/editor';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

const codeOptions: IOption<CodeType>[] = [
  { label: 'C++', value: CodeType.cpp },
  { label: 'C', value: CodeType.c },
  { label: 'Java', value: CodeType.java },
  { label: 'Rust', value: CodeType.rust },
  { label: 'Nodejs', value: CodeType.nodejs },
  { label: 'typescript', value: CodeType.typescript },
  { label: 'Go', value: CodeType.go },
  { label: 'C#', value: CodeType.dotnet },
  { label: 'Python3', value: CodeType.python3 },
  { label: 'php', value: CodeType.php },
];

const themeOptions: IOption<ThemeType>[] = [
  {
    label: 'Visual Studio',
    value: ThemeType['Visual Studio'],
  },
  {
    label: 'Visual Studio Dark',
    value: ThemeType['Visual Studio Dark'],
  },
  {
    label: 'High Contrast light',
    value: ThemeType['High Contrast'],
  },
  {
    label: 'High Contrast Dark',
    value: ThemeType['High Contrast Dark'],
  },
];

function Component() {
  const [editorConfig] = useState(() => EditorConfig);
  const { codeType, editorThemeType, setCodeType, setEditorThemeType } =
    editorConfig;

  return (
    <div
      className={classnames(
        'pt-3 pb-2 mt-2',
        'flex flex-row items-center justify-between'
      )}
    >
      <div className="flex-row">
        <Select<CodeType>
          className="w-30 ml-2"
          size="md"
          options={codeOptions}
          value={codeType}
          onChange={(type) => setCodeType(type)}
        />
        <Select<ThemeType>
          className="w-42 ml-4"
          size="md"
          options={themeOptions}
          value={editorThemeType}
          onChange={(type) => setEditorThemeType(type)}
        />
      </div>
    </div>
  );
}

export default observer(Component);
