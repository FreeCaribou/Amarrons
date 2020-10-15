import { Marker } from "src/markers/entities/marker.entity";

export function deleteSensitiveDataFromMarker(markers: Marker[]): Marker[] {
  markers.map(e => {
    if (e.suggestedBy) {
      delete e.suggestedBy.password;
      delete e.suggestedBy.email;
    }
    if (e.validatedBy) {
      delete e.validatedBy.password;
      delete e.validatedBy.email;
    }
  });

  return markers;
}