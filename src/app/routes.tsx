import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { VerifyAccount } from "@/pages/VerifyAccount";
import { DashboardOverview } from "./pages/DashboardOverview";
import { Chatbots } from "./pages/Chatbots";
import { CreateChatbot } from "./pages/CreateChatbot";
import { ChatbotSettings } from "./pages/ChatbotSettings";
import { ChatbotPlayground } from "./pages/ChatbotPlayground";
import { ChatbotPreview } from "./pages/ChatbotPreview";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { ChatHistory } from "./pages/ChatHistory";
import { Analytics } from "./pages/Analytics";
import { ChatbotAnalytics } from "./pages/ChatbotAnalytics";
import { Billing, BillingPricingRedirect } from "./pages/Billing";
import { Invoices } from "./pages/Invoices";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentFailed } from "./pages/PaymentFailed";
import { AccountSettings } from "./pages/AccountSettings";
import { ManageUsers } from "./pages/ManageUsers";
import { AdminRoute } from "@/components/AdminRoute";
import { AnalyticsRoute } from "@/components/AnalyticsRoute";
import { BillingRoute } from "@/components/BillingRoute";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/verify-account",
    Component: VerifyAccount,
  },
  {
    path: "/dashboard",
    Component: ProtectedRoute,
    children: [
      {
        Component: DashboardLayout,
        children: [
          { index: true, Component: DashboardOverview },
          { path: "chatbots", Component: Chatbots },
          { path: "create", Component: CreateChatbot },
          { path: "chatbot/:id/settings", Component: ChatbotSettings },
          { path: "chatbot/:id/playground", Component: ChatbotPlayground },
          { path: "chatbot/:id/preview", Component: ChatbotPreview },
          { path: "knowledge-base", Component: KnowledgeBase },
          { path: "history", Component: ChatHistory },
          {
            Component: AnalyticsRoute,
            children: [
              { path: "analytics", Component: Analytics },
              { path: "chatbot/:id/analytics", Component: ChatbotAnalytics },
            ],
          },
          {
            path: "billing",
            Component: BillingRoute,
            children: [
              { index: true, Component: Billing },
              { path: "invoices", Component: Invoices },
              { path: "pricing", Component: BillingPricingRedirect },
              { path: "payment-success", Component: PaymentSuccess },
              { path: "payment-failed", Component: PaymentFailed },
            ],
          },
          { path: "settings", Component: AccountSettings },
          {
            Component: AdminRoute,
            children: [{ path: "manage-users", Component: ManageUsers }],
          },
        ],
      },
    ],
  },
]);
