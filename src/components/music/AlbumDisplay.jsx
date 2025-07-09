import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default function AlbumDisplay({ album, isMobile }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const controlsRef = useRef(null)
  const albumMeshRef = useRef(null)

  // Function to get current theme background color
  const getThemeBackgroundColor = () => {
    const rootStyle = getComputedStyle(document.documentElement)
    return rootStyle.getPropertyValue('--c-bg').trim()
  }

  // Function to get responsive padding
  const getResponsivePadding = () => {
    return window.innerWidth >= 768 ? 28 : window.innerWidth >= 640 ? 20 : 12
  }

  useEffect(() => {
    if (!containerRef.current || !album) return

    // Initialize scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(getThemeBackgroundColor())
    sceneRef.current = scene

    // Create a MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      // Only update if the class attribute actually changed
      const classChange = mutations.some(mutation => 
        mutation.type === 'attributes' && 
        mutation.attributeName === 'class' &&
        mutation.target.classList.contains('dark') !== mutation.oldValue?.includes('dark')
      )
      
      if (classChange && sceneRef.current) {
        sceneRef.current.background = new THREE.Color(getThemeBackgroundColor())
      }
    })

    // Start observing the html element for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true,
    })

    // Initialize camera with responsive viewSize
    const viewSize = isMobile ? 0.5 : 0.6 // Slightly smaller on mobile
    const padding = getResponsivePadding()
    const containerWidth = Math.min(
      (window.innerWidth - padding * 4) / 2,
      window.innerHeight - 200
    )

    // Force container to be perfectly square and fill its parent
    containerRef.current.style.width = '100%'
    containerRef.current.style.height = '100%'
    containerRef.current.style.aspectRatio = '1'
    containerRef.current.style.position = 'relative'
    containerRef.current.style.margin = '0'

    // Get the actual container size after styles are applied
    const rect = containerRef.current.getBoundingClientRect()
    const size = Math.min(rect.width, rect.height)

    // Set up the renderer to match container size exactly
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })

    // Set pixel ratio and size
    const pixelRatio = window.devicePixelRatio
    renderer.setPixelRatio(pixelRatio)

    // Set physical renderer size (in pixels)
    renderer.setSize(size, size, false)

    // Set renderer element size in CSS pixels
    renderer.domElement.style.width = `${size}px`
    renderer.domElement.style.height = `${size}px`

    // Center the renderer in the container
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.left = '50%'
    renderer.domElement.style.top = '50%'
    renderer.domElement.style.transform = 'translate(-50%, -50%)'

    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Use orthographic camera with square frustum
    const camera = new THREE.OrthographicCamera(
      -viewSize,
      viewSize,
      viewSize,
      -viewSize,
      0.1,
      1000
    )
    // Position camera closer for larger appearance
    camera.position.set(0, 0, 3)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Initialize controls but disable auto-rotation
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.enabled = false // Disable all orbital controls
    controls.target.set(0, 0, 0)
    controlsRef.current = controls

    // Add mouse interaction for tilt effect
    let isHovering = false
    const maxTiltAngle = Math.PI / 12 // 15 degrees max tilt

    const handleMouseMove = (event) => {
      if (!albumMeshRef.current || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      // Calculate distance from center
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = event.clientX - centerX
      const distY = event.clientY - centerY

      // Calculate distance from center as a percentage of the radius
      const radius = rect.width / 2
      const distance = Math.sqrt(distX * distX + distY * distY) / radius

      // Calculate tilt based on distance from center
      const tiltAmount = Math.min(distance * maxTiltAngle, maxTiltAngle)

      // Calculate angle from center
      const angle = Math.atan2(distY, distX)

      // Apply tilt towards the screen based on distance from center
      const targetX = Math.sin(angle) * tiltAmount
      const targetZ = -Math.cos(angle) * tiltAmount

      // Apply smooth transition to the tilt
      albumMeshRef.current.rotation.x +=
        (targetX - albumMeshRef.current.rotation.x) * 0.1
      albumMeshRef.current.rotation.z +=
        (targetZ - albumMeshRef.current.rotation.z) * 0.1
    }

    const handleMouseEnter = () => {
      isHovering = true
    }

    const handleMouseLeave = () => {
      isHovering = false
      // Smoothly reset rotation to 0
      if (albumMeshRef.current) {
        const resetRotation = () => {
          if (!isHovering && albumMeshRef.current) {
            albumMeshRef.current.rotation.x *= 0.9
            albumMeshRef.current.rotation.z *= 0.9
            if (
              Math.abs(albumMeshRef.current.rotation.x) > 0.001 ||
              Math.abs(albumMeshRef.current.rotation.z) > 0.001
            ) {
              requestAnimationFrame(resetRotation)
            } else {
              albumMeshRef.current.rotation.x = 0
              albumMeshRef.current.rotation.z = 0
            }
          }
        }
        resetRotation()
      }
    }

    containerRef.current.addEventListener('mousemove', handleMouseMove)
    containerRef.current.addEventListener('mouseenter', handleMouseEnter)
    containerRef.current.addEventListener('mouseleave', handleMouseLeave)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(1, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.8)
    pointLight.position.set(-5, 3, 3)
    scene.add(pointLight)

    const fillLight = new THREE.PointLight(0xffffff, 0.5)
    fillLight.position.set(0, 0, 5)
    scene.add(fillLight)

    // Create geometry for album - use exact 1:1 proportions
    const albumGeometry = new THREE.BoxGeometry(1, 1, 0.02) // Very thin depth

    // Create album mesh with materials
    const materials = [
      new THREE.MeshPhongMaterial({
        // right
        color: 0xdddddd,
        shininess: 100,
        specular: new THREE.Color(0x888888),
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        // left
        color: 0xdddddd,
        shininess: 100,
        specular: new THREE.Color(0x888888),
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        // top
        color: 0xdddddd,
        shininess: 100,
        specular: new THREE.Color(0x888888),
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        // bottom
        color: 0xdddddd,
        shininess: 100,
        specular: new THREE.Color(0x888888),
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        // front
        color: 0x999999,
        shininess: 90,
        specular: new THREE.Color(0x888888),
        side: THREE.DoubleSide,
      }),
      new THREE.MeshPhongMaterial({
        // back
        color: 0x999999,
        shininess: 90,
        specular: new THREE.Color(0x888888),
        side: THREE.DoubleSide,
      }),
    ]

    const albumMesh = new THREE.Mesh(albumGeometry, materials)
    // Center the album in the scene
    albumMesh.position.set(0, 0, 0)
    // Use fixed scale of 1
    albumMesh.scale.set(1, 1, 1)

    scene.add(albumMesh)
    albumMeshRef.current = albumMesh

    // Load texture
    const img = new Image()
    img.crossOrigin = 'Anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 1024
      canvas.height = 1024

      // Draw white background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 1024, 1024)

      // Draw the album cover
      const size = 900
      const x = (1024 - size) / 2
      const y = (1024 - size) / 2
      ctx.drawImage(img, x, y, size, size)

      // Draw CD edge
      ctx.strokeStyle = '#dddddd'
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.arc(512, 512, 450, 0, Math.PI * 2)
      ctx.stroke()

      // Add metallic ring effect
      const ringGradient = ctx.createLinearGradient(62, 62, 962, 962)
      ringGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
      ringGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0)')
      ringGradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)')
      ctx.strokeStyle = ringGradient
      ctx.lineWidth = 10
      ctx.stroke()

      // Draw CD center
      const centerGradient = ctx.createRadialGradient(
        512,
        512,
        50,
        512,
        512,
        150
      )
      centerGradient.addColorStop(0, '#999')
      centerGradient.addColorStop(0.2, '#fff')
      centerGradient.addColorStop(0.4, '#888')
      centerGradient.addColorStop(0.6, '#eee')
      centerGradient.addColorStop(0.8, '#999')
      centerGradient.addColorStop(1, '#777')

      ctx.fillStyle = centerGradient
      ctx.beginPath()
      ctx.arc(512, 512, 150, 0, Math.PI * 2)
      ctx.fill()

      // Draw center hole
      ctx.fillStyle = '#000000'
      ctx.beginPath()
      ctx.arc(512, 512, 25, 0, Math.PI * 2)
      ctx.fill()

      // Create and apply texture
      const texture = new THREE.Texture(canvas)
      texture.anisotropy = 16
      texture.needsUpdate = true

      if (albumMeshRef.current) {
        const materialProps = {
          map: texture,
          shininess: 80,
          specular: new THREE.Color(0x666666),
          side: THREE.FrontSide,
        }

        // Apply to front face
        albumMesh.material = new THREE.MeshPhongMaterial(materialProps)

        // Apply to back face with cloned texture
        albumMesh.material = new THREE.MeshPhongMaterial({
          ...materialProps,
          map: texture.clone(),
        })
      }
    }

    const fullUrl = new URL(album.imageUrl, window.location.origin).href
    img.src = fullUrl

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    // Update resize handler for mobile
    function handleResize() {
      if (!containerRef.current || !renderer || !camera) return

      // Get the actual container size
      const rect = containerRef.current.getBoundingClientRect()
      const size = Math.min(rect.width, rect.height)

      // Update physical renderer size (in pixels)
      renderer.setSize(size, size, false)

      // Update CSS size
      renderer.domElement.style.width = `${size}px`
      renderer.domElement.style.height = `${size}px`

      // Update camera to maintain square view with mobile-aware viewSize
      const viewSize = isMobile ? 0.5 : 0.6
      camera.left = -viewSize
      camera.right = viewSize
      camera.top = viewSize
      camera.bottom = -viewSize
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      observer.disconnect() // Disconnect the observer
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
        containerRef.current.removeEventListener('mouseenter', handleMouseEnter)
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave)
        if (renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement)
        }
      }
      
      // Properly dispose of Three.js resources
      scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose()
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose())
          } else {
            child.material.dispose()
          }
        }
        if (child.texture) {
          child.texture.dispose()
        }
      })
      
      scene.clear()
      renderer.dispose()
    }
  }, [album, isMobile])

  if (!album) return null

  return (
    <div
      className="border-1 border-gray-200 dark:border-gray-800"
      style={{
        width: isMobile ? '100%' : '50%',
        height: isMobile ? 'auto' : '100%',
        minHeight: isMobile ? '40vh' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 3D Album Display */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: isMobile ? '40vh' : '100%',
          position: 'relative',
          aspectRatio: '1',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* Album Details */}
      <div
        className="border-t-1 border-t-gray-200 dark:border-t-gray-800"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: 'transparent',
          maxHeight: isMobile ? 'none' : '20%',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ marginBottom: '6px' }}>
          <h2
            style={{
              margin: '0 0 2px 0',
              fontSize: '14px',
              fontWeight: '400',
              color: 'var(--c-text)',
            }}
          >
            {album.songTitle}
          </h2>
          <h3
            style={{
              margin: '0 0 2px 0',
              fontSize: '12px',
              fontWeight: '400',
              color: 'var(--c-text-light)',
            }}
          >
            from "{album.albumName}"
          </h3>
          <h4
            style={{
              margin: 0,
              fontSize: '12px',
              fontWeight: '400',
              color: 'var(--c-text-light)',
            }}
          >
            {album.artist}
          </h4>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            lineHeight: '1.4',
            color: 'var(--c-text-light)',
          }}
        >
          {album.description}
        </p>
      </div>
    </div>
  )
}
