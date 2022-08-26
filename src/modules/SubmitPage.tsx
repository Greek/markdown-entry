import { Button } from '../ui/Button';
import { MainLayout } from '../ui/layouts/MainLayout';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { PreviewSidebar } from '../ui/PreviewSidebar';
import { TextArea } from '../ui/TextElement';

export const SubmitPage = ({ editMode = false, ...props }) => {
  const textAreaRef = useRef(null);
  const editCodeTextAreaRef = useRef(null);

  const { push, query } = useRouter();

  const [textEditor, setTextEditor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [previewArea, setPreviewAreaToggle] = useState(false);
  const [previewAreaContent, setPreviewAreaContent] = useState('# h');

  useEffect(() => {
    setTextEditor(props.entry?.content);
  }, [editMode, props.entry]);

  useEffect(() => {
    setPreviewAreaContent(textEditor);
  }, [textEditor]);

  const performSaveAction = () => {
    fetch(`/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://mentry.apap04.com/',
      },

      body: JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        content: previewAreaContent,
      }),
    }).then(async (r) => {
      const res = await r.json();

      if (!r.ok) {
        setErrorMessage(res.error);
        return;
      }

      push(`/${res.id}?c=${res.editCode}`, `/${res.id}`);
    });
  };

  const performEditAction = () => {
    fetch(`/api/${query.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://mentry.apap04.com/',
      },

      body: JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        content: textAreaRef?.current?.value as unknown,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        editCode: editCodeTextAreaRef?.current?.value as unknown,
      }),
    }).then(async (r) => {
      const res = await r.json();

      if (!r.ok) {
        setErrorMessage(res.error);
        return;
      }

      push(`/${res.id}?c=${res.editCode}`, `/${res.id}`);
    });
  };

  return (
    <>
      <MainLayout>
        {previewArea ? (
          <Button
            onClick={() => {
              setPreviewAreaToggle(false);
              setTextEditor(previewAreaContent);
            }}
          >
            Disable editor preview
          </Button>
        ) : (
          <Button
            onClick={() => {
              setPreviewAreaToggle(true);
              setTextEditor(previewAreaContent);
            }}
          >
            Enable editor preview
          </Button>
        )}
        {!previewArea && (
          <TextArea
            ref={textAreaRef}
            defaultValue={textEditor}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setPreviewAreaContent(e.target.value);
            }}
          >
            {props.children}
          </TextArea>
        )}
        {previewArea && (
          <div className={`flex flex-col md:flex-row`}>
            <TextArea
              halfWidth
              ref={textAreaRef}
              defaultValue={textEditor}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setPreviewAreaContent(e.target.value);
              }}
            >
              {props.children}
            </TextArea>
            <PreviewSidebar>{previewAreaContent}</PreviewSidebar>
          </div>
        )}
        {editMode && (
          <input
            className={`bg-button-bg text-color-text max-w-xs p-4 outline-none resize-none ${
              errorMessage && 'border-red-500 border-l-4'
            }`}
            ref={editCodeTextAreaRef}
            placeholder="Edit code"
          ></input>
        )}
        {editMode ? (
          <Button onClick={performEditAction}>Submit edit</Button>
        ) : (
          <Button onClick={performSaveAction}>Submit</Button>
        )}

        <p>{errorMessage}</p>
      </MainLayout>
    </>
  );
};
