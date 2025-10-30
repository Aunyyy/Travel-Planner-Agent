import { useState } from "react";
import type { FlightInfo } from "../types";
// @ts-ignore
import airlineCodes from "airline-codes";

export const Flights = ({ flights }: { flights: FlightInfo[] }) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    flights?.[0]?.date
  );

  const selectedFlights = flights.find((f) => f.date === selectedDate);

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
            <div className="space-y-3">
              {selectedFlights.flights.map((f, i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{(airlineCodes.findWhere({ iata: f.airline })).get("name")}</h4>
                    <span className="text-blue-600 font-medium">
                      {f.price} {f.currency}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-700">
                    <div>
                      <p className="font-medium">From:</p>
                      <p>{f.departure}</p>
                      <p className="text-xs text-gray-500">
                        {f.departure_time}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">To:</p>
                      <p>{f.arrival}</p>
                      <p className="text-xs text-gray-500">
                        {f.arrival_time}
                      </p>
                    </div>
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
