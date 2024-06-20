"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/get-messages");
        if (data.success) {
          setMessages(data.messages);
          if (refresh) {
            toast.success("Showing latest messages");
          }
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMessages]
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]); // Effect depends only on fetchMessages function

  return {
    messages,
    loading,
    fetchMessages,
    setMessages,
  };

  //   return useMemo(
  //     () => ({
  //       messages,
  //       loading,
  //       fetchMessages,
  //       setMessages,
  //     }),
  //     [messages]
  //   ); // Memoize the object to prevent unnecessary re-renders
};

export default useMessages;
