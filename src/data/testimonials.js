// src/data/testimonials.js

const testimonials = [
  {
    id: "t-001",
    name: "Priya Malhotra",
    title: "Creative Director, Mumbai",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&crop=face",
    quote:
      "TripCraft planned our Udaipur trip down to the exact boat table at Jag Mandir. Every detail felt considered — like a friend who actually knows the city.",
    rating: 5,
    trip: "Udaipur, Rajasthan",
    featured: true,
  },
  {
    id: "t-002",
    name: "Arjun Mehta",
    title: "Startup Founder, Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&crop=face",
    quote:
      "The AI rerouted our Leh itinerary when a road closed near Khardung La. We ended up at a monastery we'd never have found otherwise. That's the magic.",
    rating: 5,
    trip: "Leh, Ladakh",
    featured: true,
  },
  {
    id: "t-003",
    name: "Kavya Nair",
    title: "Travel Writer, Kochi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&crop=face",
    quote:
      "I've written about Kerala for years. TripCraft showed me an Alleppey backwater route I'd never taken — and I've been going there for a decade.",
    rating: 5,
    trip: "Alleppey, Kerala",
    featured: true,
  },
  {
    id: "t-004",
    name: "Rohan Singhania",
    title: "Investment Banker, Delhi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&crop=face",
    quote:
      "The budget tracking alone was worth it. I landed in Jaipur knowing exactly where every rupee was going — including the heritage hotel upgrade.",
    rating: 4.8,
    trip: "Jaipur, Rajasthan",
    featured: false,
  },
  {
    id: "t-005",
    name: "Aditi Sharma",
    title: "Editor, Wander Quarterly",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&crop=face",
    quote:
      "Varanasi always felt logistically overwhelming. TripCraft turned it into a five-minute conversation and the most profound trip of my life.",
    rating: 5,
    trip: "Varanasi, Uttar Pradesh",
    featured: false,
  },
];

export const getFeaturedTestimonials = () => testimonials.filter((t) => t.featured);

export default testimonials;
