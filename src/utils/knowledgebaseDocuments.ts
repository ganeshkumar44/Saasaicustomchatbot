import type { KnowledgebaseDocument } from '@/types/chatbotSettings.types';

export function getUploadedKnowledgebaseDocuments(
  documents: KnowledgebaseDocument[] | undefined,
): KnowledgebaseDocument[] {
  return (documents ?? []).filter(
    (document) =>
      document.source_type === 'file' && document.original_file_name !== null,
  );
}

export function getKnowledgebaseDocumentsKey(
  documents: KnowledgebaseDocument[] | undefined,
): string {
  return (documents ?? [])
    .map((document) => document.id)
    .sort((left, right) => left - right)
    .join(',');
}

export function getKnowledgebaseUrlDocuments(
  documents: KnowledgebaseDocument[] | undefined,
): KnowledgebaseDocument[] {
  return (documents ?? []).filter(
    (document) => document.source_type === 'url' && document.url !== null,
  );
}
