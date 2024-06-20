"use client";

import MessageCard from "@/components/MessageCard/MessageCard";
import axios from "axios";
import { toast } from "sonner";
import UniqueProfileLink from "@/components/UniqueProfileLink/UniqueProfileLink";
import AcceptMessageToggle from "@/components/AcceptMessageToggle/AcceptMessageToggle";
import { Button } from "@/components/ui/button";
import { SymbolIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { ClockLoader } from "react-spinners";
import NoMessagesFound from "@/components/NoMessagesFound/NoMessagesFound";
import useMessages from "@/hooks/useMessages";

const Dashboard = () => {
  const { messages, loading, fetchMessages, setMessages } = useMessages();

  const handleMessageDelete = async (messageId) => {
    try {
      const { data } = await axios.delete(`/api/delete-message/${messageId}`);

      if (data.success) {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messageId)
        );
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data.message || "Something went wrong");
    }
  };

  // async function fetchMesssages() {
  //   setLoading(true);
  //   try {
  //     const { data } = await axios.get("/api/get-messages");
  //     if (data.success) {
  //       setMessages(data.messages);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error?.response?.data.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   fetchMesssages();
  // }, [setMessages]);

  return (
    <div>
      <UniqueProfileLink />
      <div className="flex justify-between items-center mt-2 mx-5 md:mx-10">
        <AcceptMessageToggle />
        <Button size="sm" variant="shine" onClick={() => fetchMessages(true)}>
          <span className="hidden md:inline mr-1">Refresh</span>
          <SymbolIcon className={cn("w-5 h-5", loading && "animate-spin")} />
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-10">
          <ClockLoader color="black" />
        </div>
      ) : messages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 my-5">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              handleMessageDelete={handleMessageDelete}
            />
          ))}
        </div>
      ) : (
        <NoMessagesFound />
      )}
    </div>
  );
};

export default Dashboard;
