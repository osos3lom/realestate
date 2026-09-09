"use client"

import { useEffect, useRef, useState } from "react"

// Sample property markers for the map
const propertyMarkers = [
  { id: 1, lng: 46.6753, lat: 24.7136, title: "فيلا فاخرة", price: "2,500,000 ر.س" },
  { id: 2, lng: 46.702, lat: 24.7285, title: "شقة حديثة", price: "850,000 ر.س" },
  { id: 3, lng: 46.65, lat: 24.69, title: "دوبلكس", price: "1,800,000 ر.س" },
  { id: 4, lng: 46.72, lat: 24.7, title: "استوديو", price: "450,000 ر.س" },
  { id: 5, lng: 46.66, lat: 24.74, title: "شقة عائلية", price: "1,200,000 ر.س" },
]

function loadMapLibreGL(): Promise<typeof window.maplibregl> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.maplibregl) {
      resolve(window.maplibregl)
      return
    }

    // Load CSS
    if (!document.querySelector('link[href*="maplibre-gl"]')) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css"
      document.head.appendChild(link)
    }

    // Load JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js"
    script.async = true
    script.onload = () => {
      if (window.maplibregl) {
        resolve(window.maplibregl)
      } else {
        reject(new Error("MapLibre GL JS failed to load"))
      }
    }
    script.onerror = () => reject(new Error("Failed to load MapLibre GL JS script"))
    document.head.appendChild(script)
  })
}

// Extend window type for maplibregl
declare global {
  interface Window {
    maplibregl: any
  }
}

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    const initMap = async () => {
      try {
        const maplibregl = await loadMapLibreGL()

        map.current = new maplibregl.Map({
          container: mapContainer.current!,
          style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
          center: [46.6753, 24.7136],
          zoom: 11,
          attributionControl: false,
        })

        map.current.addControl(new maplibregl.NavigationControl(), "bottom-left")
        map.current.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-right")

        map.current.on("load", () => {
          setIsLoading(false)

          propertyMarkers.forEach((property) => {
            const el = document.createElement("div")
            el.className = "property-marker"
            el.innerHTML = `
              <div class="marker-pin">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3" fill="#ffffff"></circle>
                </svg>
              </div>
            `

            const popup = new maplibregl.Popup({ offset: 25, closeButton: false }).setHTML(`
              <div style="text-align: right; font-family: 'Noto Sans Arabic', sans-serif; padding: 10px; background: #18181b; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);">
                <strong style="font-size: 14px; color: #f4f4f5; display: block; margin-bottom: 4px;">${property.title}</strong>
                <p style="margin: 0; color: #60a5fa; font-weight: 700; font-size: 13px;">${property.price}</p>
              </div>
            `)

            new maplibregl.Marker({ element: el })
              .setLngLat([property.lng, property.lat])
              .setPopup(popup)
              .addTo(map.current!)
          })
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load map")
        setIsLoading(false)
      }
    }

    initMap()

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  if (error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
        <p className="text-white">{error}</p>
      </div>
    )
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
      <style jsx global>{`
        .property-marker {
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .property-marker:hover {
          transform: scale(1.2);
        }
        .marker-pin {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        .maplibregl-popup-content {
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  )
}
