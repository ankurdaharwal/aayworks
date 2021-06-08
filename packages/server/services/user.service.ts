/* eslint-disable camelcase */
import { ServiceSchema, Errors } from "moleculer";
import { keyGen } from "../utils";
import * as db from "../db";
import { workerRegistrationValidation, defaultScore } from "../schema";
import { convertSalary } from "../utils";

const { MoleculerClientError } = Errors;

const UserService: ServiceSchema = {
  name: "user",
  /**
   * Service settings
   */
  settings: {},

  /**
   * Service dependencies
   */
  dependencies: [],

  /**
   * Actions
   */
  actions: {
    getUserCount: {
      auth: "required",
      async handler(ctx: { meta: { $statusCode: number } }) {
        const userCount = await db.getLatestUserId();
        ctx.meta.$statusCode = 201;
        return { userCount };
      },
    },
    getAllUsers: {
      auth: "required",
      async handler(ctx: { meta: { $statusCode: number } }) {
        const userCount = await db.getAllUsers();
        ctx.meta.$statusCode = 201;
        return { userCount };
      },
    },
    registerWorker: {
      auth: "required",
      params: workerRegistrationValidation,
      async handler(ctx: {
        params: {
          userType?: string;
          mobile?: number;
          firstName?: string;
          middleName?: string;
          lastName?: string;
          email: string;
          password: string;
          dob: Date;
          language: string;
          gender: string;
          address: any;
          profession: string;
          skills: Array<string>;
          experience: number;
          qualification: string;
          salary: any;
          verificationType: string;
          verificationProof: string;
          verificationTime: Date;
          verificationStatus: string;
          location: any;
          imageUrl: string;
        };
        meta: { $statusCode: number };
      }) {
        const {
          userType,
          mobile,
          firstName,
          middleName,
          lastName,
          email,
          password,
          dob,
          language,
          gender,
          address,
          location,
          profession,
          skills,
          experience,
          qualification,
          salary,
          verificationType,
          verificationProof,
          verificationTime,
          verificationStatus,
          imageUrl,
        } = ctx.params;
        const userExists = await db.getUserProfileByMobile(ctx.params.mobile);
        if (userExists) {
          throw new MoleculerClientError(
            "A user with this mobile number is already registered.",
            400,
            "",
            [ctx.params.mobile]
          );
        }
        const newId = (await db.getLatestUserId()) || 0;
        const registerUser = {
          userId: Number(newId) + 1,
          userType: userType,
          mobile,
          name: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            userPref: firstName,
          },
          email,
          password: password,
          dob,
          isVerified: false,
          aayCardId: keyGen(),
          language: { list: [language], userPref: language },
          gender,
          address: {
            list: [address],
            userPref: address,
          },
          location,
          reputation: {
            finalScore: 0,
            responsiveness: defaultScore,
            cancellation: defaultScore,
            punctuality: defaultScore,
            userRating: defaultScore,
            default: defaultScore,
          },
          info: {
            profession: { list: [profession], userPref: profession, unlocked: 1 },
            skills: { list: skills, userPref: skills?.[0] || "" },
            experience,
            qualification,
            salary: convertSalary(salary),
            verification: [
              {
                type: verificationType,
                proof: verificationProof,
                uploadTime: verificationTime,
                status: verificationStatus,
              },
            ],
          },
          imageUrl,
        };

        await db.createUserProfile(registerUser);

        ctx.meta.$statusCode = 201;
        return registerUser?.aayCardId;
      },
    },
  },
};

export = UserService;
