import { Collection } from "mongodb";
import * as store from "./store";
import { UserProfile } from "../schema";

let userProfileCollection: Collection<any>;

const init = async () => {
  userProfileCollection = await store.init();
};

init();

export const createUserProfile = (userProfile: UserProfile) =>
  store.saveDocument("UserProfile", userProfile);

export const getAllUsers = async () =>
  await userProfileCollection.find({}).toArray();

export const getUserProfileById = async (userId: number) =>
  await userProfileCollection.findOne({ userId: { $eq: userId } });

export const getUserProfileByMobile = async (mobile: number) =>
  await userProfileCollection.findOne({ mobile: { $eq: mobile } });

export const getLatestUserId = async () => {
  const latestUserId = await userProfileCollection
    .find({})
    .limit(1)
    .sort({ _id: -1 })
    .toArray();
  return latestUserId?.[0]?.userId;
};
