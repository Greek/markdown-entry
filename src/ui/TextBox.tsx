/* eslint-disable @typescript-eslint/ban-ts-comment */

export const TextBox = ({ ...props }) => {
  return (
    <div
      className={`flex flex-col py-4 px-4 bg-button-bg text-color-text h-96`}
    >
      {props.children}
    </div>
  );
};
