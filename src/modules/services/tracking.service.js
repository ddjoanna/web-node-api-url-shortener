import TrackingRepository from "../repositories/tracking.repository.js";

class TrackingService {
  static async getRecordsWithPagination(
    shortCode,
    startDate,
    endDate,
    page,
    limit
  ) {
    return await TrackingRepository.getRecordsWithPagination(
      shortCode,
      startDate,
      endDate,
      page,
      limit
    );
  }

  static async getRecords(shortCode, startDate, endDate) {
    return await TrackingRepository.getRecordsByShortCode(
      shortCode,
      startDate,
      endDate
    );
  }
}

export default TrackingService;
