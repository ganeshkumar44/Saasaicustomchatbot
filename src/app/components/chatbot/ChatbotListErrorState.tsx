interface ChatbotListErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ChatbotListErrorState({ error, onRetry }: ChatbotListErrorStateProps) {
  return (
    <div className="p-12 flex flex-col items-center justify-center text-center">
      <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
