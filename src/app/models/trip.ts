export interface Trip {
  id?: string;
  title: string;
  slug: string;
  is_featured: boolean;
  overview: string;
  packages: Package[];
  departures: Departure[];
  attractions: Attraction[];
  itinerary_days: ItineraryDay[];
  gallery_images: GalleryImage[];
}

export interface TripService {
  id: string;
  title: string;
  description: string;
  image?: any;
}

export interface TripServiceValue {
  id?: string;
  value: string;
  trip_service: TripService;
  packages: string[];
}

export interface ItineraryDay {
  date: string;
  body: string;
  departures: string[];
  trip_service_values: TripServiceValue[];
  group: string;
}

export interface Package {
  id: string;
  title: string;
  price_per_person: number;
  is_standard: boolean;
}


export interface Departure {
  id: string;
  location: string;
  via: string;
  package: string;
  price_per_person: string;
  departure_date: string;
  arrival_date: string;
  is_standard: boolean;
}

export interface GalleryImage {
  id?: string;
  image: string;
  alt_text?: string;
}

export interface Attraction {
  id: string;
  title: string;
}

