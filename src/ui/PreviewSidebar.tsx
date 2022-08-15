import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import remarkRehype from 'remark-rehype';
import ReactMarkdown from 'react-markdown';

import { TextBox } from './TextBox';

export const PreviewSidebar = ({ ...props }) => {
  return (
    <TextBox>
      <ReactMarkdown
        children={props.children}
        remarkPlugins={[
          remarkGfm,
          remarkEmoji,
          remarkParse,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          remarkRehype,
          remarkSqueezeParagraphs,
        ]}
      />
    </TextBox>
  );
};
