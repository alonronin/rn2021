/* eslint-disable-next-line */
import { ReactNode } from 'react';

export interface ButtonProps {
  className?: string;
  children?: ReactNode;
}

export function Button({ children }: ButtonProps) {
  return (
    <button className="px-4 py-2 text-indigo-800 bg-indigo-200 font-bold rounded rounded-md hover:bg-indigo-800 hover:text-indigo-200">
      {children}
    </button>
  );
}

export default Button;
