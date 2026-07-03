// src/data/plannerQuestions.js

const plannerQuestions = [
  {
    id: "q1-destination",
    step: 1,
    key: "destination",
    type: "search",
    heading: "Where should your next story begin?",
    subheading: "Describe your dream vibe, or search a specific Indian destination.",
    placeholder: "I'm looking for a peaceful mountain village with cafés...",
    trendingSuggestions: ["Varanasi", "Leh Ladakh", "Goa", "Udaipur", "Srinagar"],
    recentSearches: ["Spiritual retreat in Rishikesh", "Houseboat stay in Alleppey"],
  },
  {
    id: "q2-mood",
    step: 2,
    key: "mood",
    type: "single-select",
    heading: "What mood are you chasing?",
    subheading: "This shapes everything the AI crafts — from your hotel to your first morning.",
    options: [
      { value: "deep-rest", label: "Deep Rest", icon: "moon", description: "Slow mornings, minimal plans, maximum stillness." },
      { value: "quiet-luxury", label: "Quiet Luxury", icon: "sparkles", description: "Refined heritage stays, exceptional service." },
      { value: "high-adventure", label: "High Adventure", icon: "compass", description: "Treks, rapids, altitude — movement every day." },
      { value: "cultural-immersion", label: "Cultural Immersion", icon: "landmark", description: "Temples, local rituals, living history." },
      { value: "romantic-escape", label: "Romantic Escape", icon: "heart", description: "Sunsets, candlelit dinners, private moments." },
    ],
  },
  {
    id: "q3-pace",
    step: 3,
    key: "pace",
    type: "slider",
    heading: "Fine-tune your pace",
    subheading: "How full should each day feel?",
    min: 1,
    max: 5,
    minLabel: "Deep Rest",
    maxLabel: "High Adventure",
    default: 3,
  },
  {
    id: "q4-interests",
    step: 4,
    key: "interests",
    type: "multi-select",
    heading: "What draws you in?",
    subheading: "Select as many as resonate — the AI weighs each against your itinerary.",
    options: [
      { value: "gastronomy", label: "Street Food & Cuisine", icon: "utensils" },
      { value: "wellness", label: "Wellness & Ayurveda", icon: "leaf" },
      { value: "architecture", label: "Forts & Architecture", icon: "building" },
      { value: "nightlife", label: "Nightlife & Music", icon: "moon-star" },
      { value: "nature", label: "Nature & Wildlife", icon: "trees" },
      { value: "art-and-design", label: "Art & Craft", icon: "palette" },
      { value: "history", label: "History & Heritage", icon: "scroll" },
      { value: "shopping", label: "Local Markets", icon: "bag" },
    ],
  },
  {
    id: "q5-dates",
    step: 5,
    key: "travelDates",
    type: "date-range",
    heading: "When are you traveling?",
    subheading: "We'll cross-reference weather, festivals, and seasonal pricing automatically.",
  },
  {
    id: "q6-companions",
    step: 6,
    key: "groupType",
    type: "single-select",
    heading: "Who's joining the journey?",
    subheading: "This adjusts pacing, room configurations, and activity recommendations.",
    options: [
      { value: "solo", label: "Solo", icon: "user" },
      { value: "couple", label: "Couple", icon: "users-2" },
      { value: "family", label: "Family", icon: "users" },
      { value: "friends", label: "Friends", icon: "users-round" },
    ],
  },
  {
    id: "q7-budget",
    step: 7,
    key: "budget",
    type: "single-select",
    heading: "What's your comfort zone for spend?",
    subheading: "AI balances luxury with value across your whole trip.",
    options: [
      { value: "budget", label: "Budget Explorer", range: "₹2,000 – ₹5,000 / day" },
      { value: "refined", label: "Refined Comfort", range: "₹5,000 – ₹15,000 / day" },
      { value: "elite", label: "Elite Experience", range: "₹15,000+ / day" },
    ],
  },
];

export const getQuestionByKey = (key) => plannerQuestions.find((q) => q.key === key);
export const totalPlannerSteps = plannerQuestions.length;

export default plannerQuestions;
