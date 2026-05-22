import { restTransport } from "@/src/lib/api";

const { post, get } = restTransport();

export const chatAdmin = async (body: any) => {
  return await post("/chat/admission", body);
};

export const chatStudent = async (body: any) => {
  return await post("/chat/student", body);
};

export const getSessions = async () => {
  return await get("/chat/sessions");
};

export const getSessionMessages = async (sessionId: string) => {
  return await get(`/chat/sessions/${sessionId}/messages`);
};
