/* eslint-disable @typescript-eslint/ban-ts-comment */

export const TextBox = ({ ...props }) => {
  return (
    <div
      className={`flex flex-col py-4 px-4 bg-button-bg text-color-text h-[48rem] min-w-6/12 md:w-6/12 overflow-y-auto`}
    >
      {props.children}
    </div>
  );
};

export const TextBox2 = ({ ...props }) => {
  return (
    <div
      className={`flex flex-col py-4 px-4 bg-button-bg text-color-text min-h-[48rem] mb-4 min-w-full overflow-y-auto`}
    >
      {props.children}
    </div>
  );
};
