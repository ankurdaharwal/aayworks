/* eslint-disable camelcase */
import { ServiceSchema } from "moleculer";
import { hostname } from "os";
// import db from "@aayworks/utils";

const AayWorksService: ServiceSchema = {
  name: "aayworks",

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
    info: {
      async handler(ctx: { meta: { $statusCode: number } }) {
        ctx.meta.$statusCode = 201;
        return {
          name: "AayWorks",
          website: "https://www.aayworks.com",
          host: hostname(),
        };
      },
    },
  },
  methods: {},
};

export = AayWorksService;
