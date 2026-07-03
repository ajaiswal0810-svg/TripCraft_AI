// src/data/dashboardMock.js

const dashboardMock = {
  destination: "Jaipur",
  country: "India",
  daysUntilDeparture: 4,

  readiness: {
    percent: 94,
    label: "Travel Readiness",
    headline: "You're almost ready for Jaipur",
    description:
      "We've analysed your itinerary, budget, and packing status. You're in excellent shape for your departure in 4 days.",
  },

  budget: {
    totalSpent: 18500,
    totalBudget: 28000,
    currency: "₹",
    status: "On Track",
    note: "You are currently 9% under your projected daily average for Jaipur.",
    categories: [
      { id: "accommodation", label: "Accommodation", icon: "bed", percent: 78 },
      { id: "dining", label: "Dining & Experiences", icon: "utensils", percent: 38 },
    ],
  },

  weather: {
    location: "Jaipur",
    condition: "sunny",
    forecast: [
      { day: "TODAY", temp: 31, icon: "sun" },
      { day: "FRI", temp: 29, icon: "cloud" },
      { day: "SAT", temp: 33, icon: "sun" },
    ],
  },

  packingChecklist: {
    completed: 21,
    total: 30,
    categories: [
      { id: "heritage-gear", label: "Heritage Gear", icon: "camera", completed: 6, total: 6 },
      { id: "essentials", label: "Essentials", icon: "briefcase-medical", completed: 10, total: 10 },
      { id: "tech-media", label: "Tech & Media", icon: "camera", completed: 3, total: 8 },
      { id: "evening-wear", label: "Evening Wear", icon: "shirt", completed: 2, total: 6 },
    ],
  },

  recommendations: {
    heading: "Recommended for You",
    subheading: "Curated based on your interests in Rajasthan",
    items: [
      {
        id: "rec-1",
        category: "Heritage",
        rating: 4.9,
        title: "Amber Fort Sunrise Tour",
        description:
          "A private guided walk through Amber Fort before the crowds arrive — the light on the Sheesh Mahal at 7AM is extraordinary.",
        // Amber Fort / Jaipur fort
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&auto=format&fit=crop",
      },
      {
        id: "rec-2",
        category: "Gastronomy",
        rating: 4.8,
        title: "Rooftop Rajasthani Thali",
        description:
          "Dal baati churma, gatte ki sabzi, and ker sangri served on a rooftop overlooking the walled city at sunset.",
        // Indian thali food
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop",
      },
      {
        id: "rec-3",
        category: "Craft",
        rating: 5.0,
        title: "Blue Pottery Workshop",
        description:
          "Learn Jaipur's signature blue pottery craft from a master artisan in their old-city studio — a 400-year-old tradition.",
        // Craft / pottery workshop
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop",
      },
    ],
  },
};

export default dashboardMock;
