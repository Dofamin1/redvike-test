import Errors from '../../../errors';
import reservationsRepository, { ReservationsRepository } from './reservations.repository';
import {
  AmenityId,
  UserId,
  StartTime,
  EndTime,
  ReservationId,
  ReservationDate,
  ReservationFullModel
} from './reservations.types';
import { InfoMessage } from '../../common/types';


export class ReservationsService {
  constructor(private readonly reservationsRepository: ReservationsRepository) {
    this.reservationsRepository = reservationsRepository;
  }

  async getReservationsForDate(date: ReservationDate, amenityId: AmenityId): Promise<[ReservationFullModel] | []> {
    return await this.reservationsRepository.getReservationsForDate(date, amenityId);
  }

  getReservationsForUser() {

  }

  parseReservationsCSV() {

  }
}

export default new ReservationsService(reservationsRepository);
