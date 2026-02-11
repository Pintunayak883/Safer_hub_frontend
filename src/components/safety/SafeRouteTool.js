import React, { useState } from "react";
import axios from "axios";
import {
  useJsApiLoader,
  GoogleMap,
} from "@react-google-maps/api";
import SafeHeatmap from './SafeHeatmap';
import { useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL || "/api";
const GM_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
const FORCE_SERVER = process.env.REACT_APP_FORCE_SERVER_DIRECTIONS === "1" || process.env.REACT_APP_FORCE_SERVER_DIRECTIONS === "true";

// decode polyline (Google encoded) to array of [lng,lat]
function decodePolyline(encoded) {
  if (!encoded) return [];
  let points = [];
  let index = 0,
    len = encoded.length;
  let lat = 0,
    lng = 0;
  while (index < len) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;
    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;
    points.push([lng / 1e5, lat / 1e5]);
  }
  return points;
}

const mapContainerStyle = { width: "100%", height: "320px" };
const defaultCenter = { lat: 26.9124, lng: 75.7873 };
const DEFAULT_START_COORD = "75.7873,26.9124";
const DEFAULT_END_COORD = "75.7970,26.9150";

// Named Jaipur POIs (should match seeded names)
const NAMED_POIS = [
  { name: "Jaipur Junction", coords: "75.7878,26.9196" },
  { name: "MI Road", coords: "75.7960,26.9190" },
  { name: "Badi Chaupar", coords: "75.8215,26.9235" },
  { name: "Sanganer", coords: "75.7879,26.8394" },
  { name: "C Scheme", coords: "75.8060,26.9193" },
  { name: "Rambagh Palace", coords: "75.7877,26.9050" },
  { name: "Vaishali Nagar", coords: "75.7436,26.9112" },
  { name: "Bapu Bazaar", coords: "75.8260,26.9239" },
  { name: "Tonk Phatak", coords: "75.8090,26.9128" },
  { name: "Station Road", coords: "75.7927,26.9179" },
];

