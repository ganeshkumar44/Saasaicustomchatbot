import type { RootState } from '@/store/index';

export const selectChatbotDetails = (state: RootState) =>
  state.chatbotSettings.chatbotDetails;

export const selectChatbotDetailsLoading = (state: RootState): boolean =>
  state.chatbotSettings.loading;

export const selectChatbotDetailsRefreshing = (state: RootState): boolean =>
  state.chatbotSettings.refreshing;

export const selectChatbotDetailsSuccess = (state: RootState): boolean =>
  state.chatbotSettings.success;

export const selectChatbotDetailsError = (state: RootState): string | null =>
  state.chatbotSettings.error;

export const selectGeneralSettingsLoading = (state: RootState): boolean =>
  state.chatbotSettings.generalLoading;

export const selectAppearanceSettingsLoading = (state: RootState): boolean =>
  state.chatbotSettings.appearanceLoading;

export const selectMessageSettingsLoading = (state: RootState): boolean =>
  state.chatbotSettings.messageLoading;

export const selectSecuritySettingsLoading = (state: RootState): boolean =>
  state.chatbotSettings.securityLoading;

export const selectKnowledgeBaseSettingsLoading = (state: RootState): boolean =>
  state.chatbotSettings.knowledgebaseLoading;

export const selectChatbotSettingsUpdateSuccess = (state: RootState): boolean =>
  state.chatbotSettings.updateSuccess;

export const selectChatbotSettingsUpdateError = (state: RootState): string | null =>
  state.chatbotSettings.updateError;

export const selectChatbotSettingsUpdateSuccessMessage = (
  state: RootState,
): string | null => state.chatbotSettings.updateSuccessMessage;

export const selectActiveTabSaveLoading = (
  state: RootState,
  activeTab: string,
): boolean => {
  switch (activeTab) {
    case 'general':
      return selectGeneralSettingsLoading(state);
    case 'appearance':
      return selectAppearanceSettingsLoading(state);
    case 'messages':
      return selectMessageSettingsLoading(state);
    case 'security':
      return selectSecuritySettingsLoading(state);
    case 'knowledge':
      return selectKnowledgeBaseSettingsLoading(state);
    default:
      return false;
  }
};
