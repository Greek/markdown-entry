import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const colorClassnames = {
  primary: 'hover:bg-[#272727] transition duration-200 ease-in-out',
  'primary-dark':
    'text-button bg-button-bg border border-[#f0f6fc1a] hover:bg-[#383b3e] hover:border-[#6c6d6e] transition duration-200 ease-in-out',
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: keyof typeof colorClassnames;
  active?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  color = 'primary',
  active = true,
  ...props
}) => {
  return (
    <button
      className={`${colorClassnames[color]} ${
        active ? 'bg-button-bg' : 'text-link '
      } text-center align-middle font-[15px] p-[0.7rem] leading-[6px] h-[2rem] min-w-[2.3rem]`}
      {...props}
    >
      <span>
        {/* {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null} */}
        {children}
      </span>
    </button>
  );
};
