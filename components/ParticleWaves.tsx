'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function ParticleWaves() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setClearColor(0x000000, 0) // Ensure transparency
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    const particleCount = 5000
    const particles = new THREE.BufferGeometry()
    const posArray = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: new THREE.Color(0x3a86ff),
    })

    const particleMesh = new THREE.Points(particles, material)
    scene.add(particleMesh)

    camera.position.z = 2

    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      particleMesh.rotation.y = elapsedTime * 0.1
      particleMesh.rotation.x = elapsedTime * 0.15

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const x = particles.attributes.position.array[i3]
        particles.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x) * 0.1
      }

      particles.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  // Add z-[-1] so it stays behind all other elements
  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[-1]" />
}
