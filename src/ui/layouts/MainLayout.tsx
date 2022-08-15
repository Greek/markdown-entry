export const MainLayout = ({ ...props }) => {
  return (
    <div className={`flex flex-col grow max-w-6xl mx-2 md:mx-auto pt-3`}>
      {props.children}
    </div>
  );
};
