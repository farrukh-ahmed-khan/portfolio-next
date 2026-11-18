// The resume lists the first professional role as March 2021.
// Only a month is specified, so use its first day as the anniversary.
export const careerStartDate = "2021-03-01";

export function getYearsOfExperience(asOf = new Date()) {
  const [startYear, startMonth, startDay] = careerStartDate.split("-").map(Number);
  // Use the portfolio owner's timezone, regardless of the host or visitor location.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(asOf);
  const part = (type) => Number(parts.find((item) => item.type === type).value);
  const month = part("month");
  const beforeAnniversary = month < startMonth || (month === startMonth && part("day") < startDay);
  return Math.max(0, part("year") - startYear - Number(beforeAnniversary));
}
