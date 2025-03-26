import TrackingService from "../services/tracking.service.js";
import { startOfWeek, endOfWeek, format } from "date-fns";

const ANALYTICS_TYPES = {
  Daily: "daily",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

class GetShortUrlAnalyticsUseCase {
  async execute(shortCode, startDate, endDate, type) {
    const records = await this.getRecords(shortCode, startDate, endDate);

    switch (type) {
      case ANALYTICS_TYPES.DAY:
        return this.getDailyAnalytics(records);
      case ANALYTICS_TYPES.WEEK:
        return this.getWeekAnalytics(records);
      case ANALYTICS_TYPES.MONTH:
        return this.getMonthAnalytics(records);
      case ANALYTICS_TYPES.YEAR:
        return this.getYearAnalytics(records);
      default:
        return this.getDailyAnalytics(records);
    }
  }

  async getRecords(shortCode, startDate, endDate) {
    let records = await TrackingService.getRecords(
      shortCode,
      startDate,
      endDate
    );

    if (!records) {
      records = [];
    } else if (!Array.isArray(records)) {
      records = Object.values(records);
    }

    return records;
  }

  getDailyAnalytics(records) {
    return this.getAnalytics(records, (record) => {
      const date = new Date(record.createdAt);
      return format(date, "yyyy-MM-dd");
    });
  }

  getWeekAnalytics(records) {
    return this.getAnalytics(records, (record) => {
      const date = new Date(record.createdAt);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });

      return `${format(weekStart, "yyyy-MM-dd")} ~ ${format(
        weekEnd,
        "yyyy-MM-dd"
      )}`;
    });
  }

  getMonthAnalytics(records) {
    return this.getAnalytics(records, (record) => {
      const date = new Date(record.createdAt);
      return format(date, "yyyy-MM");
    });
  }

  getYearAnalytics(records) {
    return this.getAnalytics(records, (record) => {
      const date = new Date(record.createdAt);
      return format(date, "yyyy");
    });
  }

  getAnalytics(records, getKey) {
    const analytics = {};
    records.forEach((record) => {
      if (record && record.createdAt) {
        const key = getKey(record);
        if (!analytics[key]) {
          analytics[key] = {
            totalClicks: 0,
            uniqueIPs: new Set(),
            deviceClicks: {
              mobile: 0,
              desktop: 0,
              other: 0,
            },
          };
        }
        analytics[key].totalClicks++;
        analytics[key].uniqueIPs.add(record.ip);

        const deviceType = this.categorizeDevice(record.userAgent);
        analytics[key].deviceClicks[deviceType]++;
      }
    });

    Object.keys(analytics).forEach((key) => {
      analytics[key].uniqueIPs = analytics[key].uniqueIPs.size;
    });

    return analytics;
  }

  categorizeDevice(userAgent) {
    const userAgentLower = userAgent.toLowerCase();

    switch (userAgentLower) {
      case "android":
      case "iphone":
      case "ipad":
        return "mobile";
      case "windows":
      case "macintosh":
        return "desktop";
      default:
        return "other";
    }
  }
}

export default GetShortUrlAnalyticsUseCase;
