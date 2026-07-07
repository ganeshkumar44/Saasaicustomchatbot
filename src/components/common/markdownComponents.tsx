import type { Components } from 'react-markdown';

export const markdownComponents: Components = {
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="markdown-table-wrap">
      <table>{children}</table>
    </div>
  ),
  input: ({ type, checked, disabled }) => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled ?? true}
          readOnly
        />
      );
    }
    return <input type={type} checked={checked} disabled={disabled} readOnly />;
  },
};
