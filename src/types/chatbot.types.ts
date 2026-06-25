export interface CreateChatbotDraftData {
  chatbot_id: number;
  status: string;
}

export interface CreateChatbotResponse {
  success: true;
  message: string;
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

export interface ChatbotState {
  chatbotId: number | null;
  chatbotStatus: string | null;
  chatbotBasicInfo: BasicInfoData | null;
  chatbotBehaviour: BehaviourData | null;
  chatbotKnowledgeBase: KnowledgeBaseUploadData | null;
  chatbotReview: ReviewData | null;
  publishResponse: PublishData | null;
  currentStep: number;
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
}
