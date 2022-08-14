export const TextArea = ({ ref = null, value = '', ...props }) => {
  return (
    <textarea
      className={`bg-button-bg text-color-text p-4 mb-2 outline-none h-96`}
      ref={ref}
      defaultValue={value}
    >
      {props.children}
    </textarea>
  );
};
