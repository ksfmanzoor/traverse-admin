export interface Trip {
  title: string;
  slug: string;
  overview: string;
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
  value: string;
  trip_service: TripService;
  packages: Package[];
}

export interface ItineraryDay {
  date: string;
  body: string;
  departures: Departure[];
  trip_service_values: TripServiceValue[];
  group: string;
}

export interface Package {
  title: string;
  price_per_person: number;
  is_standard: boolean;
}


export interface Departure {
  location: string;
  via: string;
  price_per_person: number;
  departure_date: string;
  arrival_date: string;
  is_standard: boolean;
}

export interface GalleryImage {
  image: string;
}

export interface Attraction {
  id: string;
}
