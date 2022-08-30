import { Button } from '../ui/Button';
import { MainLayout } from '../ui/layouts/MainLayout';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { PreviewSidebar } from '../ui/PreviewSidebar';
import { TextArea } from '../ui/TextElement';
import { performSaveAction, performEditAction } from '../lib/api';
import { ParsedUrlQuery } from 'querystring';

export const SubmitPage = ({ editMode = false, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const editCodeTextAreaRef = useRef<HTMLInputElement>(null);

  const { push, query } = useRouter();

  const [textEditor, setTextEditor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [previewAreaContent, setPreviewAreaContent] = useState('');
  const [previewArea, setPreviewAreaToggle] = useState(false);
  const [tutorialArea, setTutorialAreaToggle] = useState(false);

  useEffect(() => {
    setTextEditor(props.entry?.content);
  }, [editMode, props.entry]);

  useEffect(() => {
    setPreviewAreaContent(textEditor);
  }, [textEditor]);

  const saveNote = (text: string) => {
    performSaveAction(text).then(async (r) => {
      // const resultText = await r.text();
      const res = await r.json();

      if (!r.ok) {
        setErrorMessage(res.error);
        return;
      }

      push(`/${res.id}?c=${res.editCode}`, `/${res.id}`);
    });
  };

  const editNote = (text: string, editCode: string, query: ParsedUrlQuery) => {
    performEditAction(text, editCode, query).then(async (r) => {
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
        <div>
          {previewArea ? (
            <Button
              onClick={() => {
                setPreviewAreaToggle(false);
                setTutorialAreaToggle(false);
                setTextEditor(previewAreaContent);
              }}
            >
              Preview
            </Button>
          ) : (
            <Button
              onClick={() => {
                setPreviewAreaToggle(true);
                setTutorialAreaToggle(false);
                setTextEditor(previewAreaContent);
              }}
              active={false}
            >
              Preview
            </Button>
          )}
          {tutorialArea ? (
            <Button
              onClick={() => {
                setTutorialAreaToggle(false);
                setPreviewAreaToggle(false);
                setTextEditor(previewAreaContent);
              }}
            >
              Guide
            </Button>
          ) : (
            <Button
              onClick={() => {
                setTutorialAreaToggle(true);
                setPreviewAreaToggle(false);
                setTextEditor(previewAreaContent);
              }}
              active={false}
            >
              Guide
            </Button>
          )}
        </div>
        {!previewArea && !tutorialArea && (
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
        {previewArea && !tutorialArea && (
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
        {!previewArea && tutorialArea && (
          <div
            className={`flex flex-col py-4 px-4 bg-button-bg text-color-text h-[48rem] mb-2 break-words`}
          >
            <h1>Guide coming soon!</h1>
            <p>
              {' '}
              I still need to write a whole guide in markdown. It&apos;s 12am
              and i&apos;m a little lazy.
            </p>
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
        <div className={`float-right`}>
          {editMode ? (
            <Button
              onClick={() =>
                editNote(
                  previewAreaContent,
                  editCodeTextAreaRef.current?.value ?? '',
                  query
                )
              }
            >
              Submit edit
            </Button>
          ) : (
            <Button onClick={() => saveNote(previewAreaContent)}>Submit</Button>
          )}
        </div>

        <p>{errorMessage}</p>
      </MainLayout>
    </>
  );
};
