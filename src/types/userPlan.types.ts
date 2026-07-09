export interface UserPlanSummary {
  plan_name: string;
  chatbot_limit: number;
  created_chatbots_count: number;
  status: string;
  start_date: string;
  end_date: string | null;
}

export interface MeUserData {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  role: string;
  plan: UserPlanSummary;
}

export interface MeResponse {
  success: true;
  data: MeUserData;
}
