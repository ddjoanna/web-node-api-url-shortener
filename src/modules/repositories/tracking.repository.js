import Tracking from "../models/tracking.model.js";
import { buildDateRangeFilter } from "../utils/filter.util.js";

class TrackingRepository {
  static async paginateByShortCode(
    shortCode,
    startDate,
    endDate,
    page = 1,
    limit = 10
  ) {
    const offset = (page - 1) * limit;

    const whereConditions = { shortCode };
    if (startDate || endDate) {
      whereConditions.createdAt = buildDateRangeFilter(startDate, endDate);
    }

    const { rows: data, count: totalRecords } = await Tracking.findAndCountAll({
      where: whereConditions,
      offset,
      limit,
      orderBy: [["createdAt", "DESC"]],
    });

    return {
      data,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
      limit,
    };
  }

  static async getRecordsByShortCode(shortCode, startDate, endDate) {
    const whereConditions = { shortCode };
    if (startDate || endDate) {
      whereConditions.createdAt = buildDateRangeFilter(startDate, endDate);
    }

    return await Tracking.findAll({
      where: whereConditions,
    });
  }
}

export default TrackingRepository;
