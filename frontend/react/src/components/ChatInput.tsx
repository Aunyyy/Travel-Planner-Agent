import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react"
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex mt-3 px-2 py-1.5 bg-white border sm:rounded-3xl sm:border"
    >
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Plan your next trip..."
        className="flex-1 p-2 mr-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-2.5 aspect-square rounded-full hover:bg-blue-600"
      >
        <Send className="size-6 text-white"/>
      </button>
    </form>
  );
}
