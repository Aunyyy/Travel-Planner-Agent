import type { Message } from "../types";
import { Flights } from "./Flights";
import { ImageCarousel } from "./ImageCarousel";


export default function MessageBubble({ role, content, flights }: Message) {
  const isUser = role === "user";
  console.log(flights)
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>

      {flights ? <Flights flights={flights} /> :
      Array.isArray(content) ? (
      <ImageCarousel images= {content} />
      ) : (
      <div
        className={`max-w-[75%] p-3 rounded-2xl whitespace-pre-wrap ${isUser
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
          }`}
      >
        {content}
      </div>
    )}
    </div>
  );
}
