/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import Head from 'next/head';

import ReactMarkdown from 'react-markdown';

import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import remarkRehype from 'remark-rehype';

import { CenterLayout } from '../ui/layouts/CenterLayout';
import { useRouter } from 'next/router';

export const ViewPage = ({ ...props }) => {
  const router = useRouter();

  const { c: editCode } = router.query;

  return (
    <CenterLayout>
      <Head>
        <title>{props.entry.content.substring(0, 10)}</title>
      </Head>
      {editCode && <p>Your edit code is {editCode}</p>}
      <div className={`flex flex-col py-4 px-2 bg-button-bg text-color-text`}>
        {props.entry && (
          <ReactMarkdown
            children={props.entry.content}
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
      </div>
    </CenterLayout>
  );
};
