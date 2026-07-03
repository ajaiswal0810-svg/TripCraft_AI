// src/pages/Landing/Hero.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, Sparkles, MapPin, Clock, ArrowRight, Send } from "lucide-react";
import { getTrendingDestinations } from "../../data/destinations";

const RECENT_SEARCHES = ["Sustainable luxury in Costa Rica", "Artisan boutique hotels in Paris"];

const AI_CONVERSATION = [
  { role: "ai", text: "Where should your next story begin? ✨" },
  { role: "ai", text: "Tell me your dream vibe — I'll craft the perfect escape." },
];

const FOLLOW_UPS = [
  "How many days are you thinking?",
  "Solo adventure or with someone special?",
  "Any must-have experiences?",
];

const Hero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [followUpIdx, setFollowUpIdx] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const chatEndRef = useRef(null);
  const trending = getTrendingDestinations();

  // Animate initial AI messages in
  useEffect(() => {
    let t1 = setTimeout(() => {
      setMessages([AI_CONVERSATION[0]]);
    }, 400);
    let t2 = setTimeout(() => {
      setMessages(AI_CONVERSATION);
    }, 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleExpand = () => setExpanded(true);

  const handleSend = (text) => {
    const msg = text || inputVal;
    if (!msg.trim()) return;
    setInputVal("");
    setQuery(msg);
    setMessages((prev) => [...prev, { role: "user", text: msg }]);

    if (followUpIdx < FOLLOW_UPS.length) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "ai", text: FOLLOW_UPS[followUpIdx] }]);
        setFollowUpIdx((i) => i + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/planner", { state: { query: msg } });
      }, 600);
    }
  };

  const handleExplore = (e) => {
    e.preventDefault();
    navigate("/planner", { state: { query } });
  };

  return (
    <section className="relative overflow-hidden bg-[#0B2E3A]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop"
          alt="Cliffside coastal villas at golden hour"
          className="h-full w-full object-cover opacity-60 transition-transform duration-[8s] ease-out scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2E3A]/85 via-[#0B2E3A]/30 to-[#FDF6EE]" />
        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] h-64 w-64 rounded-full bg-[#E8A23D]/10 blur-3xl animate-float" />
        <div className="absolute top-40 right-[8%] h-48 w-48 rounded-full bg-[#E2572B]/10 blur-3xl animate-float [animation-delay:1.5s]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-40 pt-28 text-center">
        <span
          className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white/90 backdrop-blur-sm animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          AI-Powered Exploration
        </span>

        <h1
          className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl animate-fade-in-up"
          style={{ animationDelay: "0.25s" }}
        >
          Craft memories,
          <br />
          <span className="gradient-text">not itineraries.</span>
        </h1>

        <p
          className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Your sophisticated AI travel companion curates bespoke experiences that resonate with your soul.
        </p>
      </div>

      {/* Floating conversational search card */}
      <div className="relative mx-auto -mt-28 max-w-2xl px-6 pb-20 animate-fade-in-up" style={{ animationDelay: "0.55s" }}>
        <div
          className="rounded-3xl p-1 animate-glow-pulse"
          style={{
            background: "linear-gradient(135deg, rgb(232 162 61 / 0.6), rgb(226 87 43 / 0.4), rgb(15 61 77 / 0.3))",
          }}
        >
          <div className="rounded-[22px] glass-card p-6 shadow-2xl shadow-black/30">
            {/* Conversational chat area */}
            {expanded ? (
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A23D] to-[#E2572B]">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#0F3D4D]/60">
                    AI Travel Planner
                  </span>
                </div>

                <div className="max-h-52 space-y-3 overflow-y-auto no-scrollbar pr-1">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex animate-chat-pop ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      style={{ animationDelay: `${i * 0.05}s` }}
                    >
                      {msg.role === "ai" && (
                        <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A23D] to-[#E2572B]">
                          <Sparkles className="h-3 w-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === "ai"
                            ? "bg-[#0F3D4D]/8 text-[#0F3D4D] rounded-tl-sm"
                            : "bg-gradient-to-br from-[#0F3D4D] to-[#16515f] text-white rounded-tr-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2 animate-chat-pop">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A23D] to-[#E2572B]">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[#0F3D4D]/8 px-4 py-3">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-[#0F3D4D]/50"
                            style={{ animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-full border border-[#0F3D4D]/15 bg-white px-4 py-2.5 shadow-sm">
                  <input
                    autoFocus
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your answer..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#0F3D4D] placeholder:text-[#0F3D4D]/40 focus:outline-none"
                  />
                  <button
                    onClick={() => handleSend()}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F3D4D] to-[#16515f] text-white transition-transform hover:scale-110"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleExplore}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#E2572B] to-[#E8A23D] py-3 text-sm font-semibold text-white shadow-lg shadow-[#E2572B]/30 transition-all hover:shadow-xl hover:shadow-[#E2572B]/40 hover:-translate-y-0.5"
                >
                  <Sparkles className="h-4 w-4" />
                  Craft My Journey
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-[#0F3D4D] sm:text-2xl">
                  Where should your next story begin?
                </h2>
                <p className="mt-1.5 text-sm text-[#0F3D4D]/60">
                  Describe your dream vibe, or search a specific sanctuary.
                </p>

                <form onSubmit={handleExplore} className="mt-5 flex items-center gap-2 rounded-full border border-[#0F3D4D]/15 bg-white px-4 py-2.5 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-[#0F3D4D]/30">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#E8A23D]" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleExpand}
                    placeholder="I'm looking for a quiet mountain retreat..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#0F3D4D] placeholder:text-[#0F3D4D]/40 focus:outline-none"
                  />
                  <button type="button" aria-label="Voice search" className="shrink-0 text-[#0F3D4D]/40 hover:text-[#0F3D4D] transition-colors">
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0F3D4D] to-[#16515f] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#0F3D4D]/30 hover:-translate-y-0.5"
                  >
                    <Search className="h-3.5 w-3.5" />
                    Explore
                  </button>
                </form>

                <div className="mt-6 grid gap-6 text-left sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D4D]/50">
                      Trending Destinations
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trending.map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => { setQuery(d.name); handleExpand(); }}
                          className="rounded-full border border-[#0F3D4D]/15 px-3 py-1.5 text-xs font-medium text-[#0F3D4D]/80 transition-all hover:border-[#E2572B]/50 hover:bg-[#E2572B]/5 hover:text-[#E2572B]"
                        >
                          {d.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D4D]/50">
                      <Clock className="h-3 w-3" /> Recent Searches
                    </p>
                    <ul className="space-y-1.5">
                      {RECENT_SEARCHES.map((search) => (
                        <li key={search}>
                          <button
                            type="button"
                            onClick={() => { setQuery(search); handleExpand(); }}
                            className="flex items-center gap-1.5 text-xs text-[#0F3D4D]/70 transition-colors hover:text-[#0F3D4D]"
                          >
                            <MapPin className="h-3 w-3 shrink-0 text-[#E2572B]" />
                            <span className="text-left italic">"{search}"</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
