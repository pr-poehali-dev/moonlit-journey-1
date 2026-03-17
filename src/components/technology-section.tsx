import { useState, useRef } from "react"

type Player = {
  id: number
  x: number
  y: number
  number: number
  team: "home" | "away"
}

const initialPlayers: Player[] = [
  // Home team (красные) — 4-3-3
  { id: 1, x: 50, y: 88, number: 1, team: "home" },
  { id: 2, x: 18, y: 72, number: 2, team: "home" },
  { id: 3, x: 36, y: 72, number: 3, team: "home" },
  { id: 4, x: 64, y: 72, number: 4, team: "home" },
  { id: 5, x: 82, y: 72, number: 5, team: "home" },
  { id: 6, x: 25, y: 54, number: 6, team: "home" },
  { id: 7, x: 50, y: 54, number: 7, team: "home" },
  { id: 8, x: 75, y: 54, number: 8, team: "home" },
  { id: 9, x: 20, y: 34, number: 9, team: "home" },
  { id: 10, x: 50, y: 30, number: 10, team: "home" },
  { id: 11, x: 80, y: 34, number: 11, team: "home" },

  // Away team (синие) — 4-4-2
  { id: 12, x: 50, y: 12, number: 1, team: "away" },
  { id: 13, x: 18, y: 28, number: 2, team: "away" },
  { id: 14, x: 36, y: 28, number: 3, team: "away" },
  { id: 15, x: 64, y: 28, number: 4, team: "away" },
  { id: 16, x: 82, y: 28, number: 5, team: "away" },
  { id: 17, x: 18, y: 46, number: 6, team: "away" },
  { id: 18, x: 38, y: 46, number: 7, team: "away" },
  { id: 19, x: 62, y: 46, number: 8, team: "away" },
  { id: 20, x: 82, y: 46, number: 9, team: "away" },
  { id: 21, x: 36, y: 64, number: 10, team: "away" },
  { id: 22, x: 64, y: 64, number: 11, team: "away" },
]

export function TechnologySection() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [dragging, setDragging] = useState<number | null>(null)
  const fieldRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (id: number) => {
    setDragging(id)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging === null || !fieldRef.current) return
    const rect = fieldRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === dragging
          ? { ...p, x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) }
          : p
      )
    )
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragging === null || !fieldRef.current) return
    e.preventDefault()
    const touch = e.touches[0]
    const rect = fieldRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === dragging
          ? { ...p, x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) }
          : p
      )
    )
  }

  const stopDrag = () => setDragging(null)

  const reset = () => setPlayers(initialPlayers)

  return (
    <section id="technology" className="py-20 bg-black">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold text-white mb-4">
            Интерактивное поле
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Перетаскивай игроков прямо на поле — стройй тактику как хочешь
          </p>
        </div>

        <div className="flex justify-center gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
            <span className="text-gray-300 font-space-mono">Твоя команда</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white" />
            <span className="text-gray-300 font-space-mono">Соперник</span>
          </div>
        </div>

        <div
          ref={fieldRef}
          className="relative w-full select-none"
          style={{ aspectRatio: "68/105", maxHeight: "75vh", margin: "0 auto" }}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchMove={handleTouchMove}
          onTouchEnd={stopDrag}
        >
          {/* Field SVG */}
          <svg
            viewBox="0 0 680 1050"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Grass */}
            <rect width="680" height="1050" fill="#2d5a1b" />
            {/* Stripes */}
            {Array.from({ length: 10 }).map((_, i) => (
              <rect
                key={i}
                x="0"
                y={i * 105}
                width="680"
                height="105"
                fill={i % 2 === 0 ? "#2d5a1b" : "#326620"}
              />
            ))}
            {/* Border */}
            <rect x="40" y="40" width="600" height="970" fill="none" stroke="white" strokeWidth="4" />
            {/* Centre line */}
            <line x1="40" y1="525" x2="640" y2="525" stroke="white" strokeWidth="4" />
            {/* Centre circle */}
            <circle cx="340" cy="525" r="91" fill="none" stroke="white" strokeWidth="4" />
            <circle cx="340" cy="525" r="6" fill="white" />
            {/* Top penalty area */}
            <rect x="170" y="40" width="340" height="165" fill="none" stroke="white" strokeWidth="4" />
            {/* Top goal area */}
            <rect x="255" y="40" width="170" height="55" fill="none" stroke="white" strokeWidth="4" />
            {/* Top penalty spot */}
            <circle cx="340" cy="151" r="5" fill="white" />
            {/* Top penalty arc */}
            <path d="M 255 205 A 91 91 0 0 1 425 205" fill="none" stroke="white" strokeWidth="4" />
            {/* Top goal */}
            <rect x="290" y="15" width="100" height="30" fill="none" stroke="white" strokeWidth="4" />
            {/* Bottom penalty area */}
            <rect x="170" y="845" width="340" height="165" fill="none" stroke="white" strokeWidth="4" />
            {/* Bottom goal area */}
            <rect x="255" y="955" width="170" height="55" fill="none" stroke="white" strokeWidth="4" />
            {/* Bottom penalty spot */}
            <circle cx="340" cy="899" r="5" fill="white" />
            {/* Bottom penalty arc */}
            <path d="M 255 845 A 91 91 0 0 0 425 845" fill="none" stroke="white" strokeWidth="4" />
            {/* Bottom goal */}
            <rect x="290" y="1005" width="100" height="30" fill="none" stroke="white" strokeWidth="4" />
            {/* Corner arcs */}
            <path d="M 40 60 A 20 20 0 0 1 60 40" fill="none" stroke="white" strokeWidth="4" />
            <path d="M 620 40 A 20 20 0 0 1 640 60" fill="none" stroke="white" strokeWidth="4" />
            <path d="M 40 990 A 20 20 0 0 0 60 1010" fill="none" stroke="white" strokeWidth="4" />
            <path d="M 640 990 A 20 20 0 0 1 620 1010" fill="none" stroke="white" strokeWidth="4" />
          </svg>

          {/* Players */}
          {players.map((player) => (
            <div
              key={player.id}
              className="absolute flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{
                left: `${player.x}%`,
                top: `${player.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: dragging === player.id ? 50 : 10,
                touchAction: "none",
              }}
              onMouseDown={() => handleMouseDown(player.id)}
              onTouchStart={() => handleMouseDown(player.id)}
            >
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold shadow-lg transition-transform ${
                  dragging === player.id ? "scale-125" : "hover:scale-110"
                } ${player.team === "home" ? "bg-red-500" : "bg-blue-600"}`}
                style={{ fontSize: "clamp(9px, 1.4vw, 13px)" }}
              >
                {player.number}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={reset}
            className="font-orbitron text-sm text-red-400 hover:text-red-300 border border-red-500/40 hover:border-red-400 px-6 py-2 rounded transition-colors duration-200"
          >
            Сбросить расстановку
          </button>
        </div>
      </div>
    </section>
  )
}
