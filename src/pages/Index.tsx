import { useState, useCallback, useEffect } from "react";

const HEART_COUNT = 20;
const CONFETTI_COUNT = 50;

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; rot: number; scale: number; color: string; delay: number }>>([]);

  const runAway = useCallback(() => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);
    setNoPos({ x, y });
  }, []);

  const handleYes = () => {
    setAccepted(true);
    const items = Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rot: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      color: ["#ff6b8a", "#ff85a1", "#ffc2d1", "#ff3366", "#e91e63"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5,
    }));
    setConfetti(items);
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(340 80% 92%), hsl(320 70% 88%), hsl(350 90% 94%))" }}>
      {/* Falling hearts */}
      {Array.from({ length: HEART_COUNT }).map((_, i) => (
        <FallingHeart key={i} index={i} />
      ))}

      {!accepted ? (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-12 leading-tight"
            style={{ color: "hsl(340 60% 35%)", fontFamily: "'Trebuchet MS', 'Comic Sans MS', cursive" }}
          >
            milla will you be
            <br />
            my valentine? 💕
          </h1>

          <div className="flex gap-6 items-center">
            <button
              onClick={handleYes}
              className="px-8 py-4 text-xl sm:text-2xl font-bold rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(340 80% 60%), hsl(350 90% 65%))",
                color: "white",
                boxShadow: "0 8px 30px hsla(340, 80%, 50%, 0.4)",
              }}
            >
              Sì 💖
            </button>

            <button
              onMouseEnter={runAway}
              onTouchStart={(e) => { e.preventDefault(); runAway(); }}
              className="px-8 py-4 text-xl sm:text-2xl font-bold rounded-full shadow-lg transition-all duration-100"
              style={{
                background: "hsl(0 0% 85%)",
                color: "hsl(0 0% 40%)",
                position: noPos ? "fixed" : "relative",
                left: noPos ? `${noPos.x}px` : undefined,
                top: noPos ? `${noPos.y}px` : undefined,
                zIndex: 50,
              }}
            >
              No 🙄
            </button>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
          {/* Confetti */}
          {confetti.map((c) => (
            <span
              key={c.id}
              className="confetti-heart"
              style={{
                left: `${c.x}%`,
                top: `-5%`,
                fontSize: `${c.scale * 24}px`,
                color: c.color,
                animationDelay: `${c.delay}s`,
              }}
            >
              ❤️
            </span>
          ))}

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-center mb-8 animate-bounce-in"
            style={{ color: "hsl(340 60% 35%)", fontFamily: "'Trebuchet MS', 'Comic Sans MS', cursive" }}
          >
            awww ti amo anch'io 😭
          </h1>

          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd2OWF6YmRrNnJiOGxhMGRtaXhwcnlpejF5eWdpMjdyNXZ0cHd4NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MDJ9IbxxvDUQM/giphy.gif"
            alt="cute love gif"
            className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl object-cover shadow-xl"
          />
        </div>
      )}

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.3; }
        }
        .falling-heart {
          position: fixed;
          z-index: 1;
          animation: fall linear infinite;
          pointer-events: none;
          user-select: none;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(0.3); opacity: 0; }
        }
        .confetti-heart {
          position: fixed;
          z-index: 5;
          animation: confetti-fall 3s ease-in forwards;
          pointer-events: none;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

const FallingHeart = ({ index }: { index: number }) => {
  const left = Math.random() * 100;
  const size = 14 + Math.random() * 20;
  const duration = 6 + Math.random() * 8;
  const delay = Math.random() * 10;
  const opacity = 0.2 + Math.random() * 0.4;

  return (
    <span
      className="falling-heart"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity,
      }}
    >
      💗
    </span>
  );
};

export default Index;
