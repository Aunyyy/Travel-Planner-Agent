export interface FlightSegment{
    departure: string
    departure_terminal: string | null;
    arrival: string
    arrival_terminal: string | null;
    departure_time: string
    arrival_time: string
    aircraft: string
    airline: string
    duration: string
}

interface Flight {
  price: string
  currency: string
  total_duration: string
  itinerary: FlightSegment[]
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
