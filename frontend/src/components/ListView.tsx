import React from "react";
import type { Location, PlaceDetail } from "../types";

type Props = {
  locations: Location[];
  onSelect: (loc: Location) => void;
  selected: PlaceDetail | null;
};

const ListView: React.FC<Props> = ({ locations, onSelect, selected }) => {
  return (
    <div className="w-64 h-full overflow-y-auto border-r bg-white shadow-md">
      <h2 className="text-lg font-bold p-4 border-b">Locations</h2>
      {locations.map((loc) => {
        const isSelected = !!selected && loc.id === selected.id;
        return (
          <div
            key={loc.id}
            onClick={() => onSelect(loc)}
            className={`px-4 py-3 cursor-pointer ${
              isSelected ? "bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <h3 className="font-medium text-gray-800">
              {loc.name ?? `(Unnamed ${loc.category})`}
            </h3>
            {loc.category && (
              <p className="text-xs text-gray-500 capitalize">{loc.category}</p>
            )}
          </div>
        );
      })}
      {locations.length === 0 && (
        <p className="p-4 text-sm text-gray-500">No locations found.</p>
      )}
    </div>
  );
};

export default ListView;
