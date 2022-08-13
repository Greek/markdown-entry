import { CenterLayout } from '../ui/layouts/CenterLayout';
import { Button } from '../ui/Button';
import { useRef } from 'react';

export default function Home() {
  const textAreaRef = useRef(null);

  const performSaveAction = () => {
    fetch(`/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://apap04.com',
      },

      body: JSON.stringify({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        content: textAreaRef?.current?.value as unknown,
      }),
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
}

// export const getServerSideProps = async (context: NextPageContext) => {
//   return {
//     props: {},
//   };
// };
