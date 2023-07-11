import { toReservationsForDateDTO } from './reservations.dtos';
import db from '../../../modules/postgresDB';
import { Knex } from 'knex';
import {
  AmenityId,
  UserId,
  StartTime,
  EndTime,
  ReservationId,
  ReservationDate,
  ReservationFullModel
} from './reservations.types';

export class ReservationsRepository {
  constructor(private db: Knex) {
    this.db = db;
  }

  async getReservationsForDate(date: ReservationDate, amenityId: AmenityId): Promise<[ReservationFullModel] | []> {
    const reservations = await this.db
      .select(['reservation.id as id', 'user_id', 'start_time', 'end_time', 'amenity.name as amenity_name'])
      .from('reservation')
        .innerJoin('amenity', 'reservation.amenity_id', 'amenity.id')
      .where({ amenity_id: amenityId, date });

    return toReservationsForDateDTO(reservations);
  }
}

export default new ReservationsRepository(db.getClient());
