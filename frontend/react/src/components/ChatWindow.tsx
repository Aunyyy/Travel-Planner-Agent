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
          assistantMessages.push({ role: "assistant", content: `Here is some information about ${destination}:` })
          assistantMessages.push({ role: "assistant", content: description })
          assistantMessages.push({ role: "assistant", content: images })
        }
      }
      else if (res.data.next_agent === "flight_agent") {
        const flightInfo: FlightInfo[] = res.data.flights
        const destination: string = res.data.destination || "";
        const origin: string = res.data.origin || "";

        if (flightInfo) {
          assistantMessages.push({ role: "assistant", content: `Here are flights from ${origin} to ${destination}:` })
          assistantMessages.push({ role: "assistant", flights: flightInfo })
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

      // const mockFlights: FlightInfo[] =
      //   [
      //     {
      //       "date": "2025-11-21",
      //       "flights": [
      //         {
      //           "price": "828.20",
      //           "currency": "USD",
      //           "total_duration": "PT25H35M",
      //           "itinerary": [
      //             {
      //               "departure": "YYZ",
      //               "departure_terminal": "1",
      //               "arrival": "DXB",
      //               "arrival_terminal": "3",
      //               "departure_time": "2025-11-21T13:55:00",
      //               "arrival_time": "2025-11-22T11:40:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "AIRBUS A380-800",
      //               "duration": "PT12H45M"
      //             },
      //             {
      //               "departure": "DXB",
      //               "departure_terminal": "3",
      //               "arrival": "ISB",
      //               "arrival_terminal": null,
      //               "departure_time": "2025-11-22T21:30:00",
      //               "arrival_time": "2025-11-23T01:30:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "BOEING 777-300ER",
      //               "duration": "PT3H"
      //             }
      //           ]
      //         },
      //         {
      //           "price": "915.53",
      //           "currency": "USD",
      //           "total_duration": "PT48H20M",
      //           "itinerary": [
      //             {
      //               "departure": "YYZ",
      //               "departure_terminal": "1",
      //               "arrival": "BOS",
      //               "arrival_terminal": "B",
      //               "departure_time": "2025-11-21T20:55:00",
      //               "arrival_time": "2025-11-21T22:37:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "AIRBUS  A220-300",
      //               "duration": "PT1H42M"
      //             },
      //             {
      //               "departure": "BOS",
      //               "departure_terminal": "E",
      //               "arrival": "DXB",
      //               "arrival_terminal": "3",
      //               "departure_time": "2025-11-22T22:10:00",
      //               "arrival_time": "2025-11-23T19:20:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "BOEING 777-300ER",
      //               "duration": "PT12H10M"
      //             },
      //             {
      //               "departure": "DXB",
      //               "departure_terminal": "3",
      //               "arrival": "ISB",
      //               "arrival_terminal": null,
      //               "departure_time": "2025-11-24T03:10:00",
      //               "arrival_time": "2025-11-24T07:15:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "BOEING 777-300ER",
      //               "duration": "PT3H5M"
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       "date": "2025-11-22",
      //       "flights": [
      //         {
      //           "price": "828.20",
      //           "currency": "USD",
      //           "total_duration": "PT25H35M",
      //           "itinerary": [
      //             {
      //               "departure": "YYZ",
      //               "departure_terminal": "1",
      //               "arrival": "DXB",
      //               "arrival_terminal": "3",
      //               "departure_time": "2025-11-21T13:55:00",
      //               "arrival_time": "2025-11-22T11:40:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "AIRBUS A380-800",
      //               "duration": "PT12H45M"
      //             },
      //             {
      //               "departure": "DXB",
      //               "departure_terminal": "3",
      //               "arrival": "ISB",
      //               "arrival_terminal": null,
      //               "departure_time": "2025-11-22T21:30:00",
      //               "arrival_time": "2025-11-23T01:30:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "BOEING 777-300ER",
      //               "duration": "PT3H"
      //             }
      //           ]
      //         },
      //         {
      //           "price": "915.53",
      //           "currency": "USD",
      //           "total_duration": "PT48H20M",
      //           "itinerary": [
      //             {
      //               "departure": "YYZ",
      //               "departure_terminal": "1",
      //               "arrival": "BOS",
      //               "arrival_terminal": "B",
      //               "departure_time": "2025-11-21T20:55:00",
      //               "arrival_time": "2025-11-21T22:37:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "AIRBUS  A220-300",
      //               "duration": "PT1H42M"
      //             },
      //             {
      //               "departure": "BOS",
      //               "departure_terminal": "E",
      //               "arrival": "DXB",
      //               "arrival_terminal": "3",
      //               "departure_time": "2025-11-22T22:10:00",
      //               "arrival_time": "2025-11-23T19:20:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "BOEING 777-300ER",
      //               "duration": "PT12H10M"
      //             },
      //             {
      //               "departure": "DXB",
      //               "departure_terminal": "3",
      //               "arrival": "ISB",
      //               "arrival_terminal": null,
      //               "departure_time": "2025-11-24T03:10:00",
      //               "arrival_time": "2025-11-24T07:15:00",
      //               "airline": "EMIRATES",
      //               "aircraft": "BOEING 777-300ER",
      //               "duration": "PT3H5M"
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]

      // assistantMessages.push({ role: "assistant", content: `Here are flights from Toronto to Islamabad:` })
      // assistantMessages.push({ role: "assistant", flights: mockFlights })

      setMessages([...newMessages, ...assistantMessages])

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative min-h-screen w-4/5 mx-auto">
      <div className="pb-28 p-4 space-y-2">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} flights={m.flights} />
        ))}
      </div >
      <div className="fixed bottom-0 left-[10%] w-4/5 bg-white" >
        <ChatInput onSend={handleSend} />
        <div className="flex justify-center text-xs p-2">
          Traveler can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}
