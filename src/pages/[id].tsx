/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

import ReactMarkdown from 'react-markdown';

import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import remarkRehype from 'remark-rehype';

import { CenterLayout } from '../ui/layouts/CenterLayout';
import { useRouter } from 'next/router';
import { Entry } from '@prisma/client';
import { AxiosError } from 'axios';
import React from 'react';
import Head from 'next/head';

export default function Id() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error }: { data?: Entry; error?: AxiosError } = useSWR(
    `/api/${id}`,
    fetcher,
    { refreshInterval: 0, revalidateOnFocus: false }
  );

  return (
    <CenterLayout>
      <Head>
        <title>Hey {data?.id}</title>
      </Head>
      <div className={`flex flex-col py-4 px-2 bg-button-bg text-color-text`}>
        {!data && !error && <h1> Loading ... </h1>}
        {data && (
          <ReactMarkdown
            children={data?.content}
            remarkPlugins={[
              remarkGfm,
              remarkEmoji,
              remarkParse,
              // @ts-ignore
              remarkRehype,
              remarkSqueezeParagraphs,
            ]}
          />
        )}
        {error &&
          ((
            <p>{`${error.response?.status} ${error.response?.data}`}</p>
          ) as React.ReactNode)}
      </div>
    </CenterLayout>
  );
}

// export const getServerSideProps = async (context: NextPageContext) => {
//   return {
//     props: {},
//   };
// };