export default function SafeRouteTool() {
  const [selectedStartPoi, setSelectedStartPoi] = useState("");
  const [selectedEndPoi, setSelectedEndPoi] = useState("");
  const [useDeviceLocation, setUseDeviceLocation] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // internal coords (not shown) - default roughly center of Jaipur
  const [startCoord, setStartCoord] = useState("75.7873,26.9124");
  const [endCoord, setEndCoord] = useState("75.7970,26.9150");

  // Reusable validator used by both live validation and submit
  const validateForm = () => {
    // Determine whether user explicitly set a start/end
    const startExplicit = useDeviceLocation || Boolean(selectedStartPoi) || (startCoord && startCoord !== DEFAULT_START_COORD);
    const endExplicit = Boolean(selectedEndPoi) || (endCoord && endCoord !== DEFAULT_END_COORD);

    // If not explicitly set, consider missing
    if (!startExplicit || !endExplicit) {
      return { ok: false, message: 'Please set both a start and a destination.' };
    }

    let effectiveStart = startCoord;
    if (!useDeviceLocation && selectedStartPoi) {
      const p = NAMED_POIS.find((x) => x.name === selectedStartPoi);
      if (p) effectiveStart = p.coords;
    }
    let effectiveEnd = endCoord;
    if (selectedEndPoi) {
      const p = NAMED_POIS.find((x) => x.name === selectedEndPoi);
      if (p) effectiveEnd = p.coords;
    }

    const parse = (s) => {
      if (!s || typeof s !== 'string') return null;
      const parts = s.split(',').map((ss) => Number(ss.trim()));
      if (parts.length !== 2 || parts.some((n) => Number.isNaN(n))) return null;
      return { lng: parts[0], lat: parts[1] };
    };

  const s = parse(effectiveStart);
  const t = parse(effectiveEnd);
    if (!s || !t) return { ok: false, message: 'Invalid coordinates provided. Please choose a POI or allow device location.' };

    // check near-equality (within ~5 meters)
    const metersPerDeg = 111320; // approx
    const dx = (s.lng - t.lng) * metersPerDeg * Math.cos(((s.lat + t.lat) / 2) * Math.PI / 180);
    const dy = (s.lat - t.lat) * metersPerDeg;
    const distMeters = Math.sqrt(dx * dx + dy * dy);
    if (distMeters < 5) return { ok: false, message: 'Start and destination are the same or too close. Pick different points.' };

    return { ok: true, start: s, end: t };
  };

  // Live validation whenever relevant inputs change
  React.useEffect(() => {
    const v = validateForm();
    setIsFormValid(v.ok);
    // only surface errors when user tried to submit; otherwise clear
    if (v.ok) setFormError(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStartPoi, selectedEndPoi, useDeviceLocation, startCoord, endCoord]);
  const [routes, setRoutes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [routeSource, setRouteSource] = useState(""); // 'client' or 'server'
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GM_KEY || undefined,
    libraries: ['visualization'],
  });
  const mapRef = React.useRef(null);
  const drawnRef = React.useRef({ polyline: null, startMarker: null, endMarker: null });
  const heatmapLayerRef = React.useRef(null);

  // Draw native google.maps Polyline/Markers when selected route changes and Maps JS is loaded
  React.useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || !window.google || !mapRef.current) return;
    // Clear previous
    if (drawnRef.current.polyline) {
      drawnRef.current.polyline.setMap(null);
      drawnRef.current.polyline = null;
    }
    if (drawnRef.current.startMarker) {
      drawnRef.current.startMarker.setMap(null);
      drawnRef.current.startMarker = null;
    }
    if (drawnRef.current.endMarker) {
      drawnRef.current.endMarker.setMap(null);
      drawnRef.current.endMarker = null;
    }

    if (selected && selected.geometry && selected.geometry.length > 0) {
      try {
        const path = selected.geometry.map(([lng, lat]) => ({ lat, lng }));
        const poly = new window.google.maps.Polyline({
          path,
          strokeColor: "#FF5733",
          strokeWeight: 5,
        });
        poly.setMap(mapRef.current);
        drawnRef.current.polyline = poly;

        const start = path[0];
        const end = path[path.length - 1];
        drawnRef.current.startMarker = new window.google.maps.Marker({ position: start, map: mapRef.current });
        drawnRef.current.endMarker = new window.google.maps.Marker({ position: end, map: mapRef.current });
      } catch (err) {
        console.warn("Failed to draw native polyline/markers", err);
      }
    }

    return () => {
      if (drawnRef.current.polyline) {
        drawnRef.current.polyline.setMap(null);
        drawnRef.current.polyline = null;
      }
      if (drawnRef.current.startMarker) {
        drawnRef.current.startMarker.setMap(null);
        drawnRef.current.startMarker = null;
      }
      if (drawnRef.current.endMarker) {
        drawnRef.current.endMarker.setMap(null);
        drawnRef.current.endMarker = null;
      }
    };
  }, [selected, isLoaded]);

  // fetch heatmap for current viewport when toggled on
  useEffect(() => {
    if (!showHeatmap) return;
    // derive bbox from current map center and zoom roughly (simple small bbox around center)
    const map = mapRef.current;
    if (!map) return;
    const bounds = map.getBounds ? map.getBounds() : null;
    if (!bounds) return;
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const bbox = `${sw.lng()},${sw.lat()},${ne.lng()},${ne.lat()}`;
    axios
      .get(`${API_URL}/reports/heatmap`, { params: { bbox, days: 90 } })
      .then((r) => {
        setHeatmapData(r.data.items || []);
      })
      .catch((err) => console.warn("Heatmap fetch failed", err));
  }, [showHeatmap, mapRef.current]);

  async function handleFind(e) {
    e && e.preventDefault();
    setFormError(null);
    const v = validateForm();
    if (!v.ok) {
      setFormError(v.message);
      return;
    }

    setLoading(true);
    setError(null);
    setRoutes([]);
    setSelected(null);

    try {
      // Resolve start coord
      let resolvedStart = startCoord;
      if (useDeviceLocation) {
        if (!navigator.geolocation)
          throw new Error("Geolocation not supported");
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            (error) => {
              // Updated error handling for permission denied
              if (error.code === error.PERMISSION_DENIED) {
                reject(
                  new Error(
                    "User denied Geolocation. Please allow location access in your browser settings."
                  )
                );
              } else {
                reject(error);
              }
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
            }
          );
        });
        const { latitude, longitude } = pos.coords;
        resolvedStart = `${longitude},${latitude}`;
        setStartCoord(resolvedStart);
      } else if (selectedStartPoi) {
        const p = NAMED_POIS.find((x) => x.name === selectedStartPoi);
        if (p) resolvedStart = p.coords;
        setStartCoord(resolvedStart);
      }

      let resolvedEnd = endCoord;
      if (selectedEndPoi) {
        const p = NAMED_POIS.find((x) => x.name === selectedEndPoi);
        if (p) resolvedEnd = p.coords;
        setEndCoord(resolvedEnd);
      }

      const qStart = resolvedStart
        .split(",")
        .map((s) => s.trim())
        .join(",");
      const qEnd = resolvedEnd
        .split(",")
        .map((s) => s.trim())
        .join(",");

      // If a browser Google Maps API key is present, prefer client-side DirectionsService
      // for an accurate route polyline, then POST the decoded geometry to server for scoring.
  if (!FORCE_SERVER && GM_KEY && isLoaded && window.google && window.google.maps && window.google.maps.DirectionsService) {
        try {
          const directionsService = new window.google.maps.DirectionsService();
          const dsResp = await new Promise((resolve, reject) => {
            directionsService.route(
              {
                origin: qStart,
                destination: qEnd,
                travelMode: window.google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) resolve(result);
                else reject(new Error(`Directions request failed: ${status}`));
              }
            );
          });

          // Map each route to decoded polyline geometry (array of [lng, lat])
          const parsed = (dsResp.routes || []).map((r, idx) => {
            // prefer overview_polyline
            const enc = r.overview_polyline?.points;
            const geometry = enc ? decodePolyline(enc) : [];
            return {
              id: idx,
              geometry,
              summary: r.summary || `route-${idx}`,
              googleRoute: true,
            };
          });

          // Send each geometry to server for scoring
          const scorePromises = parsed.map(async (p) => {
            if (!p.geometry || p.geometry.length === 0) return { ...p, score: 0, tilesEvaluated: 0 };
            try {
              const scoreResp = await axios.post(`${API_URL}/reports/score-geometry`, {
                geometry: p.geometry,
                days: 90,
              });
              return {
                ...p,
                score: scoreResp.data.score ?? 0,
                tilesEvaluated: scoreResp.data.tilesEvaluated ?? 0,
              };
            } catch (err) {
              console.warn('Scoring geometry failed, falling back to server directions', err);
              // If scoring fails, fallback to server directions endpoint for candidates
              throw err;
            }
          });

          let scored = [];
          try {
            scored = await Promise.all(scorePromises);
            setRoutes(scored);
            setSelected(scored[0] || null);
            if (scored[0] && scored[0].geometry && scored[0].geometry.length > 0) {
              const g = scored[0].geometry[0];
              setMapCenter({ lat: g[1], lng: g[0] });
              setRouteSource("client");
            }
            return; // done
          } catch (err) {
            // If any scoring call failed, fall through to server-side directions
            console.warn('One or more geometry scoring calls failed, falling back to server /reports/directions');
          }
        } catch (err) {
          console.warn('Client-side DirectionsService failed, falling back to server /reports/directions', err);
        }
      }

      // Fallback: use server-side directions/scoring (server will try Google Routes API or sampling)
      const resp = await axios.get(`${API_URL}/reports/directions`, {
        params: { start: qStart, end: qEnd, days: 90 },
      });
      const rt = (resp.data.routes || []).map((r, idx) => ({
        id: idx,
        geometry: r.geometry,
        summary: r.name || r.summary || `route-${idx}`,
        score: r.score,
        tilesEvaluated: r.tilesEvaluated,
      }));
      setRoutes(rt);
      setSelected(rt[0] || null);
      setRouteSource("server");
      if (rt[0] && rt[0].geometry && rt[0].geometry.length > 0) {
        const g = rt[0].geometry[0];
        setMapCenter({ lat: g[1], lng: g[0] });
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err?.message || "Failed to find routes";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function safetyLabel(score) {
    if (score === 0) return "No data";
    if (score < 0.05) return "Very Safe";
    if (score < 0.12) return "Safe";
    if (score < 0.25) return "Moderate";
    return "Risky";
  }

  return (
    <div className="card p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Safe Route Finder</h3>

      <form
        onSubmit={handleFind}
        className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Start (optional)
          </label>
          <select
            value={selectedStartPoi}
            onChange={(e) => {
              setSelectedStartPoi(e.target.value);
              setUseDeviceLocation(false);
            }}
            className="input w-full"
          >
            <option value="">Choose a POI</option>
            {NAMED_POIS.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="mt-2 text-xs text-gray-400">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={useDeviceLocation}
                onChange={(e) => {
                  setUseDeviceLocation(e.target.checked);
                  setSelectedStartPoi("");
                }}
              />
              Use my current location as start
            </label>
          </div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            Start:{" "}
            {useDeviceLocation ? "My location" : selectedStartPoi || "Not set"}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm text-gray-600">(select start)</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Destination</label>
          <select
            value={selectedEndPoi}
            onChange={(e) => setSelectedEndPoi(e.target.value)}
            className="input w-full"
          >
            <option value="">Choose destination POI</option>
            {NAMED_POIS.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            End: {selectedEndPoi || "Not set"}
          </div>
        </div>

        <div className="flex space-x-2 items-center">
          <button type="submit" className="btn btn-primary" disabled={!isFormValid || loading}>
            Find safest route
          </button>
          {formError && <div className="text-sm text-red-500 ml-3">{formError}</div>}
          <label className="inline-flex items-center ml-2">
            <input type="checkbox" className="mr-2" checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} />
            Show heatmap
          </label>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setSelectedStartPoi("");
              setSelectedEndPoi("");
              setStartCoord("75.7873,26.9124");
              setEndCoord("75.7970,26.9150");
              setUseDeviceLocation(false);
              setRoutes([]);
              setSelected(null);
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-400">
          Device time: {new Date().toLocaleString()}
        </div>
        <div className="text-sm">
          Current selection safety: {selected ? safetyLabel(selected.score) : "—"}
          <div className="text-xs text-gray-400 mt-1">
            {loadError && <span>Google Maps JS failed to load; using server fallback.</span>}
            {!loadError && routeSource && <span>Route source: {routeSource}</span>}
            {FORCE_SERVER && <div className="text-xs text-yellow-400">Client Directions disabled by REACT_APP_FORCE_SERVER_DIRECTIONS</div>}
          </div>
        </div>
      </div>

      {loading && <p>Scoring routes…</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <h4 className="font-medium mb-2">Candidates</h4>
          <div className="space-y-2">
            {routes.length === 0 && (
              <p className="text-sm text-gray-500">No routes yet</p>
            )}
            {routes.map((r) => (
              <div
                key={r.id}
                className={`p-3 border rounded ${
                  selected && selected.id === r.id
                    ? "border-primary-500"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">{r.summary}</div>
                    <div className="text-xs text-gray-500">
                      tiles evaluated: {r.tilesEvaluated}
                    </div>
                    <div className="text-xs text-gray-400">
                      device time: {new Date().toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{r.score}</div>
                    <div className="text-sm text-gray-600">
                      {safetyLabel(r.score)}
                    </div>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => {
                        setSelected(r);
                        if (r.geometry && r.geometry.length > 0) {
                          const g = r.geometry[0];
                          setMapCenter({ lat: g[1], lng: g[0] });
                        }
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h4 className="font-medium mb-2">Map</h4>
          {GM_KEY ? (
            isLoaded && typeof window !== "undefined" && window.google && window.google.maps ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={13}
                onLoad={(map) => {
                  mapRef.current = map;
                }}
                onUnmount={() => {
                  mapRef.current = null;
                }}
              >
                {/* Heatmap component (uses Google native layer when available or SVG fallback) */}
                {showHeatmap && <SafeHeatmap mapRef={mapRef} />}
              </GoogleMap>
            ) : (
              <div className="p-4 border rounded text-sm text-gray-600">Loading map…</div>
            )
          ) : (
            <div className="p-4 border rounded text-sm text-gray-600">
              {/* Fallback SVG preview when Google Maps API key is not set */}
              {selected && selected.geometry && selected.geometry.length > 0 ? (
                <div className="w-full h-64 flex items-center justify-center">
                  <div style={{ position: 'relative', width: '100%', height: 256 }}>
                    {showHeatmap && heatmapData.length > 0 ? (
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-64 absolute top-0 left-0">
                        <defs>
                          <radialGradient id="hg" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        {heatmapData.map((p, i) => {
                          // map lat/lng to 0..100 based on bbox of points
                          return <circle key={i} cx={Math.random() * 100} cy={Math.random() * 100} r={5 + p.weight * 20} fill="url(#hg)" />;
                        })}
                      </svg>
                    ) : (
                      <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-64"
                  >
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#f87171" />
                      </linearGradient>
                    </defs>
                    {(() => {
                      const pts = selected.geometry.map(([lng, lat]) => ({
                        lng,
                        lat,
                      }));
                      const lons = pts.map((p) => p.lng);
                      const lats = pts.map((p) => p.lat);
                      const minLon = Math.min(...lons);
                      const maxLon = Math.max(...lons);
                      const minLat = Math.min(...lats);
                      const maxLat = Math.max(...lats);
                      const dx = maxLon - minLon || 0.0001;
                      const dy = maxLat - minLat || 0.0001;
                      const toXY = (p) => ({
                        x: ((p.lng - minLon) / dx) * 98 + 1,
                        y: 99 - ((p.lat - minLat) / dy) * 98,
                      });
                      const pathD = pts
                        .map((p, i) => {
                          const xy = toXY(p);
                          return `${i === 0 ? "M" : "L"} ${xy.x.toFixed(
                            2
                          )} ${xy.y.toFixed(2)}`;
                        })
                        .join(" ");
                      const start = toXY(pts[0]);
                      const end = toXY(pts[pts.length - 1]);
                      const color =
                        selected && selected.score >= 0.25
                          ? "#f87171"
                          : "#34d399";
                      return (
                        <g>
                          <rect
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                            fill="#0f1724"
                            stroke="#374151"
                            rx="4"
                          />
                          <path
                            d={pathD}
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                          <circle
                            cx={start.x}
                            cy={start.y}
                            r="2.5"
                            fill="#3b82f6"
                          />
                          <circle
                            cx={end.x}
                            cy={end.y}
                            r="2.5"
                            fill="#f97316"
                          />
                        </g>
                      );
                    })()}
                  </svg>
                    )}
                  </div>
                </div>
              ) : (
                <div>No map preview available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
