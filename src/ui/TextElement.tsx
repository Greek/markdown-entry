import { forwardRef } from 'react';
import { FormEventHandler, MutableRefObject } from 'react';

interface TextAreaProps {
  children?: React.ReactNode;
  halfWidth?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: FormEventHandler;
}

export const TextArea: React.FC<TextAreaProps> =
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
    return (
      <textarea
        className={`bg-button-bg text-color-text p-4 mb-2 outline-none h-[48rem] ${
          props.halfWidth ? 'w-3/6 mr-3' : ''
        }`}
        ref={ref}
      ></textarea>
    );
  });

// export const TextArea2: React.FC<TextAreaProps>

export const TextBox: React.FC<TextAreaProps> = ({ ...props }) => {
  return (
    <div
      className={`flex flex-col py-4 px-4 bg-button-bg text-color-text h-[48rem] min-w-6/12 md:w-6/12 overflow-y-auto`}
    >
      {props.children}
    </div>
  );
};
