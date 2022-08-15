import { Button } from '../ui/Button';
import { MainLayout } from '../ui/layouts/MainLayout';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export const SubmitPage = ({ editMode = false, ...props }) => {
  const textAreaRef = useRef(null);
  const editCodeTextAreaRef = useRef(null);

  const { push, query } = useRouter();

  const [textEditor, setTextEditor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTextEditor(props.entry?.content);
  }, [editMode, props.entry]);

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
        content: textAreaRef?.current?.value as unknown,
      }),
    }).then(async (r) => {
      if (!r.ok) {
        setErrorMessage('Please provide content.');
        return;
      }

      const res = await r.json();
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
        <textarea
          className={`bg-button-bg text-color-text p-4 mb-2 outline-none h-96`}
          ref={textAreaRef}
          defaultValue={textEditor}
        >
          {props.children}
        </textarea>
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
