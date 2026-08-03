/**
 * Cities Data Configuration
 * Contains ACTUAL lat/lng coordinates and metadata for cities where EAD has been conducted
 * Coordinates are real geographic coordinates (latitude, longitude)
 */

export const cities = [
  {
    id: 'kharagpur',
    name: 'IIT Kharagpur',
    shortName: 'Kharagpur',
    lat: 22.3149,
    lng: 87.3105,
    isOrigin: true,
    edition: 'Origin',
    students: '5000+',
    year: '2015-2026'
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    shortName: 'Kolkata',
    lat: 22.5726,
    lng: 88.3639,
    edition: 'EAD 2025',
    students: '1200+',
    year: '2025'
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    shortName: 'Bhubaneswar',
    lat: 20.2961,
    lng: 85.8245,
    edition: 'EAD 2024',
    students: '800+',
    year: '2024'
  },
  {
    id: 'delhi',
    name: 'Delhi',
    shortName: 'Delhi',
    lat: 28.7041,
    lng: 77.1025,
    edition: 'EAD 2025',
    students: '2500+',
    year: '2025'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    shortName: 'Jaipur',
    lat: 26.9124,
    lng: 75.7873,
    edition: 'EAD 2024',
    students: '1100+',
    year: '2024'
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    shortName: 'Ahmedabad',
    lat: 23.0225,
    lng: 72.5714,
    edition: 'EAD 2025',
    students: '1400+',
    year: '2025'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    shortName: 'Mumbai',
    lat: 19.0760,
    lng: 72.8777,
    edition: 'EAD 2025',
    students: '3000+',
    year: '2025'
  },
  {
    id: 'pune',
    name: 'Pune',
    shortName: 'Pune',
    lat: 18.5204,
    lng: 73.8567,
    edition: 'EAD 2024',
    students: '1800+',
    year: '2024'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    shortName: 'Hyderabad',
    lat: 17.3850,
    lng: 78.4867,
    edition: 'EAD 2025',
    students: '2200+',
    year: '2025'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    shortName: 'Bengaluru',
    lat: 12.9716,
    lng: 77.5946,
    edition: 'EAD 2025',
    students: '2800+',
    year: '2025'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    shortName: 'Chennai',
    lat: 13.0827,
    lng: 80.2707,
    edition: 'EAD 2024',
    students: '2000+',
    year: '2024'
  },
  {
    id: 'guwahati',
    name: 'Guwahati',
    shortName: 'Guwahati',
    lat: 26.1445,
    lng: 91.7362,
    edition: 'EAD 2024',
    students: '600+',
    year: '2024'
  }
];

// Origin city for drawing connections
export const originCity = cities.find(city => city.isOrigin);

// Non-origin cities for connections
export const targetCities = cities.filter(city => !city.isOrigin);
