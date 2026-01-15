'use client'

export function AnimatedAvatar() {
  return (
    <div className="relative group w-[300px] h-[300px] md:w-[450px] md:h-[450px] flex items-center justify-center">
      {/* Background Shadow Effect on Hover */}
      <div className="absolute inset-0 bg-black/5 rounded-full scale-0 group-hover:scale-100 transition-all duration-500 ease-out -z-10" />
      
      <svg viewBox="0 0 400 400" className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
            <feOffset dx="0" dy="5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Static Background Circle */}
        <circle
          cx="200" cy="200" r="180"
          fill="#f8f8f8"
          className="transition-colors duration-500 group-hover:fill-[#f0f0f0]"
        />

        {/* The Face/Avatar */}
        <g filter="url(#shadow)">
          {/* Base Head */}
          <rect x="140" y="140" width="120" height="140" rx="20" fill="#222" />
          {/* Eyes */}
          <circle cx="170" cy="190" r="10" fill="white" />
          <circle cx="230" cy="190" r="10" fill="white" />

          {/* Smile */}
          <path d="M170 240 Q200 260 230 240" stroke="white" strokeWidth="5" fill="none" />
        </g>
      </svg>
    </div>
  )
}
