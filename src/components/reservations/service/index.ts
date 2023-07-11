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
    await this.reservationsRepository.throwIfAmenityMissed(amenityId);

    return await this.reservationsRepository.getReservationsForDate(date, amenityId);
  }

  async getReservationsForUser(userId: UserId): Promise<ReservationsForUser>  {
    await this.reservationsRepository.throwIfUserMissed(userId);

    return await this.reservationsRepository.getReservationsForUser(userId);
  }
}

export default new ReservationsService(reservationsRepository);
