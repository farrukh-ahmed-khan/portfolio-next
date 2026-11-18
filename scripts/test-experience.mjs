import assert from "node:assert/strict";
import { getYearsOfExperience } from "../data/experience.js";

for (const [date, expected] of [
  ["2020-01-01T00:00:00+05:00", 0],
  ["2021-03-01T00:00:00+05:00", 0],
  ["2026-02-28T23:59:59+05:00", 4],
  ["2026-03-01T00:00:00+05:00", 5],
  ["2026-11-18T12:00:00+05:00", 5],
  ["2027-02-28T23:59:59+05:00", 5],
  ["2027-03-01T00:00:00+05:00", 6],
  ["2030-03-01T00:00:00+05:00", 9],
]) {
  assert.equal(getYearsOfExperience(new Date(date)), expected, date);
}

console.log("Experience calculation passed: current date, future years, and Karachi anniversary boundaries.");
