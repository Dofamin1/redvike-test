import {
  ReservationByDate,
  ReservationsForUser
} from './reservations.types';

export const toReservationsForDateDTO = (rawData): [ReservationByDate] => rawData.map(r => ({
  id: r.id,
  userId: r.user_id,
  amenityName: r.amenity_name,
  startTime: convertMinutesToHHMM(r.start_time),
  duration: r.end_time - r.start_time
}));

export const toReservationsForUserDTO = (rawData): ReservationsForUser => ({
  id: rawData.id,
  amenityId: rawData.amenity_id,
  startTime: rawData.start_time,
  endTime: rawData.end_time,
  date: rawData.date
});

function convertMinutesToHHMM(minutes) {
  const hours: number = Math.floor(minutes / 60);

  const hoursStr: string = hours.toString().padStart(2, '0');
  const minutesStr: string  = (minutes % 60).toString().padStart(2, '0');

  return hoursStr + ':' + minutesStr;
}
