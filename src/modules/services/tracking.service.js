import TrackingRepository from "../repositories/tracking.repository.js";

class TrackingService {
  static async getTrackingRecords(shortCode, startDate, endDate, page, limit) {
    return await TrackingRepository.paginateByShortCode(
      shortCode,
      startDate,
      endDate,
      page,
      limit
    );
  }
}

export default TrackingService;
