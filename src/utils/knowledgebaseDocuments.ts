import type { KnowledgebaseDocument } from '@/types/chatbotSettings.types';

export function getUploadedKnowledgebaseDocuments(
  documents: KnowledgebaseDocument[] | undefined,
): KnowledgebaseDocument[] {
  return (documents ?? []).filter(
    (document) =>
      document.source_type === 'file' && document.original_file_name !== null,
  );
}
