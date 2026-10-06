export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Training Partners Links (Prominently featured)
export const TRAINING_LINKS = {
  DELHI: 'https://uncodemy.com/course/full-stack-development-training-course-in-delhi',
  NOIDA: 'https://uncodemy.com/course/full-stack-development-training-course-in-noida',
  TITLE_DELHI: 'Full Stack Development Training in Delhi',
  TITLE_NOIDA: 'Full Stack Development Training in Noida',
  PROVIDER: 'Uncodemy'
};

export const CATEGORIES = [
  'All',
  'Beach',
  'Mountain',
  'Nature',
  'Island',
  'Luxury',
  'Adventure',
  'Heritage'
];

export const MOCK_DESTINATIONS = [
  {
    id: 1,
    name: 'Goa Golden Shores',
    country: 'India',
    city: 'Goa',
    description: 'Sun-kissed beaches, Portuguese colonial architecture, vibrant shacks, water sports, and sunset cruises.',
    category: 'Beach',
    bestSeason: 'Nov - Feb',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Manali Alpine Retreat',
    country: 'India',
    city: 'Manali',
    description: 'Snow-capped Himalayan peaks, pine-scented valleys, Solang adventures, and tranquil apple orchards.',
    category: 'Mountain',
    bestSeason: 'Oct - Mar',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Kerala Serene Backwaters',
    country: 'India',
    city: 'Alleppey',
    description: 'Traditional luxury houseboats, emerald canals, ayurvedic spas, and sprawling tea estates in Munnar.',
    category: 'Nature',
    bestSeason: 'Sep - Mar',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Bali Tropical Wonderland',
    country: 'Indonesia',
    city: 'Bali',
    description: 'Sacred cliffside temples, pristine surf breaks, lush Ubud rice terraces, and captivating sunset rituals.',
    category: 'Island',
    bestSeason: 'Apr - Oct',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  },
  {
    id: 5,
    name: 'Dubai Futuristic Glamour',
    country: 'UAE',
    city: 'Dubai',
    description: 'Iconic skyscrapers, golden desert safaris, Michelin-starred fine dining, and ultra-luxurious marina cruises.',
    category: 'Luxury',
    bestSeason: 'Nov - Apr',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8
  },
  {
    id: 6,
    name: 'Swiss Alps Panorama',
    country: 'Switzerland',
    city: 'Interlaken',
    description: 'Majestic glacier peaks, crystal alpine lakes, scenic train journeys, and world-class ski trails.',
    category: 'Mountain',
    bestSeason: 'Dec - Apr / Jun - Sep',
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    rating: 4.9
  }
];

