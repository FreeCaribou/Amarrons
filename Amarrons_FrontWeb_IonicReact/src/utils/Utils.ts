import { AxiosResponse } from 'axios';
import * as Leaflet from 'leaflet';
import { InternalErrorEnum } from '../models/enum/internal-error.enum';
import { UserService } from '../services/users/user.service';

export function FormatAxiosMock(data: any): AxiosResponse {
  return {
    status: 200,
    data,
    statusText: '',
    config: {},
    headers: {}
  }
}

export async function decodeJwt(token: string) {
  var jwt = require('jsonwebtoken');
  return await jwt.decode(token);
}

export async function getRoleCode() {
  const token = localStorage.getItem('user_token');
  if (token) {
    const user = await decodeJwt(token as string);
    if (user) {
      return user.role.code;
    }
  } else {
    return '0';
  }
}

export async function isModo() {
  return await getRoleCode() === '2' || await getRoleCode() === '3';
}

export async function isAdmin() {
  return await getRoleCode() === '3';
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

export async function customRouteGuard(roles: string[], setErrorMessage: any, history: any): Promise<boolean> {
  const userService = new UserService();
  let isOk = true;

  try {
    const result = (await userService.VerifyRight(roles)).data;

    if (!result.isAuthorized) {
      isOk = false;
      setErrorMessage({ internal: InternalErrorEnum.NoRightToAccess });
      history.replace('/options');
      history.push('/options');
    }

  } catch (error) {
    setErrorMessage({ internal: InternalErrorEnum.NoRightToAccess });
    return false;
  }

  return isOk;
}