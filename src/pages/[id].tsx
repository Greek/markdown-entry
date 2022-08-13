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
import { NextPageContext } from 'next';

export default function Id({ ...props }) {
  return (
    <CenterLayout>
      <Head>
        <title>Hey</title>
      </Head>
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
}

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(`http://localhost:3000/api/${context.query.id}`);
  const entry = await res.json();

  if (entry.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: { entry },
  };
};
