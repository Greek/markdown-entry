import { CenterLayout } from '../ui/layouts/CenterLayout';
import { Button } from '../ui/Button';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export const EditPage = ({ ...props }) => {
  const { push } = useRouter();
  const textAreaRef = useRef(null);
  const editCodeTextAreaRef = useRef(null);

  const [textEditor, setTextEditor] = useState('');
  const [editResult, setEditResult] = useState('');

  useEffect(() => {
    setTextEditor(props.entry.content);
  }, [props.entry]);

  const performSaveAction = () => {
    fetch(`/api/${props.entry.id}`, {
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
        editCode: editCodeTextAreaRef?.current.value,
      }),
    }).then(async (r) => {
      const res = await r.json();
      if (!r.ok) {
        setEditResult('Incorrect edit code');
        return;
      }

      push(`/${res.id}`);
    });
  };

  return (
    <CenterLayout>
      <div className={`flex flex-col py-3`}>
        <textarea
          className={`bg-button-bg text-color-text p-4 outline-none h-34 w-80 max-w-3xl resize-none`}
          ref={textAreaRef}
          defaultValue={textEditor}
        ></textarea>
      </div>
      <Button onClick={performSaveAction}>Submit</Button>
      <textarea
        className={`bg-button-bg text-color-text p-4 outline-none ${
          editResult && 'border-red-500 border-l-4'
        }`}
        ref={editCodeTextAreaRef}
        placeholder="Edit code"
      ></textarea>
      <p>{editResult}</p>
    </CenterLayout>
  );
};
