export interface CreateChatbotDraftData {
  chatbot_id: number;
  status: string;
}

export interface CreateChatbotResponse {
  success: true;
  message: string;
  is_existing_draft: boolean;
  data: CreateChatbotDraftData;
}

export interface BasicInfoRequest {
  chatbot_name: string;
  description: string;
}

export interface BasicInfoData {
  chatbot_id: number;
  chatbot_name: string;
  description: string | null;
  status: string;
}

export interface BasicInfoResponse {
  success: true;
  message: string;
  data: BasicInfoData;
}

export interface BehaviourRequest {
  personality: string;
  ai_model: string;
  language: string;
}

export interface BehaviourData {
  chatbot_id: number;
  personality: string;
  ai_model: string;
  language: string;
}

export interface BehaviourResponse {
  success: true;
  message: string;
  data: BehaviourData;
}

export interface KnowledgeBaseUploadPayload {
  files: File[];
  urls: string[];
}

export interface KnowledgeBaseUploadData {
  chatbot_id: number;
  total_sources: number;
  processed_sources: number;
  total_chunks: number;
}

export interface KnowledgeBaseUploadResponse {
  success: true;
  message: string;
  data: KnowledgeBaseUploadData;
}

export interface KnowledgeBaseSummary {
  total_files_uploaded: number;
  total_urls_uploaded: number;
  total_knowledge_sources: number;
}

export interface ReviewData {
  chatbot_id: number;
  chatbot_name: string | null;
  description: string | null;
  personality: string | null;
  ai_model: string | null;
  language: string | null;
  status: string;
  knowledgebase: KnowledgeBaseSummary;
}

export interface ReviewResponse {
  success: true;
  message: string;
  data: ReviewData;
}

export interface PublishData {
  chatbot_id: number;
  status: string;
  public_key: string;
  embed_code: string;
}

export interface PublishResponse {
  success: true;
  message: string;
  data: PublishData;
}

export interface DeleteChatbotData {
  chatbot_id: number;
  status: string;
}

export interface DeleteChatbotResponse {
  success: true;
  message: string;
  data: DeleteChatbotData;
}

export interface ActivateChatbotData {
  chatbot_id: number;
  status: 'published';
}

export interface ActivateChatbotResponse {
  success: true;
  message: string;
  data: ActivateChatbotData;
}

export interface ChatbotState {
  chatbotId: number | null;
  chatbotStatus: string | null;
  chatbotBasicInfo: BasicInfoData | null;
  chatbotBehaviour: BehaviourData | null;
  chatbotKnowledgeBase: KnowledgeBaseUploadData | null;
  chatbotReview: ReviewData | null;
  publishResponse: PublishData | null;
  currentStep: number;
  chatbotList: ChatbotListItem[];
  chatbotListLoading: boolean;
  chatbotListSuccess: boolean;
  chatbotListError: string | null;
  createDraftLoading: boolean;
  createDraftSuccess: boolean;
  createDraftError: string | null;
  basicInfoLoading: boolean;
  basicInfoSuccess: boolean;
  basicInfoError: string | null;
  behaviourLoading: boolean;
  behaviourSuccess: boolean;
  behaviourError: string | null;
  knowledgeBaseLoading: boolean;
  knowledgeBaseSuccess: boolean;
  knowledgeBaseError: string | null;
  knowledgeBaseUploadProgress: number;
  reviewLoading: boolean;
  reviewSuccess: boolean;
  reviewError: string | null;
  publishLoading: boolean;
  publishSuccess: boolean;
  publishError: string | null;
  deleteLoading: boolean;
  deleteSuccess: boolean;
  deleteError: string | null;
  activateLoading: boolean;
  activateSuccess: boolean;
  activateError: string | null;
}

export type ChatbotStatus = 'published' | 'draft' | 'deleted' | 'archived';

export type ChatbotStatusFilter = 'all' | 'published' | 'draft' | 'deleted' | 'archived';

export type ChatbotViewMode = 'grid' | 'list';

export interface ChatbotListItem {
  chatbot_id: number;
  chatbot_name: string | null;
  description: string | null;
  ai_model: string | null;
  language: string | null;
  status: ChatbotStatus | string;
  public_key: string | null;
  total_conversations: number;
  total_messages: number;
  total_uploaded_documents: number;
  created_at: string;
  updated_at: string;
  owner_name: string | null;
}

export interface ChatbotListResponse {
  success: true;
  message: string;
  total_chatbots: number;
  data: ChatbotListItem[];
}

export interface DashboardChatbotListState {
  chatbotList: ChatbotListItem[];
  loading: boolean;
  success: boolean;
  error: string | null;
}
