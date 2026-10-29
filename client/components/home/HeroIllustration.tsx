// Custom-made banner art: a sunny tropical coast, drawn as pure SVG.
// No external image, so it loads instantly and stays sharp at any size.
export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 480"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      role="img"
      aria-label="Illustration of a sunny tropical coast with mountains, a sailboat, a hot air balloon and an airplane"
    >
      <defs>
        <linearGradient id="hi-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6fdcec" />
          <stop offset=".55" stopColor="#fff0c4" />
          <stop offset="1" stopColor="#ffbf86" />
        </linearGradient>
        <radialGradient id="hi-sun">
          <stop offset="0" stopColor="#fffbe0" />
          <stop offset=".6" stopColor="#ffd56b" />
          <stop offset="1" stopColor="#ff9f4a" />
        </radialGradient>
        <linearGradient id="hi-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fd1dd" />
          <stop offset="1" stopColor="#0b8aa0" />
        </linearGradient>
        <linearGradient id="hi-mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3fb0c0" />
          <stop offset="1" stopColor="#2a8da4" />
        </linearGradient>
        <g id="hi-cloud">
          <ellipse cx="40" cy="28" rx="42" ry="13" />
          <ellipse cx="30" cy="17" rx="20" ry="14" />
          <ellipse cx="58" cy="15" rx="19" ry="13" />
        </g>
        <path id="hi-leaf" d="M0 0 Q36 -36 88 -4 Q44 -14 0 0Z" />
        <g id="hi-palm">
          <path
            d="M0 0 Q20 -52 20 -100"
            fill="none"
            stroke="#9a6a35"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <g transform="translate(20 -100)" fill="#19a67f">
            {[-50, -15, 25, 155, 190, 225].map((a) => (
              <use key={a} href="#hi-leaf" transform={`rotate(${a})`} />
            ))}
            <circle cx="-4" cy="4" r="5" fill="#8a5a2b" />
            <circle cx="6" cy="5" r="5" fill="#8a5a2b" />
          </g>
        </g>
      </defs>

      {/* Sky + sun */}
      <rect width="600" height="480" fill="url(#hi-sky)" />
      <circle cx="430" cy="175" r="150" fill="#fff" opacity=".18" />
      <circle cx="430" cy="175" r="110" fill="#fff" opacity=".25" />
      <circle cx="430" cy="175" r="70" fill="url(#hi-sun)" />

      {/* Clouds */}
      <g fill="#fff" opacity=".95">
        <use href="#hi-cloud" transform="translate(30 60)" />
        <use
          href="#hi-cloud"
          transform="translate(300 40) scale(.6)"
          opacity=".8"
        />
        <use
          href="#hi-cloud"
          transform="translate(470 250) scale(.7)"
          opacity=".85"
        />
        <use
          href="#hi-cloud"
          transform="translate(250 210) scale(.5)"
          opacity=".7"
        />
      </g>

      {/* Airplane + dotted trail */}
      <path
        d="M230 150 C320 160 400 112 500 80"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
      <g transform="translate(512 74) rotate(-20) scale(1.25)">
        <path d="M-24 0 L-32 -10 L-25 -10 L-16 0Z" fill="#ff6b4a" />
        <path d="M-4 0 L-16 -19 L-8 -19 L10 0Z" fill="#ff8f73" />
        <path d="M-4 0 L-16 19 L-8 19 L10 0Z" fill="#ff8f73" />
        <ellipse cx="0" cy="0" rx="26" ry="5.5" fill="#ff6b4a" />
        <ellipse cx="14" cy="-1.5" rx="6" ry="2" fill="#fff" opacity=".8" />
      </g>

      {/* Birds */}
      <g fill="none" stroke="#1b5e6b" strokeWidth="2.5" strokeLinecap="round">
        <path d="M222 118 q7 -9 14 0 q7 -9 14 0" />
        <path d="M262 100 q5 -7 10 0 q5 -7 10 0" />
        <path d="M196 98 q4 -6 8 0 q4 -6 8 0" />
      </g>

      {/* Mountains */}
      <path
        d="M0 310 L80 232 L140 280 L220 200 L310 296 L384 240 L470 306 L600 246 V380 H0Z"
        fill="#8fd3df"
        opacity=".85"
      />
      <path
        d="M-10 380 L120 232 L236 350 L306 292 L430 380Z"
        fill="url(#hi-mtn)"
      />
      <path
        d="M120 232 L96 262 L110 255 L121 268 L133 255 L148 262Z"
        fill="#fff"
      />
      <path d="M330 380 L476 252 L610 350 V390 H330Z" fill="#2a8da4" />
      <path
        d="M476 252 L456 276 L468 270 L477 281 L487 270 L498 276Z"
        fill="#fff"
      />

      {/* Sea */}
      <rect y="342" width="600" height="140" fill="url(#hi-sea)" />
      <g fill="#fff3b0" opacity=".75">
        <rect x="388" y="350" width="84" height="6" rx="3" />
        <rect x="398" y="364" width="64" height="5" rx="2.5" />
        <rect x="380" y="377" width="100" height="5" rx="2.5" />
        <rect x="404" y="391" width="52" height="4" rx="2" />
        <rect x="390" y="406" width="80" height="4" rx="2" />
      </g>
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity=".55"
      >
        <path d="M300 360 q10 -6 20 0 t20 0" />
        <path d="M500 420 q10 -6 20 0 t20 0" />
        <path d="M330 440 q10 -6 20 0 t20 0" />
        <path d="M520 370 q8 -5 16 0 t16 0" />
      </g>

      {/* Sailboat */}
      <g transform="translate(0 6)">
        <path d="M298 400 H372 L356 420 H314Z" fill="#ff6b4a" />
        <rect x="333" y="342" width="3.5" height="58" fill="#6b4a2b" />
        <path d="M338 396 V346 L374 396Z" fill="#fff" />
        <path d="M331 396 V358 L304 396Z" fill="#ffe3a3" />
        <path d="M336 342 l14 5 -14 5Z" fill="#ffd166" />
      </g>

      {/* Hot-air balloon */}
      <g transform="translate(150 180)">
        <path
          d="M-22 40 L-9 70 M22 40 L9 70"
          stroke="#8a5a2b"
          strokeWidth="2"
        />
        <ellipse cx="0" cy="0" rx="40" ry="46" fill="#ff6b4a" />
        <ellipse cx="0" cy="0" rx="25" ry="46" fill="#ffd166" />
        <ellipse cx="0" cy="0" rx="10" ry="46" fill="#fff" />
        <path
          d="M-40 6 Q0 26 40 6"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          opacity=".6"
        />
        <rect x="-11" y="68" width="22" height="15" rx="3" fill="#8a5a2b" />
      </g>

      {/* Beach + palms */}
      <path d="M0 404 Q120 362 262 414 Q304 432 336 482 H0Z" fill="#ffe7ab" />
      <path d="M0 444 Q100 418 224 458 L258 482 H0Z" fill="#ffd47a" />
      <use href="#hi-palm" transform="translate(92 414)" />
      <use href="#hi-palm" transform="translate(212 446) scale(-.66 .66)" />
      <path
        d="M336 482 Q400 458 470 472 T600 462 V482Z"
        fill="#fff"
        opacity=".35"
      />

      {/* Location pin */}
      <ellipse cx="300" cy="300" rx="14" ry="4" fill="#0b4b52" opacity=".25" />
      <g transform="translate(300 298)">
        <path d="M-14 -36 L0 0 L14 -36Z" fill="#ff6b4a" />
        <circle
          cx="0"
          cy="-46"
          r="19"
          fill="#ff6b4a"
          stroke="#fff"
          strokeWidth="3"
        />
        <circle cx="0" cy="-46" r="7" fill="#fff" />
      </g>

      {/* Sparkles */}
      <g fill="#fff">
        {[
          [60, 190, 1],
          [350, 130, 1.3],
          [560, 170, 1],
          [270, 330, 0.8],
          [545, 330, 1.1],
        ].map(([x, y, s]) => (
          <path
            key={`${x}-${y}`}
            transform={`translate(${x} ${y}) scale(${s})`}
            d="M0 -9 Q1.5 -1.5 9 0 Q1.5 1.5 0 9 Q-1.5 1.5 -9 0 Q-1.5 -1.5 0 -9Z"
          />
        ))}
      </g>
    </svg>
  );
}
