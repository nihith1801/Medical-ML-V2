'use client'

import React, { useState, useRef, useCallback, useImperativeHandle } from 'react'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'

interface PositionAwareButtonProps extends React.ComponentProps<typeof Button> {
  hoverColor?: string
  textColor?: string
}

export const PositionAwareButton = React.forwardRef<HTMLButtonElement, PositionAwareButtonProps>(
  (
    {
      children,
      className = '',
      hoverColor = 'hsl(var(--primary))',
      textColor = 'hsl(var(--primary-foreground))',
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)
    const internalRef = useRef<HTMLButtonElement>(null)
    const spanRef = useRef<HTMLSpanElement>(null)

    // Expose the internal ref to parent via useImperativeHandle
    useImperativeHandle(ref, () => internalRef.current as HTMLButtonElement)

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true)
      updateSpanPosition(e)
    }, [])

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isHovered) {
          updateSpanPosition(e)
        }
      },
      [isHovered]
    )

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false)
    }, [])

    const updateSpanPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (internalRef.current && spanRef.current) {
        const rect = internalRef.current.getBoundingClientRect()
        const relX = e.clientX - rect.left
        const relY = e.clientY - rect.top
        gsap.to(spanRef.current, {
          top: relY,
          left: relX,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    React.useEffect(() => {
      if (spanRef.current) {
        gsap.to(spanRef.current, {
          width: isHovered ? '225%' : '0%',
          height: isHovered ? '562.5px' : '0px',
          opacity: isHovered ? 1 : 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }, [isHovered])

    return (
      <Button
        ref={internalRef}
        className={`relative overflow-hidden transition-colors duration-300 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <span className="relative z-10" style={{ color: isHovered ? textColor : 'inherit' }}>
          {children}
        </span>
        <span
          ref={spanRef}
          className="absolute z-0 rounded-full pointer-events-none"
          style={{
            backgroundColor: hoverColor,
            transform: 'translate(-50%, -50%)',
          }}
        />
      </Button>
    )
  }
)

PositionAwareButton.displayName = 'PositionAwareButton'
