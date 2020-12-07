export interface Trip {
  id: string;
  title: string;
  slug: string;
  itinerary_days: ItineraryDay[];
  overview: string;
  packages: Package[];
  departures: Departure[];
  gallery_images: GalleryImage[];
  attractions: Attraction[];
}

export interface TripService {
  id: string;
  title: string;
  description: string;
  image?: any;
}

export interface TripServiceValue {
  id: string;
  value: string;
  trip_service: TripService;
  packages: string[];
}

export interface ItineraryDay {
  id: string;
  date: string;
  body: string;
  departures: string[];
  trip_service_values: TripServiceValue[];
  group: string;
}

export interface Package {
  title: string;
  price_per_person: number;
  is_standard: boolean;
}

export interface TripAddon {
  id: string;
  title: string;
  description: string;
}

export interface TripAddonValue {
  id: string;
  price: number;
  trip_addon: TripAddon;
  package: string;
}

export interface Departure {
  location: string;
  via: string;
  price_per_person: number;
  departure_date: Date;
  arrival_date: Date;
  // trip_addon_values: TripAddonValue[];
  is_standard: boolean;
}

export interface GalleryImage {
  id: string;
  image: string;
  alt_text: string;
}

export interface Attraction {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  slug: string;
}
