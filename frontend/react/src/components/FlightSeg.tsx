import type { FlightSegment } from "../types";
// @ts-ignore
import allData from "airport-iata-codes"
// @ts-ignore
import { airports } from 'airports-json';

export const FlightSeg = ({ segment }: { segment: FlightSegment }) => {

  const airportName = ((iataCode: string) => {
    const airport = airports.find(
      (a: any) => a.iata_code === iataCode
    );
    return airport.name;
  })

  function formatDuration(duration: string) {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match?.[1] ? match[1].replace("H", "") : "0";
    const minutes = match?.[2] ? match[2].replace("M", "") : "0";
    return `${hours}h ${minutes}m`;
  }


  return (
    <div className="border border-gray-200 rounded-2xl p-5 shadow-sm bg-gradient-to-br from-white to-gray-50 mb-4 hover:shadow-md transition-all">
      <div className="flex items-center justify-between border-b pb-3 mb-3">
        <div className="flex flex-col items-start">
          <h4 className="font-semibold">{segment.airline}</h4>
          <span className="text-lg font-semibold text-gray-800">
            {airportName(segment.departure)} ({segment.departure})
          </span>
          <span className="text-xs text-gray-500">
            Terminal {segment.departure_terminal ?? "TBA"}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold text-gray-800">
            {airportName(segment.arrival)} ({segment.arrival})
          </span>
          <span className="text-xs text-gray-500">
            Terminal {segment.arrival_terminal ?? "TBA"}
          </span>
        </div>
      </div>

      {/* Grid layout for perfect column alignment */}
      <div className="grid grid-cols-[1fr_auto] gap-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-900">Departure:</span>{" "}
          {new Date(segment.departure_time).toLocaleString()}
        </p>
        <p>
          <span className="font-medium text-gray-900">Arrival:</span>{" "}
          {new Date(segment.arrival_time).toLocaleString()}
        </p>

        <p>
          <span className="font-medium text-gray-900">Aircraft:</span>{" "}
          {segment.aircraft}
        </p>
        <p>
          <span className="font-medium text-gray-900">Duration:</span>{" "}
          {formatDuration(segment.duration)}
        </p>
      </div>
    </div>
  );

};