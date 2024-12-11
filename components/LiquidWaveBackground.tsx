'use client'

import React from 'react'
import { useTheme } from 'next-themes'

export const LiquidWaveBackground: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="wave-animation">
          <use
            xlinkHref="#wave-path"
            x="48"
            y="0"
            fill={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
          />
          <use
            xlinkHref="#wave-path"
            x="48"
            y="3"
            fill={theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}
          />
          <use
            xlinkHref="#wave-path"
            x="48"
            y="5"
            fill={theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)'}
          />
        </g>
      </svg>
      <style jsx>{`
        @keyframes wave-animation {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-48px);
          }
        }
        .wave-animation {
          animation: wave-animation 7s linear infinite;
        }
      `}</style>
    </div>
  )
}

