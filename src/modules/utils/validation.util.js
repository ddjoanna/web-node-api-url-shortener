/**
 * 驗證日期格式是否正確
 * @param {string} dateStr - 日期字符串
 * @returns {boolean} 是否有效日期
 */
function isValidDate(dateStr) {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

export { isValidDate };
