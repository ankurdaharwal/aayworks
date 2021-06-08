import { Salary } from "../schema";

export const convertSalary = (salary: Salary) => {
  let convertedSalary: any = null;
  if (salary?.userPref === "hourly") {
    convertedSalary = {
      hourly: salary.hourly,
      daily: salary.hourly * 9,
      monthly: salary.hourly * 9 * 30,
      userPref: salary.userPref,
    };
  }
  if (salary?.userPref === "daily") {
    convertedSalary = {
      hourly: salary.daily / 9,
      daily: salary.daily,
      monthly: salary.daily * 30,
      userPref: salary.userPref,
    };
  }
  if (salary?.userPref === "monthly") {
    convertedSalary = {
      hourly: (salary.monthly / 30) * 9,
      daily: salary.monthly / 30,
      monthly: salary.monthly,
      userPref: salary.userPref,
    };
  }
  return convertedSalary;
};
