import React from "react";
import type { PlaceDetail } from "../types";

type Props = {
  place: PlaceDetail;
  onClose: () => void;
};
const SidebarInfo: React.FC<Props> = ({ place, onClose }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          padding: "10px",
          backgroundColor: "lightblue",
        }}
      >
        <h2 className="" style={{ backgroundColor: "lightblue" }}>
          {place.name ?? "Unnamed Place"}
        </h2>
        <button
          onClick={onClose}
          className="pr-3"
          style={{
            fontSize: "24px",
            paddingRight: "10px",
            border: "none",
            background: "none",
            cursor: "pointer",
            color: "Black",
            fontWeight: "bold",
          }}
        >
          X
        </button>
      </div>
      <div className="" style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
        {/* Category */}
        <div
          className="text-sm"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p className="font-semibold text-gray-700" style={{ width: "30%" }}>
            Category:
          </p>
          <p className="text-gray-600 capitalize">{place.category}</p>
        </div>
        <hr
          className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
          style={{
            backgroundColor: "lightgray",
          }}
        />

        {place.description && (
          <div
            className="text-sm"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p className="font-semibold text-gray-700" style={{ width: "30%" }}>
              Description:
            </p>
            <p className="text-gray-600 capitalize">{place.description}</p>
          </div>
        )}
        {place.open_24_7 !== undefined && (
          <div
            className="text-sm"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p className="font-semibold text-gray-700" style={{ width: "30%" }}>
              Open 24/7:
            </p>
            <p className="text-gray-600 capitalize">
              {place.open_24_7 ? "Yes" : "No"}
            </p>
          </div>
        )}

        <div
          className="text-sm"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p className="font-semibold text-gray-700" style={{ width: "30%" }}>
            Coordinates:
          </p>
          <p className="text-gray-600 capitalize">
            {place.latitude.toFixed(5)}, {place.longitude.toFixed(5)}
          </p>
        </div>
        <hr
          className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
          style={{
            backgroundColor: "lightgray",
          }}
        />
        {place.tags && Object.keys(place.tags).length > 0 && (
          <div className="text-sm">
            <p className="font-semibold text-gray-700 mb-1 text-center">
              Tags:
            </p>
            <hr
              className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"
              style={{
                backgroundColor: "lightgray",
              }}
            />

            {Object.entries(place.tags).map(([key, value]) => (
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p
                  key={key}
                  className=""
                  style={{
                    width: "50%",
                    color: "black",
                  }}
                >
                  {key}:
                </p>
                <p
                  className="text-gray-600 capitalize"
                  style={{ width: "100%" }}
                >
                  {String(value)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarInfo;
