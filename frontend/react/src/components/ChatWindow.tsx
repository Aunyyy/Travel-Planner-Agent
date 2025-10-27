import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import type { Message } from "../types";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
// import image1 from "../assets/images/chicago-illinois-skyline-skyscrapers-161963.jpeg"
// import image2 from "../assets/images/pexels-photo-167200.jpeg"
// import iamge3 from "../assets/images/pexels-photo-876218.jpeg"
// import image4 from "../assets/images/pexels-photo-1036657.jpeg"
// import image5 from "../assets/images/pexels-photo-2088233.jpeg"
// import image6 from "../assets/images/pexels-photo-1058759.jpeg"
// import image7 from "../assets/images/pexels-photo-1569012.jpeg"
// import image8 from "../assets/images/pexels-photo-1797195.jpeg"
// import image9 from "../assets/images/pexels-photo-1823680.jpeg"
// import image10 from "../assets/images/pexels-photo-1823681.jpeg"



export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);

  async function handleSend(text: string) {
    const newMessage: Message = { role: "user", content: text };
    const newMessages: Message[] = [...messages, newMessage];
    setMessages(newMessages); 

    try {
      //Real response
      const res = await axiosInstance.post("/conversations/messages/send", newMessage);
      const images: string[] = res.data.images || [];
      const description: string[] = res.data.description || "";
      const destination: string = res.data.destination || "";



      //Demo response for testing
      // const res: string[] = [
      //   'https://images.pexels.com/photos/1823681/pexels-photo-1823681.jpeg',
      //   'https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg',
      //   'https://images.pexels.com/photos/1569012/pexels-photo-1569012.jpeg',
      //   'https://images.pexels.com/photos/1058759/pexels-photo-1058759.jpeg',
      //   'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg',
      //   'https://images.pexels.com/photos/161963/chicago-illinois-skyline-skyscrapers-161963.jpeg',
      //   'https://images.pexels.com/photos/1797195/pexels-photo-1797195.jpeg',
      //   'https://images.pexels.com/photos/167200/pexels-photo-167200.jpeg',
      //   'https://images.pexels.com/photos/2088233/pexels-photo-2088233.jpeg',
      //   'https://images.pexels.com/photos/876218/pexels-photo-876218.jpeg'
      //   ];

      // const res: string[] = [image1, image2, iamge3, image4, image5, image6, image7, image8, image9, image10];
      // const images: string[] = res || [];
      
      const assistantMessages: Message[] = [];

      if (images.length > 0) {
        assistantMessages.push({role: "assistant", content: `Here is some information about ${destination}:`})
        assistantMessages.push({role: "assistant", content: description})
        assistantMessages.push({role: "assistant", content: images})
      }
      setMessages([...newMessages, ...assistantMessages])

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col w-4/5">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
      </div >
      <ChatInput onSend={handleSend} />
      <div className="flex justify-center text-xs p-2"> 
         Traveler can make mistakes. Check important info.
      </div>
    </div>
  );
}
