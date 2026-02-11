import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

// Utility: map lat/lng to SVG coords inside a given bbox and viewBox size
function latLngToSvgXY(lat, lng, bbox, width = 100, height = 100) {
  const [minLng, minLat, maxLng, maxLat] = bbox;
  const x = ((lng - minLng) / (maxLng - minLng || 1)) * width;
  const y = (1 - (lat - minLat) / (maxLat - minLat || 1)) * height;
  return { x, y };
}

export default function SafeHeatmap({ mapRef, bbox: propBbox, days = 90, tileSizeMeters }) {
  const [data, setData] = useState([]);
  const [zoom, setZoom] = useState(13);
  const layerRef = useRef(null);

  useEffect(() => {
    let bbox = propBbox;
    if (!bbox && mapRef && mapRef.current && mapRef.current.getBounds) {
      const b = mapRef.current.getBounds();
      if (b) {
        const ne = b.getNorthEast();
        const sw = b.getSouthWest();
        bbox = [sw.lng(), sw.lat(), ne.lng(), ne.lat()];
      }
    }
    if (!bbox) return;

    const params = { bbox: bbox.join(','), days };
    if (tileSizeMeters) params.tileSizeMeters = tileSizeMeters;

    axios.get(`${API_URL}/reports/heatmap`, { params })
      .then((r) => setData(r.data.items || []))
      .catch((err) => {
        console.warn('Failed to fetch heatmap', err);
      });
  }, [mapRef, propBbox, days, tileSizeMeters]);

  // If Google Maps visualization is available and mapRef provided, render native heatmap layer
  useEffect(() => {
    if (!mapRef || !mapRef.current || !data || data.length === 0) return;
    const map = mapRef.current;
    // keep local zoom state in sync so SVG fallback and legend can scale
    try {
      const z = map.getZoom ? map.getZoom() : 13;
      setZoom(z);
    } catch (e) {}
    if (window.google && window.google.maps && window.google.maps.visualization) {
      // clear existing layers if any
      if (layerRef.current) {
        if (layerRef.current.danger) layerRef.current.danger.setMap(null);
        if (layerRef.current.safe) layerRef.current.safe.setMap(null);
      }

      // Danger layer (red) with weighted intensities
      const dangerLocations = new window.google.maps.MVCArray(
        data
          .filter(d => d.dangerWeight > 0)
          .map(d => ({ location: new window.google.maps.LatLng(d.centroid.lat, d.centroid.lng), weight: Math.max(0.1, d.dangerWeight * 10) }))
      );
  // radius scales a bit with zoom for better visual density
  const baseDangerRadius = Math.max(20, Math.min(60, (map.getZoom ? map.getZoom() : 13) * 3));
  const danger = new window.google.maps.visualization.HeatmapLayer({ data: dangerLocations, dissipating: true, radius: baseDangerRadius });
      danger.set('gradient', [
        'rgba(255,255,255,0)',
        'rgba(255,235,205,0.6)',
        'rgba(255,200,140,0.7)',
        'rgba(249,115,22,0.8)',
        'rgba(220,50,30,0.9)'
      ]);

      // Safe layer (green) with weighted intensities
      const safeLocations = new window.google.maps.MVCArray(
        data
          .filter(d => d.safeWeight > 0)
          .map(d => ({ location: new window.google.maps.LatLng(d.centroid.lat, d.centroid.lng), weight: Math.max(0.05, d.safeWeight * 8) }))
      );
  const baseSafeRadius = Math.max(12, Math.min(48, (map.getZoom ? map.getZoom() : 13) * 2.2));
  const safe = new window.google.maps.visualization.HeatmapLayer({ data: safeLocations, dissipating: true, radius: baseSafeRadius });
      safe.set('gradient', [
        'rgba(255,255,255,0)',
        'rgba(212,255,230,0.5)',
        'rgba(144,238,144,0.6)',
        'rgba(34,197,94,0.8)',
      ]);

      danger.setMap(map);
      safe.setMap(map);
      layerRef.current = { danger, safe };

      // update radii on zoom change
      const zoomListener = map.addListener && map.addListener('zoom_changed', () => {
        const z = map.getZoom();
        setZoom(z);
        if (layerRef.current?.danger) layerRef.current.danger.set('radius', Math.max(20, Math.min(60, z * 3)));
        if (layerRef.current?.safe) layerRef.current.safe.set('radius', Math.max(12, Math.min(48, z * 2.2)));
      });

      return () => {
        if (layerRef.current) {
          if (layerRef.current.danger) layerRef.current.danger.setMap(null);
          if (layerRef.current.safe) layerRef.current.safe.setMap(null);
        }
        layerRef.current = null;
        if (zoomListener && zoomListener.remove) zoomListener.remove();
        else if (zoomListener) window.google.maps.event.removeListener(zoomListener);
      };
    }
  }, [mapRef, data]);

  // SVG fallback rendering
  if (!(window.google && window.google.maps && window.google.maps.visualization) || !mapRef || !mapRef.current) {
    // compute bbox from data if propBbox not given
    let bbox = propBbox;
    if (!bbox && data.length > 0) {
      const lons = data.map(d => d.centroid.lng);
      const lats = data.map(d => d.centroid.lat);
      const minLng = Math.min(...lons); const maxLng = Math.max(...lons);
      const minLat = Math.min(...lats); const maxLat = Math.max(...lats);
      bbox = [minLng, minLat, maxLng, maxLat];
    }

    const viewW = 600, viewH = 360;
    // Make the overlay cover the entire map container (inset:0) so heatmap covers complete map
    // Compute a zoomScale used to adjust circle radii/opacity in the SVG fallback
    const zoomScale = Math.pow(1.15, (typeof mapRef?.current?.getZoom === 'function' ? (mapRef.current.getZoom() || zoom) : zoom) - 13);
    return (
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        <svg viewBox={`0 0 ${viewW} ${viewH}`} preserveAspectRatio="none" className="w-full h-full" style={{ background: 'transparent', display: 'block' }}>
          {/* transparent background so underlying map remains visible */}
            {bbox && data.map((p, i) => {
            const { x, y } = latLngToSvgXY(p.centroid.lat, p.centroid.lng, bbox, viewW, viewH);
            // scale radii with zoomScale for better visibility at different zooms
            const rDanger = (6 + (p.dangerWeight || 0) * 30) * zoomScale;
            const rSafe = (6 + (p.safeWeight || 0) * 30) * zoomScale;
            const opacityDanger = Math.min(0.9, 0.18 + (p.dangerWeight || 0) * 0.85);
            const opacitySafe = Math.min(0.85, 0.12 + (p.safeWeight || 0) * 0.7);
            return (
              <g key={i}>
                {p.safeWeight > 0 && <circle cx={x} cy={y} r={rSafe} fill="rgba(34,197,94,0.9)" opacity={opacitySafe} />}
                {p.dangerWeight > 0 && <circle cx={x} cy={y} r={rDanger} fill="rgba(249,115,22,0.95)" opacity={opacityDanger} />}
              </g>
            );
          })}
        </svg>
        {/* Legend overlay - small fixed panel in top-right corner of the map */}
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.92)', padding: '6px 8px', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.15)', pointerEvents: 'auto', fontSize: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Safety Heatmap</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 12, background: 'linear-gradient(90deg, rgba(255,235,205,0.6), rgba(220,50,30,0.9))', borderRadius: 3 }} />
            <div>Danger (more incidents)</div>
          </div>
          <div style={{ height: 6 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 12, background: 'linear-gradient(90deg, rgba(212,255,230,0.6), rgba(34,197,94,0.9))', borderRadius: 3 }} />
            <div>Safe (positive reports)</div>
          </div>
        </div>
      </div>
    );
  }

  return null; // Google native layer rendered directly onto map
}
