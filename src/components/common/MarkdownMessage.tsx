import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { markdownComponents } from '@/components/common/markdownComponents';

import '@/styles/markdown.css';

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export function MarkdownMessage({ content, className = '' }: MarkdownMessageProps) {
  const trimmed = content.trim();
  if (!trimmed) {
    return null;
  }

  return (
    <div className={`markdown-message ${className}`.trim()}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {trimmed}
      </ReactMarkdown>
    </div>
  );
}
