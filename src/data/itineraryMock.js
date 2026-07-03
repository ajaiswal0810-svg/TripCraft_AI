// src/data/itineraryMock.js

const itineraryMock = {
  tripId: "trip-varanasi-01",
  title: "Sacred Varanasi",
  status: "active",
  destination: "Varanasi, Uttar Pradesh",
  subtitle:
    "A curated 3-day immersion into the world's oldest living city — dawn boat rides on the Ganges, ancient ghats, silk weavers' lanes, and an evening aarti that will stay with you forever.",
  durationDays: 3,
  startDate: "2026-11-10",
  endDate: "2026-11-12",

  destinationInsights: {
    preferredProvider: {
      label: "Preferred Transport",
      value: "Cycle rickshaw & private boat — best for the ghats",
    },
    currencyGuidance: {
      label: "Currency Guidance",
      value: "INR (₹) • Carry cash for ghats & local markets",
    },
  },

  localWeather: {
    temperature: 24,
    unit: "C",
    condition: "Clear with gentle Ganga breeze",
    humidity: 52,
    uvIndex: 5,
    uvLabel: "Moderate",
  },

  aiTip: {
    quote:
      "Wear light cotton and carry a shawl for the evening aarti — the ghats cool quickly after sunset and the ceremony lasts 45 minutes.",
  },

  routeMap: {
    center: { lat: 25.3176, lng: 82.9739 },
    zoom: 14,
    activitiesToday: 3,
    pins: [
      { id: "pin-1", label: "Dashashwamedh Ghat", lat: 25.3109, lng: 83.0107, type: "morning" },
      { id: "pin-2", label: "Kashi Vishwanath", lat: 25.3109, lng: 83.0107, type: "afternoon" },
      { id: "pin-3", label: "Assi Ghat", lat: 25.2967, lng: 82.9987, type: "evening" },
    ],
  },

  days: [
    {
      dayNumber: 1,
      title: "Dawn on the Ganges",
      date: "2026-11-10",
      dateLabel: "Tuesday, November 10th",
      location: "Varanasi Ghats",
      activities: [
        {
          id: "act-1-1",
          time: "05:30 AM",
          period: "Morning",
          icon: "sun",
          title: "Sunrise Boat Ride on the Ganges",
          description:
            "Drift past 84 ghats as the city wakes — priests performing rituals, pilgrims bathing, and the first light turning the river to molten gold.",
          image: "https://images.unsplash.com/photo-1561625116-5f8675632053?w=800&h=500&fit=crop",
          weather: { temp: 18, unit: "C", icon: "sun" },
          budget: "₹₹",
          duration: "90 mins",
          aiRecommendation: "AI scheduled 5:30AM — the light and silence at this hour are unrepeatable.",
          travelToNext: { mode: "walk", duration: "10 min walk along the ghats" },
        },
        {
          id: "act-1-2",
          time: "09:00 AM",
          period: "Morning",
          icon: "landmark",
          title: "Kashi Vishwanath Temple & Corridor",
          description:
            "Walk the newly built Kashi Vishwanath Corridor — a sweeping marble promenade connecting the temple to the Ganges, one of India's most significant spiritual sites.",
          image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop",
          transport: "10 min walk",
          budget: "₹",
          alert: { label: "Entry Confirmed", status: "confirmed" },
          aiRecommendation: "Dress code: covered shoulders and legs. Remove footwear at the entrance.",
          travelToNext: { mode: "walk", duration: "15 min walk" },
        },
        {
          id: "act-1-3",
          time: "07:00 PM",
          period: "Evening",
          icon: "moon",
          title: "Dashashwamedh Ghat Aarti",
          description:
            "Seven priests perform the Ganga Aarti in perfect synchrony — fire, flowers, incense, and Sanskrit chants rising into the night sky. Watch from a private boat on the river.",
          image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=500&fit=crop",
          weather: { temp: 21, unit: "C", icon: "moon" },
          budget: "₹₹",
          host: "Private boat, front-row view",
        },
      ],
    },
    {
      dayNumber: 2,
      title: "Silk, Spice & Sacred Lanes",
      date: "2026-11-11",
      dateLabel: "Wednesday, November 11th",
      location: "Old Varanasi & Sarnath",
      activities: [
        {
          id: "act-2-1",
          time: "08:00 AM",
          period: "Morning",
          icon: "utensils",
          title: "Old City Food Walk — Kachori Gali",
          description:
            "Weave through the ancient lanes of the old city — kachori-sabzi at a 100-year-old shop, lassi in a clay cup, and jalebis still hot from the kadhai.",
          image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&h=500&fit=crop",
          weather: { temp: 20, unit: "C", icon: "sun" },
          budget: "₹",
          duration: "2 hrs",
          aiRecommendation: "Start at Kachori Gali before 8:30AM — the best stalls sell out by 10.",
          travelToNext: { mode: "drive", duration: "30 min drive to Sarnath" },
        },
        {
          id: "act-2-2",
          time: "11:00 AM",
          period: "Afternoon",
          icon: "landmark",
          title: "Sarnath — Where Buddha First Taught",
          description:
            "The deer park where the Buddha delivered his first sermon. The Dhamek Stupa, the Ashoka Pillar, and a museum of extraordinary Buddhist sculpture.",
          image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&h=500&fit=crop",
          transport: "30 min drive",
          budget: "₹₹",
          duration: "2.5 hrs",
        },
        {
          id: "act-2-3",
          time: "06:00 PM",
          period: "Evening",
          icon: "utensils",
          title: "Rooftop Dinner — Ganga View",
          description:
            "A rooftop restaurant overlooking the Ganges — Banarasi thali with dal baati, chokha, and the city's famous thandai. The river glitters below as the ghats settle into night.",
          image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=500&fit=crop",
          budget: "₹₹₹",
          host: "Brown Bread Bakery Rooftop",
        },
      ],
    },
    {
      dayNumber: 3,
      title: "Silk Weavers & Farewell Ghat",
      date: "2026-11-12",
      dateLabel: "Thursday, November 12th",
      location: "Varanasi",
      activities: [
        {
          id: "act-3-1",
          time: "09:00 AM",
          period: "Morning",
          icon: "sun",
          title: "Banarasi Silk Weaving Workshop",
          description:
            "Visit a master weaver's home in the Muslim weavers' quarter — watch a Banarasi sari take shape on a handloom, thread by thread. The zari work is a UNESCO-recognised craft.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
          weather: { temp: 22, unit: "C", icon: "sun" },
          budget: "₹₹",
          duration: "2 hrs",
          aiRecommendation: "AI has arranged a private weaving demo — no tourist shops, straight to the source.",
          travelToNext: { mode: "walk", duration: "20 min walk to Assi Ghat" },
        },
        {
          id: "act-3-2",
          time: "12:00 PM",
          period: "Afternoon",
          icon: "waves",
          title: "Assi Ghat — The Quiet Farewell",
          description:
            "The southernmost ghat, beloved by students, sadhus, and long-term visitors. Sit by the river, watch the boats, and let Varanasi's rhythm slow you down one last time.",
          image: "https://images.unsplash.com/photo-1561625116-5f8675632053?w=800&h=500&fit=crop",
          transport: "20 min walk",
          budget: "₹",
          duration: "90 mins",
        },
        {
          id: "act-3-3",
          time: "05:00 PM",
          period: "Evening",
          icon: "moon",
          title: "Evening Boat — Last Light on the Ghats",
          description:
            "One final drift along the ghats as the sun sets behind the old city. The boatman knows every ghat by name. This is the Varanasi you'll carry home.",
          image: "https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800&h=500&fit=crop",
          weather: { temp: 20, unit: "C", icon: "moon" },
          budget: "₹₹",
          host: "Private wooden boat",
        },
      ],
    },
  ],
};

export const getDayByNumber = (dayNumber) =>
  itineraryMock.days.find((d) => d.dayNumber === dayNumber);

export default itineraryMock;
