import { Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { Winery } from '../types/winery'

// Leaflet 기본 마커 아이콘 경로 보정 (Vite에서 기본 아이콘 깨짐 방지)
import L from 'leaflet'
const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

interface WineMapProps {
  wineries: Winery[];
  height: number;
  seeDetailLabel: string;
  lang?: 'ko' | 'en' | 'fr' | 'it' | 'ja' | 'zh'; 
}

export default function WineMap({ wineries, height, seeDetailLabel, lang }: WineMapProps) {
  const center: [number, number] =
    wineries.length > 0
      ? [wineries[0].lat, wineries[0].lng]
      : [46.5, 2.5]
  const zoom = wineries.length <= 1 ? 5 : 4

  return (
    <div
      style={{
        height,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {wineries.map((w) => (
          <Marker key={w.id} position={[w.lat, w.lng]} icon={markerIcon}>
            <Popup>
              <div style={{ minWidth: 160 }}>
                <strong>{lang === 'en' ? w.nameEn : w.nameKo}</strong>
                <br />
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  {w.region}
                </span>
                <br />
                <Link
                  to={`/wineries/${w.slug}`}
                  style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}
                >
                  {seeDetailLabel} →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
