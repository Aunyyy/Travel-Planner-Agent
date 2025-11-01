import { useState } from "react";
import type { FlightInfo } from "../types";
import { FlightSeg } from "./FlightSeg";

export const Flights = ({ flights }: { flights: FlightInfo[] }) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    flights?.[0]?.date
  );

  const selectedFlights = flights.find((f) => f.date === selectedDate);

  const formatDuration = (iso: string) => {
    const h = iso.match(/(\d+)H/)?.[1] || "0";
    const m = iso.match(/(\d+)M/)?.[1] || "0";
    return `${h}h ${m}m`;
  };

  if (!flights || flights.length === 0) {
    return (
      <div className="text-gray-500 text-center py-6">
        No flight data available.
      </div>
    );
  }

  return (
    <div className="w-full">

      <div className="flex justify-center mt-4 flex-wrap gap-3 mb-6">
        {flights.map((flightInfo, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(flightInfo.date)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDate === flightInfo.date
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {flightInfo.date || "Unknown Date"}
          </button>
        ))}
      </div>

      {selectedFlights ? (
        <>
          {!selectedFlights.flights || selectedFlights.flights.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No flights found for this date.
            </p>
          ) : (
            <div className="space-y-4">
              {selectedFlights.flights.map((f, i) => (
                <div
                  key={i}
                  className="p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                >
                  {/* Header Section */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Total Duration: {formatDuration(f.total_duration)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">
                        {f.currency} {f.price}
                      </p>
                    </div>
                  </div>

                  {/* Itinerary Segments */}
                  <div className="divide-y divide-gray-100">
                    {f.itinerary.map((segment, idx) => (
                      <FlightSeg key={idx} segment={segment} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">Select a date to view flights.</p>
      )}
    </div>
  );
};
