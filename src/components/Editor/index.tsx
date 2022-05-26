import {FC, useEffect, useRef} from 'react';
import EditorJS, {OutputData} from '@editorjs/editorjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Header from '@editorjs/header';

interface Props {
  defaultInitialData?: OutputData;
  onChange?: (value: OutputData) => void;
  editable?: boolean;
}

const DEFAULT_INITIAL_DATA: OutputData = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'This is my awesome editor!',
        level: 1
      }
    },
  ]
};

const EDITOR_HOLDER_ID = 'editorjs';

export const Editor: FC<Props> = ({defaultInitialData, onChange, editable = true}) => {
  const ejInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, [defaultInitialData]);

  const initEditor = () => {
    const editor: EditorJS = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      data: defaultInitialData || DEFAULT_INITIAL_DATA,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: () => {
        (async () => {
          const content = await ejInstance.current?.saver.save();
          if (content && onChange) {
            onChange(content);
          }
        })();
      },
      autofocus: true,
      tools: {
        header: Header,
      },
      readOnly: !editable
    });
  };

  return (
    <>
      <div id={EDITOR_HOLDER_ID} />
    </>
  );
};
