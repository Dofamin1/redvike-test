import reservationsService, { ReservationsService } from '../../../service';

export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {
    this.reservationsService = reservationsService;
  }

  getReservationsForDate = async (req, res) => {
    const { date, amenityId } = req.query;

    const reservations = await this.reservationsService.getReservationsForDate(date, amenityId);

    return res.send(reservations);
  };
}

export default new ReservationsController(reservationsService);
