import { toReservationsForDateDTO, toReservationsForUserDTO } from './reservations.dtos';
import db from '../../../modules/postgresDB';
import { Knex } from 'knex';
import {
  AmenityId,
  UserId,
  ReservationId,
  ReservationDate,
  StartTime,
  EndTime,
  ReservationByDate,
  ReservationsForUser
} from './reservations.types';

export class ReservationsRepository {
  constructor(private db: Knex) {
    this.db = db;
  }

  async getReservationsForDate(date: ReservationDate, amenityId: AmenityId): Promise<[ReservationByDate] | []> {
    const reservations = await this.db
      .select(['reservation.id as id', 'user_id', 'start_time', 'end_time', 'amenity.name as amenity_name'])
      .from('reservation')
        .innerJoin('amenity', 'reservation.amenity_id', 'amenity.id')
      .where({ amenity_id: amenityId, date })
        .orderBy('start_time', 'asc');

    return toReservationsForDateDTO(reservations);
  }
}

export default new ReservationsRepository(db.getClient());
