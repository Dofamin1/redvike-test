import Errors from '../../../errors';
import { toReservationsForDateDTO, toReservationsForUserDTO } from './reservations.dtos';
import db from '../../../modules/postgresDB';
import { Knex } from 'knex';
import {
  AmenityId,
  UserId,
  ReservationDate,
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

  async getReservationsForUser(userId: UserId): Promise<ReservationsForUser | {}> {
    const reservations = await this.db
        .select()
        .from('reservation')
        .where({ user_id: userId })

    return reservations.reduce((acc, res) => {
      const resToDTO: ReservationsForUser = toReservationsForUserDTO(res);
      acc[res.date] ? acc[res.date].push(resToDTO) : acc[res.date] = [resToDTO];
      return acc;
    }, {});
  }

  async throwIfAmenityMissed(amenityId: AmenityId): Promise<void> {
    const amenity = await this.db.select('id').from('amenity').where({ id: amenityId }).first();

    if (!amenity) throw new Errors.BadRequest('Amenity does not exists');
  }

  async throwIfUserMissed(userId: UserId): Promise<void> {
    const user = await this.db.select('id').from('user').where({ id: userId }).first();

    if (!user) throw new Errors.BadRequest('User does not exists');
  }
}

export default new ReservationsRepository(db.getClient());
