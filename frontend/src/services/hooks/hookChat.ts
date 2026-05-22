import { chatAdmin, chatStudent, getSessions, getSessionMessages } from "../apis/chat";
import { usePostAPI, useGetAPI } from "./hookApi";

const useChatAdmin = () => {
  const {
    loading,
    post: postChatAdmin,
    error,
    setError,
  } = usePostAPI(chatAdmin);
  return {
    loading,
    postChatAdmin,
    error,
    setError,
  };
};

const useChatStudent = () => {
  const {
    loading,
    post: postChatStudent,
    error,
    setError,
  } = usePostAPI(chatStudent);
  return {
    loading,
    postChatStudent,
    error,
    setError,
  };
};

import { useState } from "react";

const useGetSessions = () => {
  const [sessions, setSessions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const get = async () => {
    try {
      setLoading(true);
      const res = await getSessions();
      setSessions(res);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { sessions, loading, error, getSessions: get };
};

const useGetSessionMessages = () => {
  const [messages, setMessages] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const get = async (sessionId: string) => {
    try {
      setLoading(true);
      const res = await getSessionMessages(sessionId);
      setMessages(res);
      return res;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { messages, loading, error, getSessionMessages: get };
};

export { useChatAdmin, useChatStudent, useGetSessions, useGetSessionMessages };
