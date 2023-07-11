import Errors from '../../../errors';
import reservationsRepository, { ReservationsRepository } from './reservations.repository';
import {
  AmenityId,
  UserId,
  ReservationDate,
  ReservationByDate,
  ReservationsForUser
} from './reservations.types';

export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationsRepository) {
    this.reservationsRepository = reservationsRepository;
  }

  async getReservationsForDate(date: ReservationDate, amenityId: AmenityId): Promise<[ReservationByDate] | []> {
    // const amenity = await this.amenityRepository.getAmenityById(amenityId); //TODO:
    // if (!amenity) throw new Errors.BadRequest('Passed amenity does not exists');

    return await this.reservationsRepository.getReservationsForDate(date, amenityId);
  }

  async getReservationsForUser(userId: UserId): Promise<ReservationsForUser>  {
    // const user = await this.userRepository.getUserById(userId); //TODO:
    // if (!user) throw new Errors.BadRequest('Passed user does not exists');
    return await this.reservationsRepository.getReservationsForUser(userId);
  }
}

export default new ReservationsService(reservationsRepository);
