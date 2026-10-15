export default function CarScene() {
  return (
    <div className="car-scene" aria-label="Futuristic sports car illustration">
      <div className="scene-glow" />
      <div className="scene-grid" />

      <svg
        className="scene-orbit orbit-a"
        viewBox="0 0 800 400"
        aria-hidden="true"
      >
        <ellipse
          cx="400"
          cy="200"
          rx="350"
          ry="110"
          fill="none"
          stroke="#b5f36b"
          strokeOpacity=".3"
          strokeWidth="1"
        />
        <ellipse
          cx="400"
          cy="200"
          rx="300"
          ry="80"
          fill="none"
          stroke="#b5f36b"
          strokeOpacity=".2"
          strokeDasharray="4 10"
        />
      </svg>

      <svg
        className="scene-orbit orbit-b"
        viewBox="0 0 800 400"
        aria-hidden="true"
      >
        <ellipse
          cx="400"
          cy="200"
          rx="260"
          ry="145"
          fill="none"
          stroke="#e8efdf"
          strokeOpacity=".15"
          strokeWidth="1"
        />
      </svg>

      <div className="car-motion">
        <svg
          className="car-svg"
          viewBox="0 0 900 440"
          role="img"
          aria-label="Silver futuristic sports car"
        >
          <defs>
            <linearGradient id="paint" x1="0" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="32%" stopColor="#c9d1d9" />
              <stop offset="70%" stopColor="#778393" />
              <stop offset="100%" stopColor="#3b4654" />
            </linearGradient>

            <linearGradient id="window" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#526779" />
              <stop offset="100%" stopColor="#101821" />
            </linearGradient>

            <linearGradient id="roadGlow">
              <stop offset="0%" stopColor="#b5f36b" stopOpacity="0" />
              <stop offset="50%" stopColor="#b5f36b" stopOpacity=".8" />
              <stop offset="100%" stopColor="#b5f36b" stopOpacity="0" />
            </linearGradient>

            <filter id="carShadow" x="-30%" y="-30%" width="160%" height="180%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
          </defs>

          <ellipse
            cx="450"
            cy="355"
            rx="330"
            ry="24"
            fill="#000"
            opacity=".7"
            filter="url(#carShadow)"
          />

          <ellipse
            cx="450"
            cy="361"
            rx="300"
            ry="4"
            fill="url(#roadGlow)"
          />

          <g className="car-body">
            <path
              d="M104 284 L143 250 L263 225 L342 166
                 Q370 143 416 148 L532 164
                 Q579 173 620 216 L737 248
                 Q775 259 789 288 L773 313
                 L686 326 L190 326 L122 310 Z"
              fill="url(#paint)"
              stroke="#edf2f7"
              strokeWidth="2"
            />

            <path
              d="M270 226 L354 170 Q376 153 414 160
                 L462 168 L429 225 Z"
              fill="url(#window)"
              stroke="#a4b4c3"
              strokeWidth="2"
            />

            <path
              d="M478 171 L530 179 Q573 187 608 221
                 L450 221 Z"
              fill="url(#window)"
              stroke="#a4b4c3"
              strokeWidth="2"
            />

            <path
              d="M144 266 L256 242 L239 270 L135 289 Z"
              fill="#b5f36b"
            />

            <path
              d="M637 244 L746 268 L756 284 L650 270 Z"
              fill="#f5f9ff"
            />

            <path
              d="M153 294 L758 294"
              stroke="#1b2531"
              strokeWidth="5"
            />

            <path
              d="M304 236 L588 236"
              stroke="#5a6777"
              strokeWidth="2"
            />

            <path
              d="M353 170 L343 225 M470 168 L448 225"
              stroke="#e6edf4"
              strokeWidth="2"
              opacity=".6"
            />
          </g>

          {[260, 641].map((x) => (
            <g className="car-wheel" key={x}>
              <circle cx={x} cy="315" r="58" fill="#10151b" />
              <circle
                cx={x}
                cy="315"
                r="44"
                fill="#485565"
                stroke="#d2dbe5"
                strokeWidth="2"
              />
              <circle cx={x} cy="315" r="32" fill="#19232f" />

              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <path
                  key={angle}
                  d="M0 -8 L0 -29"
                  stroke="#b8c4d0"
                  strokeWidth="5"
                  strokeLinecap="round"
                  transform={`translate(${x} 315) rotate(${angle})`}
                />
              ))}

              <circle cx={x} cy="315" r="9" fill="#e8eef4" />
            </g>
          ))}
        </svg>
      </div>

      <div className="scene-label scene-label-left">
        <span>VEHICLE / 001</span>
        <strong>ENGINEERED TO MOVE</strong>
      </div>

      <div className="scene-label scene-label-right">
        <span>SCROLL PROGRESS</span>
        <strong className="scroll-percent">00%</strong>
      </div>

      <div className="scene-bottom-label">
        MOTION IS A LANGUAGE. DESIGN IS THE VOICE.
      </div>
    </div>
  );
}