/* eslint-disable @typescript-eslint/ban-ts-comment */

export const TextBox2 = ({ ...props }) => {
  return (
    <div
      className={`flex flex-col py-4 px-4 bg-button-bg text-color-text min-h-[48rem] mb-4 min-w-full overflow-y-auto break-words`}
    >
      {props.children}
    </div>
  );
};
