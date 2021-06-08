/**
 * AayWorks - Reimagining the way India works!
 * Data Model  :  Interfaces
 * Author      :  Ankur Daharwal
 * Filename    :  interfaces.ts
 * Reference   :  https://aayworks.slite.com/api/s/note/Mx7is6kCX2ECCE8Gnw6YiV/Interfaces-and-Schema
 */

// generic user profile schema - both workers and employers
export interface UserProfile {
  userId: number;
  userType: string;
  name: Name;
  email: string;
  isVerified: boolean;
  dob: Date;
  aayCardId: any;
  language: Languages;
  gender: string;
  address: Addresses;
  location: Locations;
  imageUrl: string;
  reputation: ReputationScore;
  info: WorkerInfo | EmployerInfo; // either worker or employer info
}
// name interface
export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
  userPref: string; // preferred name setting
}
// user language settings
export interface Languages {
  list: Array<string>;
  userPref: string;
}
// user address settings
export interface Addresses {
  list: Array<Address>; // all addresses
  userPref: Address; // preferred location setting
}
// user address structure
export interface Address {
  pincode: number;
  region: string;
  state: string;
  city: string;
  locality: string;
}
// geo-location settings
export interface Locations {
  list: Array<Location>; // all saved locations
  userPref: Array<number>; // favorite locations preference settings
}
// geo-location structure
export interface Location {
  latitude: number;
  longitude: number;
}
// worker profile info
export interface WorkerInfo {
  profession: Profession;
  skills: Skills;
  experience: number; // in months
  qualification: string; // highest qualification
  salary: Salary;
  verification: Array<Verification>;
}
// profession settings
export interface Profession {
  list: Array<string>;
  unlocked: number; // 1-based index
  userPref: string;
}
// worker salary settings
export interface Salary {
  hourly: number;
  daily: number;
  monthly: number;
  userPref: string; // salary preferred settings in ['hourly', 'daily', 'monthly']
}
// worker skills settings
export interface Skills {
  list: Array<string>;
  userPref: string;
}
// employer profile info
export interface EmployerInfo {
  businessName: string;
  sector: string;
  industry: string;
  verification: BusinessVerification;
}
// business KYB
export interface BusinessVerification {
  officerName: Name;
  officerDesignation: string;
  officerVerification: Array<Verification>;
  signatory: boolean;
  businessVerification: Array<Verification>;
}
// individual KYC
export interface Verification {
  type: string;
  proof: string;
  uploadTime: Date;
  status: string; // 'Pending', 'Approved', 'Rejected'
}
// reputation score
export interface ReputationScore {
  finalScore: number;
  responsiveness: Score;
  cancellation: Score;
  punctuality: Score;
  userRating: Score;
  default: Score;
}
// score structure
export interface Score {
  value: number;
  weight: number;
  isEnabled: boolean;
}
