import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Login } from "./pages/Login";
import { Register } from "@/pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { VerifyAccount } from "./pages/VerifyAccount";
import { DashboardOverview } from "./pages/DashboardOverview";
import { CreateChatbot } from "./pages/CreateChatbot";
import { ChatbotSettings } from "./pages/ChatbotSettings";
import { KnowledgeBase } from "./pages/KnowledgeBase";
import { ChatHistory } from "./pages/ChatHistory";
import { Analytics } from "./pages/Analytics";
import { Billing } from "./pages/Billing";
import { AccountSettings } from "./pages/AccountSettings";

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
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardOverview },
      { path: "create", Component: CreateChatbot },
      { path: "chatbot/:id/settings", Component: ChatbotSettings },
      { path: "knowledge-base", Component: KnowledgeBase },
      { path: "history", Component: ChatHistory },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: AccountSettings },
      { path: "billing", Component: Billing },
    ],
  },
]);