export const MOCK_PACKAGES = [
  {
    id: 1,
    title: 'Goa Beach Paradise & Sunset Cruises',
    destinationId: 1,
    destinationName: 'Goa Golden Shores',
    country: 'India',
    city: 'Goa',
    description: 'Experience the finest coastlines of North and South Goa with 4-star beach resort stays, private speedboat tours, dolphin spotting, and beach club dining.',
    durationDays: 4,
    durationNights: 3,
    price: 349.99,
    discountPercent: 15,
    featured: true,
    inclusions: '4-Star Beachfront Resort, Daily Buffet Breakfast, Private Airport Transfers, Mandovi River Cruise, Water Sports Package',
    itinerary: 'Day 1: Arrival & Calangute Beach Leisure; Day 2: Old Goa Heritage & Sunset Cruise; Day 3: Watersports at Baga & Nightclub Entry; Day 4: Souvenir shopping & Departure',
    availableSeats: 16,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Manali Snow & Rohtang Pass Adventure',
    destinationId: 2,
    destinationName: 'Manali Alpine Retreat',
    country: 'India',
    city: 'Manali',
    description: 'A thrilling high-altitude getaway featuring Solang Valley paragliding, Rohtang Pass snow safari, bonfire nights, and riverside camping along the Beas.',
    durationDays: 5,
    durationNights: 4,
    price: 429.50,
    discountPercent: 10,
    featured: true,
    inclusions: 'Deluxe Pine Cottage, All Meals, Rohtang Special Permit & 4x4 Cab, Solang Valley Snow Activities, Campfire & BBQ',
    itinerary: 'Day 1: Scenic drive from Chandigarh/Kullu; Day 2: Solang Valley adventure; Day 3: Rohtang Pass snow summit; Day 4: Old Manali cafes & Hadimba Temple; Day 5: Departure',
    availableSeats: 12,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Kerala Backwaters & Munnar Mist',
    destinationId: 3,
    destinationName: 'Kerala Serene Backwaters',
    country: 'India',
    city: 'Alleppey',
    description: 'Cruise along the iconic Alleppey backwaters in a traditional private houseboat followed by cool mountain breezes among tea gardens in Munnar.',
    durationDays: 6,
    durationNights: 5,
    price: 549.00,
    discountPercent: 20,
    featured: true,
    inclusions: 'Houseboat Stay with Personal Chef, Munnar Tea Estate Resort, Traditional Ayurvedic Massage, Guided Spice Garden Tour',
    itinerary: 'Day 1: Cochin arrival to Munnar; Day 2: Munnar Tea Gardens; Day 3: Thekkady Wildlife Sanctuary; Day 4: Alleppey Houseboat boarding; Day 5: Canals cruising; Day 6: Departure',
    availableSeats: 8,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Bali Island Luxury & Spiritual Escape',
    destinationId: 4,
    destinationName: 'Bali Tropical Wonderland',
    country: 'Indonesia',
    city: 'Bali',
    description: 'Immerse yourself in private pool villas, Uluwatu cliff sunset kecak dances, Nusa Penida island speedboat tour, and rejuvenating Balinese herbal rituals.',
    durationDays: 7,
    durationNights: 6,
    price: 999.00,
    discountPercent: 12,
    featured: true,
    inclusions: '5-Star Private Pool Villa, Nusa Penida Island Speedboat Day Tour, Daily Breakfast & Floating Brunch, Balinese Spa Treatment',
    itinerary: 'Day 1: Denpasar arrival & Seminyak sunset; Day 2: Ubud monkey forest & rice terraces; Day 3: Nusa Penida day trip; Day 4: Mount Batur sunrise; Day 5: Uluwatu & Kecak fire dance; Day 6: Beach club day; Day 7: Departure',
    availableSeats: 10,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Dubai Desert Safari & Sky Lounge Extravaganza',
    destinationId: 5,
    destinationName: 'Dubai Futuristic Glamour',
    country: 'UAE',
    city: 'Dubai',
    description: 'Experience Burj Khalifa top lounge views, 4x4 red dune desert bashing, Arabian night banquet, and luxury yacht cruise along Dubai Marina.',
    durationDays: 5,
    durationNights: 4,
    price: 899.00,
    discountPercent: 15,
    featured: false,
    inclusions: '5-Star Downtown Hotel, Burj Khalifa 124th & 125th Floor Tickets, Red Dunes Desert Safari with BBQ Dinner, Dubai Marina Yacht Cruise',
    itinerary: 'Day 1: Dubai arrival & Marina walk; Day 2: Dubai Mall & Burj Khalifa; Day 3: Desert safari & Tanoura show; Day 4: Palm Jumeirah & Atlantis Aquaventure; Day 5: Gold Souk & Departure',
    availableSeats: 15,
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Swiss Alps & Glacier 3000 Winter Dream',
    destinationId: 6,
    destinationName: 'Swiss Alps Panorama',
    country: 'Switzerland',
    city: 'Interlaken',
    description: 'Discover the Jungfraujoch Top of Europe, Lake Brienz cruise, suspension bridge at Glacier 3000, and stay in cozy Swiss alpine chalets.',
    durationDays: 7,
    durationNights: 6,
    price: 1699.00,
    discountPercent: 10,
    featured: true,
    inclusions: 'Swiss Travel Pass (1st Class), Alpine Chalet Accommodation, Jungfraujoch Cogwheel Train Pass, Fondue Dinner Experience',
    itinerary: 'Day 1: Zurich arrival & train to Interlaken; Day 2: Jungfraujoch summit; Day 3: Lake Brienz & Thun cruise; Day 4: Grindelwald First Cliff Walk; Day 5: Glacier 3000 bridge; Day 6: Lucerne sightseeing; Day 7: Departure',
    availableSeats: 6,
    imageUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80'
  }
];
