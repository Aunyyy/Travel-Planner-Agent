import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import type { FlightInfo, Message } from "../types";
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
      let assistantMessages: Message[] = [];
      //Real response
      const res = await axiosInstance.post("/conversations/messages/send", newMessage);
      if (res.data.next_agent === "destination_agent") {
        const images: string[] = res.data.images || [];
        const description: string[] = res.data.description || "";
        const destination: string = res.data.destination || "";

        if (images.length > 0) {
          assistantMessages.push({role: "assistant", content: `Here is some information about ${destination}:`})
          assistantMessages.push({role: "assistant", content: description})
          assistantMessages.push({role: "assistant", content: images})
        }
      }
      else if (res.data.next_agent === "flight_agent") {
        const flightInfo: FlightInfo[] = res.data.flights
        const destination: string = res.data.destination || "";
        const origin: string = res.data.origin || "";

        if (flightInfo) {
          assistantMessages.push({role: "assistant", content: `Here are flights from ${origin} to ${destination}:`})
          assistantMessages.push({role: "assistant", flights: flightInfo})
        }
      }



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

      // const mockFlights: FlightInfo[] = [{'date': '2025-10-30', 'flights': [{'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-10-30T09:45:00', 'arrival_time': '2025-10-30T11:06:00', 'price': '355.47', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-10-30T15:35:00', 'arrival_time': '2025-10-30T16:57:00', 'price': '355.47', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-10-30T06:15:00', 'arrival_time': '2025-10-30T07:48:00', 'price': '355.47', 'currency': 'EUR'}]}, {'date': '2025-10-31', 'flights': [{'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-10-31T18:09:00', 'arrival_time': '2025-10-31T19:30:00', 'price': '355.47', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-10-31T06:15:00', 'arrival_time': '2025-10-31T07:48:00', 'price': '355.47', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'ATL', 'departure_time': '2025-10-31T06:15:00', 'arrival_time': '2025-10-31T08:39:00', 'price': '355.47', 'currency': 'EUR'}]}, {'date': '2025-11-01', 'error': '[429]\n'}, {'date': '2025-11-02', 'flights': [{'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-02T18:09:00', 'arrival_time': '2025-11-02T19:30:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-02T06:15:00', 'arrival_time': '2025-11-02T07:48:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'ATL', 'departure_time': '2025-11-02T06:15:00', 'arrival_time': '2025-11-02T08:39:00', 'price': '321.87', 'currency': 'EUR'}]}, {'date': '2025-11-03', 'flights': [{'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-03T18:09:00', 'arrival_time': '2025-11-03T19:30:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-03T06:15:00', 'arrival_time': '2025-11-03T07:48:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'ATL', 'departure_time': '2025-11-03T06:15:00', 'arrival_time': '2025-11-03T08:39:00', 'price': '321.87', 'currency': 'EUR'}]}, {'date': '2025-11-04', 'flights': [{'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-04T06:15:00', 'arrival_time': '2025-11-04T07:48:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-04T12:15:00', 'arrival_time': '2025-11-04T13:30:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'ATL', 'departure_time': '2025-11-04T06:15:00', 'arrival_time': '2025-11-04T08:39:00', 'price': '321.87', 'currency': 'EUR'}]}, {'date': '2025-11-05', 'flights': [{'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-05T09:45:00', 'arrival_time': '2025-11-05T11:06:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-05T06:15:00', 'arrival_time': '2025-11-05T07:48:00', 'price': '321.87', 'currency': 'EUR'}, {'airline': 'WS', 'departure': 'YYZ', 'arrival': 'DTW', 'departure_time': '2025-11-05T12:15:00', 'arrival_time': '2025-11-05T13:30:00', 'price': '321.87', 'currency': 'EUR'}]}]

      // assistantMessages.push({role: "assistant", content: `Here are flights from Toronto to Chicago:`})
      // assistantMessages.push({role: "assistant", flights: mockFlights})
      
      setMessages([...newMessages, ...assistantMessages])

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col w-4/5">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} flights={m.flights} />
        ))}
      </div >
      <ChatInput onSend={handleSend} />
      <div className="flex justify-center text-xs p-2"> 
         Traveler can make mistakes. Check important info.
      </div>
    </div>
  );
}
