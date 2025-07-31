import type { FilterParams, Location, PlaceDetail } from "../types";

const BASE_URL = "http://localhost:8000/places";
export async function fetchPlaces(filters: FilterParams): Promise<Location[]> {
  const params = new URLSearchParams();
  if (filters.category !== "all") params.append("category", filters.category);
  params.append("rating", filters.rating.toString());
  params.append("open_24_7", filters.open_24_7.toString());
  params.append("limit", filters.limit.toString());

  try {
    const res = await fetch(`${BASE_URL}/?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch places");
    return res.json();
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

export async function fetchPlaceDetail(placeId: number): Promise<PlaceDetail> {
  try {
    const res = await fetch(`${BASE_URL}/${placeId}`);
    if (!res.ok) throw new Error("Failed to fetch place detail");
    return res.json();
  } catch (error) {
    console.error("Error fetching place detail:", error);
    throw error;
  }
}

// export async function fetchPlaceByName(name: string): Promise<Location | null> {
//   try {
//     const res = await fetch(`${BASE_URL}/name/${encodeURIComponent(name)}`);
//     if (!res.ok) throw new Error("Failed to fetch place by name");
//     const data = await res.json();
//     return data.length > 0 ? data[0] : null;
//   } catch (error) {
//     console.error("Error fetching place by name:", error);
//     throw error;
//   }
// }
