// src/data/vaultMock.js

const vaultMock = {
  heading: "Your Vault of Journeys",
  subheading: "Every trip TripCraft has crafted for you, preserved as a living journal.",

  stats: {
    journeysCrafted: 8,
    citiesVisited: 11,
    photosCurated: 342,
    memoriesWritten: 27,
  },

  journals: [
    {
      id: "journal-001",
      tripSlug: "sacred-varanasi",
      title: "Sacred Varanasi",
      destination: "Varanasi, Uttar Pradesh",
      // Varanasi ghats at dawn
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop",
      dateRange: "Nov 10 – Nov 12, 2026",
      status: "active",
      mood: "Cultural Immersion",
      highlightCount: 6,
      summary:
        "Three days on the oldest living city on earth — a dawn boat on the Ganges, the Kashi Vishwanath corridor, and an aarti that made the whole river glow.",
      pinnedMemory: {
        // Ganga aarti fire ceremony
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop",
        caption: "The aarti flames reflected on the Ganges for exactly forty minutes.",
      },
    },
    {
      id: "journal-002",
      tripSlug: "alpine-dream-srinagar",
      title: "The Alpine Dream",
      destination: "Srinagar, Jammu & Kashmir",
      // Dal Lake / Kashmir houseboat
      coverImage: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&auto=format&fit=crop",
      dateRange: "Apr 08 – Apr 13, 2026",
      status: "completed",
      mood: "Deep Rest",
      highlightCount: 9,
      summary:
        "Tulip fields in full bloom, a houseboat on Dal Lake, and a shikara ride at dawn with the Zabarwan range reflected in still water.",
      pinnedMemory: {
        // Kashmir mountains / snow peaks
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop",
        caption: "The garden was in peak bloom for exactly nine days. We caught day four.",
      },
    },
    {
      id: "journal-003",
      tripSlug: "backwater-stillness-alleppey",
      title: "Backwater Stillness",
      destination: "Alleppey, Kerala",
      // Kerala backwaters houseboat
      coverImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop",
      dateRange: "Dec 18 – Dec 22, 2025",
      status: "completed",
      mood: "Deep Rest",
      highlightCount: 7,
      summary:
        "A luxury houseboat through palm-fringed canals, a Munnar tea plantation at dawn, and three days without a single alarm set.",
      pinnedMemory: {
        // Munnar tea estates
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop",
        caption: "The houseboat cook made the best fish curry of the entire trip.",
      },
    },
    {
      id: "journal-004",
      tripSlug: "pink-city-jaipur",
      title: "The Pink City",
      destination: "Jaipur, Rajasthan",
      // Jaipur Amber Fort / Hawa Mahal
      coverImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&auto=format&fit=crop",
      dateRange: "Jan 14 – Jan 18, 2025",
      status: "completed",
      mood: "Quiet Luxury",
      highlightCount: 8,
      summary:
        "Amber Fort at sunrise before the crowds, a rooftop thali dinner in the walled city, and a blue pottery workshop with a master artisan.",
      pinnedMemory: {
        // Udaipur / Rajasthan palace lake
        image: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=600&auto=format&fit=crop",
        caption: "The Sheesh Mahal at 7AM — a thousand mirrors, one beam of light.",
      },
    },
    {
      id: "journal-005",
      tripSlug: "goa-coastal-escape",
      title: "Coastal Escape",
      destination: "Goa",
      // Goa beach / Arabian Sea
      coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop",
      dateRange: "Dec 26 – Jan 01, 2025",
      status: "completed",
      mood: "Romantic Escape",
      highlightCount: 6,
      summary:
        "A Portuguese-era villa in Fontainhas, sunset at Ashwem Beach, and a spice plantation lunch that lasted three hours.",
      pinnedMemory: {
        // Andaman / tropical beach India
        image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&auto=format&fit=crop",
        caption: "The Arabian Sea turned copper at 6:17PM. We didn't move for an hour.",
      },
    },
  ],
};

export const getJournalBySlug = (slug) =>
  vaultMock.journals.find((j) => j.tripSlug === slug);
export const getActiveJournal = () =>
  vaultMock.journals.find((j) => j.status === "active");

export default vaultMock;
