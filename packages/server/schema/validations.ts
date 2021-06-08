/**
 * AayWorks - Reimagining the way India works!
 * Data Model  :  Validation Schema
 * Author      :  Ankur Daharwal
 * Filename    :  validations.ts
 * Reference   :  [https://aayworks.slite.com/api/s/note/Mx7is6kCX2ECCE8Gnw6YiV/Interfaces-and-Schema]
 * Library     :  Fatest Validator [https://github.com/icebob/fastest-validator]
 */

// all valid db collections
export const allValidTypeNames = ["UserProfile"];

const userRegistrationValidation = {
  mobile: {
    type: "number",
    integer: "true",
    positive: true,
    min: 5000000000,
    max: 9999999999,
  },
  firstName: { type: "string", min: 1 },
  middleName: { type: "string", min: 1, optional: true },
  lastName: { type: "string", min: 1 },
  email: { type: "email", min: 1, optional: true },
  dob: { type: "date", convert: true, optional: true },
  language: { type: "string", min: 1, default: "English" },
  gender: { type: "string", enum: ["Male", "Female", "Transgender"] },
  address: {
    type: "object",
    props: {
      pincode: { type: "number" },
      region: { type: "string" },
      state: { type: "string" },
      city: { type: "string" },
      locality: { type: "string" },
    },
    optional: true,
  },
  location: {
    type: "object",
    props: {
      latitude: { type: "number" },
      longitude: { type: "number" },
    },
  },
  imageUrl: { type: "url", optional: true },
};

export const workerRegistrationValidation = {
  ...userRegistrationValidation,
  userType: {
    type: "string",
    enum: ["Worker"],
  },
  profession: { type: "string", optional: true },
  skills: { type: "array", optional: true },
  experience: { type: "number", optional: true },
  qualification: { type: "string", optional: true },
  salary: {
    type: "object",
    props: {
      hourly: { type: "number", optional: true },
      daily: { type: "number", optional: true },
      monthly: { type: "number", optional: true },
      userPref: { type: "string" },
    },
  },
  verificationType: { type: "string" },
  verificationProof: { type: "url", optional: true },
  verificationTime: { type: "date", convert: true, optional: true },
  verificationStatus: {
    type: "string",
    enum: ["Pending", "Verified", "Unverified", "Invalid"],
    default: "Pending",
  },
};

export const employerRegistrationValidation = {
  ...userRegistrationValidation,
  userType: {
    type: "string",
    enum: ["Employer"],
  },
  businessName: { type: "string" },
  sector: { type: "string" },
  industry: { type: "string" },
};

export const defaultScore = { value: 0, weight: 0, isEnabled: false };
