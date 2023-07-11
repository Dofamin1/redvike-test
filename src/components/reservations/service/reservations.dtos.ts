import {
  AmenityId,
  EndTime,
  ReservationDate,
  ReservationFullModel,
  ReservationId,
  StartTime,
  UserId
} from './reservations.types';

export const toReservationsForDateDTO = (rawData): [ReservationFullModel] => rawData.map(r => ({
  id: r.id,
  userId: r.user_id,
  amenityName: r.amenity_name,
  startTime: convertMinutesToHHMM(r.start_time),
  duration: r.end_time - r.start_time
}))

function convertMinutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);

  // Add leading zeros if necessary
  const hoursStr = hours.toString().padStart(2, '0');
  const minutesStr = (minutes % 60).toString().padStart(2, '0');

  // Combine hours and minutes with a colon separator
  return hoursStr + ':' + minutesStr;
}
