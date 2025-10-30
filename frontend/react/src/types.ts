interface Flight {
  airline: string
  departure: string
  arrival: string
  departure_time: string
  arrival_time: string
  price: string
  currency: string
}

export interface FlightInfo {
  date: string | undefined
  flights?: Flight[] | undefined
  error?: string | undefined
}

export interface Message {
  role: "user" | "assistant";
  content?: string | string[] | undefined;
  flights?: FlightInfo[] | undefined;
}
