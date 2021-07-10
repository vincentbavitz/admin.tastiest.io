import { ReactNode } from 'react';

interface CodeSpanProps {
  children: ReactNode;
}

const CodeSpan = ({ children }: CodeSpanProps) => {
  return (
    <span className="px-2 py-px font-mono rounded-md bg-opacity-30 bg-secondary-1">
      {children}
    </span>
  );
};

export default CodeSpan;
