import { CenterLayout } from '../ui/layouts/CenterLayout';
import { Button } from '../ui/Button';
import { useRef } from 'react';
import { useRouter } from 'next/router';

export const SubmitPage = () => {
  const textAreaRef = useRef(null);
  const { push } = useRouter();

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
      const res = await r.json();
      push(`/${res.id}`);
    });
  };

  return (
    <CenterLayout>
      <div className={`flex flex-col py-3`}>
        <textarea
          className={`bg-[#464646] text-[#999] p-4 outline-none`}
          ref={textAreaRef}
        ></textarea>
      </div>
      <Button onClick={performSaveAction}>Submit</Button>
    </CenterLayout>
  );
};
