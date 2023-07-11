export type AmenityId = number;
export type UserId = number;
export type StartTime = number;
export type EndTime = number;
export type ReservationId = number;
export type ReservationDate = number;
export type ReservationDuration = number;
export type AmenityName = string;
export interface ReservationBaseModel {
  readonly id: ReservationId;
  readonly amenityId: AmenityId;
  readonly userId: UserId;

  startTime: StartTime;
  endTime: EndTime;
  date: ReservationDate;
}

export interface ReservationFullModel extends ReservationBaseModel {
  readonly amenityName: AmenityName
  readonly duration: ReservationDuration
  readonly updatedAt: Date;
  readonly createdAt: Date;
}
