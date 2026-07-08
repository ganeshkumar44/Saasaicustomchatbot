export interface NotificationSettings {
  new_chatbot_email: boolean;
  chatbot_changes_email: boolean;
  new_chat_start_push: boolean;
  critical_alert_sms: boolean;
}

export interface NotificationSettingsResponse {
  success: true;
  message: string;
  data: NotificationSettings;
}

export interface UpdateNotificationSettingsRequest {
  new_chatbot_email: boolean;
  chatbot_changes_email: boolean;
  new_chat_start_push: boolean;
  critical_alert_sms: boolean;
}

export interface UpdateNotificationSettingsResponse {
  success: true;
  message: string;
  data: NotificationSettings;
}

export type NotificationSettingsKey = keyof NotificationSettings;

export interface NotificationSettingsItemConfig {
  key: NotificationSettingsKey;
  label: string;
  description: string;
}

export interface NotificationSettingsSectionConfig {
  section: string;
  items: NotificationSettingsItemConfig[];
}

export const NOTIFICATION_SETTINGS_SECTIONS: NotificationSettingsSectionConfig[] = [
  {
    section: 'Email Notifications',
    items: [
      {
        key: 'new_chatbot_email',
        label: 'New Chatbot Created',
        description: 'Receive email when a new chatbot is created',
      },
      {
        key: 'chatbot_changes_email',
        label: 'Chatbot Changes',
        description: 'Receive email when a chatbot is updated',
      },
    ],
  },
  {
    section: 'Push Notifications',
    items: [
      {
        key: 'new_chat_start_push',
        label: 'New Chat Started',
        description: 'Receive push notification when a visitor starts a new chat',
      },
    ],
  },
  {
    section: 'SMS Notifications',
    items: [
      {
        key: 'critical_alert_sms',
        label: 'Critical Alerts',
        description: 'Receive SMS for critical alerts such as chatbot deletion',
      },
    ],
  },
];
