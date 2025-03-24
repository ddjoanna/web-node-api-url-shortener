import TrackingService from "../services/tracking.service.js";

class GetTrackingRecordsUseCase {
  async execute(shortCode, startDate, endDate, page, limit) {
    const records = await TrackingService.getTrackingRecords(
      shortCode,
      startDate,
      endDate,
      page,
      limit
    );

    const transformedData = records.data.map((record) => ({
      ip: record.ip,
      referer: record.referer,
      userAgent: record.userAgent,
      createdAt: record.createdAt.toISOString(),
    }));

    return {
      data: transformedData,
      paging: {
        index: page,
        size: limit,
        total: records.totalRecords,
      },
    };
  }
}

export default GetTrackingRecordsUseCase;
