import * as Leaflet from 'leaflet';

export function FormatAxiosMock(data: any) {
  return {
    status: 200,
    data
  }
}

export async function decodeJwt(token: string) {
  var jwt = require('jsonwebtoken');
  return await jwt.decode(token);
}

export function createMap(container: string, lat: number, lng: number, zoom: number, onClick?: any, onMove?: any, onLongClick?: any, onZoom?: any) {
  const map = new Leaflet.Map(container).setView([lat, lng], zoom);

  Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> 
      contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`
  }).addTo(map);

  if (onClick) { map.on('click', (e) => { onClick(e); }); }
  if (onMove) { map.on('moveend', (e) => { onMove(e); }); }
  if (onLongClick) { map.on('contextmenu', (e) => { onLongClick(e); }); }
  if (onZoom) { map.on('zoomanim', (e) => { onZoom(e); }); }

  return map;
}