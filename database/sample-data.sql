-- TravelMate Sample Seed Data

-- Users (Default password: password123)
INSERT INTO users (id, username, email, password, role, full_name, phone, address, avatar_url, created_at, updated_at) VALUES
(1, 'admin', 'admin@travelmate.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_ADMIN', 'Platform Administrator', '+91-9876543210', 'Connaught Place, New Delhi', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'rohit.sharma', 'rohit@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_USER', 'Rohit Sharma', '+91-9811223344', 'Sector 62, Noida, UP', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'priya.singh', 'priya@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_USER', 'Priya Singh', '+91-9988776655', 'Lajpat Nagar, New Delhi', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Destinations
INSERT INTO destinations (id, name, country, city, description, category, best_season, image_url, rating, created_at) VALUES
(1, 'Goa Beach Paradise', 'India', 'Goa', 'Golden sun-kissed beaches, Portuguese architecture, vibrant nightlife and coastal seafood.', 'Beach', 'Oct - Mar', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 4.85, CURRENT_TIMESTAMP),
(2, 'Manali Alpine Retreat', 'India', 'Manali', 'Snow-capped Himalayan peaks, Solang Valley adventures, Rohtang Pass, and tranquil pine forests.', 'Mountain', 'Sep - Jun', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', 4.90, CURRENT_TIMESTAMP),
(3, 'Kerala Backwaters & Hills', 'India', 'Alleppey & Munnar', 'Emerald tea plantations, serene houseboat cruises, Ayurvedic rejuvenation, and Arabian sea coast.', 'Nature', 'Sep - Mar', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', 4.92, CURRENT_TIMESTAMP),
(4, 'Bali Tropical Wonder', 'Indonesia', 'Ubud & Kuta', 'Mystic Hindu temples, lush terraced rice paddies, world-class surfing, and luxury resorts.', 'Island', 'Apr - Oct', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 4.88, CURRENT_TIMESTAMP),
(5, 'Dubai Skyline & Desert', 'UAE', 'Dubai', 'Futuristic architectural marvels, desert safari dune bashing, luxury marina cruises, and Burj Khalifa.', 'Luxury', 'Nov - Apr', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', 4.80, CURRENT_TIMESTAMP),
(6, 'Swiss Alps Explorer', 'Switzerland', 'Interlaken & Lucerne', 'Pristine turquoise lakes, cogwheel mountain trains, Matterhorn vistas, and alpine chocolate villages.', 'Adventure', 'May - Oct', 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800', 4.96, CURRENT_TIMESTAMP);

-- Travel Packages
INSERT INTO travel_packages (id, title, destination_id, description, duration_days, duration_nights, price, discount_percent, featured, inclusions, itinerary, available_seats, image_url, created_at) VALUES
(1, 'Sun, Sand & Sunset Goa Getaway', 1, 'Experience coastal thrills with 4-star beachfront stays, North Goa party cruise, South Goa heritage tour, and water sports at Calangute.', 4, 3, 14999.00, 15, TRUE, '4-Star Resort, Daily Breakfast, Airport Transfers, Scuba Diving Session, Sunset Cruise', 'Day 1: Arrival & North Goa Sunset. Day 2: Water Sports at Baga. Day 3: Heritage Old Goa Churches. Day 4: Departure.', 16, 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', CURRENT_TIMESTAMP),
(2, 'Himalayan Escape: Manali & Solang Expedition', 2, 'Unwind in the lap of snow-clad mountains with river rafting, paragliding in Solang Valley, Rohtang Pass snow drive, and Old Manali cafes.', 5, 4, 18499.00, 10, TRUE, 'Deluxe Mountain View Hotel, Breakfast & Dinner, Volvo Transfers, Solang Valley Tour, River Rafting', 'Day 1: Delhi to Manali Volvo. Day 2: Hadimba Temple & Mall Road. Day 3: Solang Valley Snow Sports. Day 4: Naggar Castle & Kullu Rafting. Day 5: Return to Delhi.', 12, 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', CURRENT_TIMESTAMP),
(3, 'Enchanting Kerala Houseboat & Tea Trails', 3, 'Private luxury Alleppey backwater houseboat stay combined with misty morning walks across sprawling Munnar tea estates.', 6, 5, 23999.00, 20, TRUE, 'Private A/C Houseboat, 4-Star Munnar Hill Resort, All Meals on Boat, Chauffeur Car, Spice Plantation Tour', 'Day 1: Cochin to Munnar. Day 2: Eravikulam National Park & Tea Museum. Day 3: Thekkady Wildlife Sanctuary. Day 4: Alleppey Houseboat Cruise. Day 5: Kovalam Beach. Day 6: Departure.', 8, 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', CURRENT_TIMESTAMP),
(4, 'Bali Island Bliss: Temples & Beaches', 4, 'Discover the Island of the Gods with sacred waterfalls, Uluwatu cliff temple fire dances, Ubud monkey forest, and Nusa Penida island excursion.', 6, 5, 45999.00, 12, TRUE, 'Villas with Private Pool, Return Airport Transfers, Daily Breakfast, Nusa Penida Day Tour, Balinese Massage', 'Day 1: Arrival in Denpasar. Day 2: Ubud Rice Terraces & Swing. Day 3: Nusa Penida Island Speedboat Tour. Day 4: Uluwatu Sunset & Kecak Dance. Day 5: Seminyak Beach Club. Day 6: Souvenir Shopping & Departure.', 10, 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', CURRENT_TIMESTAMP),
(5, 'Dubai Grandeur: Desert Safari & Skylines', 5, 'Luxury Dubai holiday featuring Burj Khalifa 124th floor observation deck, 4x4 Desert Safari with BBQ dinner, and luxury Dhow Cruise.', 5, 4, 38999.00, 10, FALSE, '4-Star City Hotel, UAE Tourist Visa, Desert Safari with BBQ, Burj Khalifa Tickets, Marina Dhow Cruise', 'Day 1: Arrival & Marina Dhow Cruise. Day 2: Half Day City Tour & Burj Khalifa. Day 3: Desert Safari with Quad Biking. Day 4: Dubai Mall & Miracle Garden. Day 5: Departure.', 15, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', CURRENT_TIMESTAMP),
(6, 'Swiss Dream Panorama Tour', 6, 'Journey across pristine Jungfraujoch Top of Europe, scenic train journeys on the GoldenPass Express, and Lucerne Chapel Bridge.', 7, 6, 124999.00, 5, TRUE, 'Swiss Travel Pass (1st Class), Central Swiss Hotels, Mountain Excursion to Jungfrau, Lake Lucerne Boat Cruise', 'Day 1: Zurich to Lucerne. Day 2: Mount Titlis Rotair. Day 3: Scenic Train to Interlaken. Day 4: Jungfraujoch Top of Europe. Day 5: Bern Old Town. Day 6: Zurich Lake & Shopping. Day 7: Fly Home.', 6, 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800', CURRENT_TIMESTAMP);

-- Bookings
INSERT INTO bookings (id, booking_reference, user_id, package_id, travel_date, number_of_travelers, total_price, status, special_requests, created_at, updated_at) VALUES
(1, 'TM-2026-GOA-101', 2, 1, '2026-11-15', 2, 29998.00, 'CONFIRMED', 'Vegetarian meals requested during cruise.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'TM-2026-MAN-102', 3, 2, '2026-12-20', 2, 36998.00, 'CONFIRMED', 'Honeymoon room decoration on arrival.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'TM-2026-KER-103', 2, 3, '2027-01-10', 1, 23999.00, 'PENDING', 'Upper deck room on houseboat if available.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Payments
INSERT INTO payments (id, transaction_id, booking_id, user_id, amount, payment_method, payment_status, payment_date) VALUES
(1, 'TXN-98234-UP1', 1, 2, 29998.00, 'UPI', 'SUCCESS', CURRENT_TIMESTAMP),
(2, 'TXN-87412-CC2', 2, 3, 36998.00, 'CREDIT_CARD', 'SUCCESS', CURRENT_TIMESTAMP);

-- Reviews
INSERT INTO reviews (id, user_id, destination_id, package_id, rating, comment, created_at) VALUES
(1, 2, 1, 1, 5, 'Unbelievable Goa trip! The beachfront resort and scuba diving team were stellar. Seamless booking through TravelMate!', CURRENT_TIMESTAMP),
(2, 3, 2, 2, 5, 'The snow in Solang Valley was magical. Driver was punctual and courteous throughout the Manali circuit.', CURRENT_TIMESTAMP);
