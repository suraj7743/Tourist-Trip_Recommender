export type Location = {
  id: number;
  osm_id: string;
  name: string | null;
  category: string;
  tags: Record<string, string>;
  latitude: number;
  longitude: number;
  avg_rating: number | null;
};

export type PlaceDetail = Location & {
  description?: string;
  contact?: string;
  address?: string;
  open_24_7?: boolean;
};

export type FilterParams = {
  category: string;
  rating: number;
  open_24_7: boolean;
  limit: number;
};
