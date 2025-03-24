import { Op } from "sequelize";

/**
 * 構造篩選條件
 * @param {string} startDate - 起始日期
 * @param {string} endDate - 結束日期
 * @returns {Object} 篩選條件
 */
function buildDateRangeFilter(startDate, endDate) {
  const dateFilter = {};
  if (startDate) dateFilter[Op.gte] = new Date(startDate);
  if (endDate) dateFilter[Op.lte] = new Date(endDate);
  return dateFilter;
}

export { buildDateRangeFilter };
