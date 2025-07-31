import React, { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import type { Location } from "../types";

const mapkey = "RjEzGaAwoNEsl49AwLQm";

type Props = {
  locations: Location[];
  center: { lat: number; lng: number };
  mapRef: RefObject<any>;
  onMarkerClick: (placeId: number) => void;
  onMapClick: () => void;
  activePopupId: number | null;
};
const MapView: React.FC<Props> = ({
  locations,
  center,
  mapRef,
  onMarkerClick,
  onMapClick,
  activePopupId,
}) => {
  const internalMapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Expose the map object to the parent so it can be used for flyTo calls.
  useEffect(() => {
    if (internalMapRef.current) {
      mapRef.current = internalMapRef.current.getMap();
    }
  }, [mapRef]);

  // Handle map load event
  const handleMapLoad = () => {
    console.log("Map loaded");
    setMapLoaded(true);
  };

  // Zoom and pan to the active marker whenever it changes.
  useEffect(() => {
    if (!activePopupId || !mapLoaded) return;

    const activeLocation = locations.find((loc) => loc.id === activePopupId);
    if (!activeLocation) return;

    const map = mapRef.current || internalMapRef.current?.getMap();
    if (!map) return;

    const currentCenter = map.getCenter();
    const currentZoom = map.getZoom();

    const dx = currentCenter.lng - activeLocation.longitude;
    const dy = currentCenter.lat - activeLocation.latitude;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let targetZoom = Math.max(currentZoom, 15.5);
    let speed = 0.6;
    let curve = 1.8;

    if (distance < 0.0005) {
      // Marker is almost at center — zoom in more and go very slow
      targetZoom = Math.min(currentZoom + 2.5, 18.5);
      speed = 0.2;
      curve = 3;
    } else if (distance < 0.0015) {
      // Close marker — smooth and zoomed
      targetZoom = Math.min(currentZoom + 1.8, 17);
      speed = 0.35;
      curve = 2.0;
    } else if (distance < 0.004) {
      targetZoom = Math.max(currentZoom, 16);
      speed = 0.5;
      curve = 1.8;
    }

    map.flyTo({
      center: [activeLocation.longitude, activeLocation.latitude],
      zoom: targetZoom,
      speed,
      curve,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // buttery smooth
      essential: true,
    });
  }, [activePopupId, locations, mapRef, mapLoaded]);

  return (
    <Map
      ref={internalMapRef}
      initialViewState={{
        longitude: center.lng,
        latitude: center.lat,
        zoom: 12,
      }}
      mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${mapkey}`}
      style={{ width: "100%", height: "100%" }}
      onLoad={handleMapLoad}
      onClick={(e) => {
        const clickedTarget = e.originalEvent?.target as HTMLElement;
        // Ignore clicks on our custom marker element – only close the slide when clicking the base map.
        if (!clickedTarget?.closest(".custom-marker")) {
          onMapClick();
        }
      }}
    >
      {/* Map controls like navigation and fullscreen toggles */}
      <NavigationControl position="top-right" />
      <FullscreenControl position="top-right" />

      {/* Render each location as a simple coloured circle. */}
      {locations.map((loc) => {
        const isActive = loc.id === activePopupId;
        return (
          <Marker
            key={loc.id}
            latitude={loc.latitude}
            longitude={loc.longitude}
            anchor="center"
          >
            <div
              className="custom-marker"
              onClick={(e) => {
                e.stopPropagation();
                onMarkerClick(loc.id);
              }}
              title={loc.name ?? loc.category}
              style={{
                position: "relative",
                width: isActive ? 30 : 20,
                height: isActive ? 30 : 20,
                marginLeft: isActive ? -15 : -10,
                marginTop: isActive ? -15 : -10,
              }}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{ boxShadow: "0 0 0 6px rgba(45,212,191,0.5)" }}
                ></span>
              )}
              <svg width="100%" height="100%" viewBox="0 0 20 20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  fill={isActive ? "#06b6d4" : "#6366f1"}
                  stroke="white"
                  strokeWidth="3"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                  }}
                />
              </svg>
            </div>
          </Marker>
        );
      })}

      {/* Conditionally render a popup above the active marker */}
      {activePopupId &&
        locations.map(
          (loc) =>
            loc.id === activePopupId && (
              <Popup
                key={loc.id}
                latitude={loc.latitude}
                longitude={loc.longitude}
                closeButton={false}
                closeOnClick={false}
                offset={25}
                anchor="top"
              >
                <div className="text-sm font-medium">
                  {loc.name ?? "Unnamed Place"}
                </div>
              </Popup>
            )
        )}
    </Map>
  );
};

export default MapView;
