import { ServiceSchema, Context } from "moleculer";
import http from "http";

const fs = require("fs");
const path = require("path");
const { MoleculerClientError } = require("moleculer").Errors;
const ApiGateway = require("moleculer-web");
// const { db } = require("@aayworks/utils-server");
const { ApolloService, GraphQLUpload } = require("moleculer-apollo-server");
const _ = require("lodash");

const {
  UnAuthorizedError,
  ERR_NO_TOKEN,
  ERR_INVALID_TOKEN,
} = ApiGateway.Errors;

interface ApiContext extends Context {
  meta: {
    mobile: number;
    userId: number;
  };
  params: {
    req: any;
  };
}

const Server: ServiceSchema = {
  name: "server",

  mixins: [
    ApiGateway,
    ApolloService({
      typeDefs: ["scalar Upload"],
      resolvers: {
        Upload: GraphQLUpload,
      },
      introspection: true,
      playground: true,
      // API Gateway route options
      routeOptions: {
        path: "/graphql",
        cors: {
          origin: "*",
          // Configures the Access-Control-Allow-Methods CORS header.
          methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
          // Configures the Access-Control-Allow-Headers CORS header.
          allowedHeaders: ["authorization", "content-type"],
          // Configures the Access-Control-Expose-Headers CORS header.
          exposedHeaders: [],
          // Configures the Access-Control-Allow-Credentials CORS header.
          credentials: false,
          // Configures the Access-Control-Max-Age CORS header.
          maxAge: 3600,
        },
        mappingPolicy: "restrict",
      },
      serverOptions: {
        tracing: false,

        engine: {
          apiKey: process.env.APOLLO_ENGINE_KEY,
        },
      },
    }),
  ],

  events: {
    "graphql.schema.updated": function ({ schema }: any) {
      fs.writeFileSync(`${__dirname}/generated-schema.gql`, schema, "utf8");
    },
  },

  hooks: {
    error: {
      "*": "auditErrorLog",
    },
    before: {
      "*": "ipWhiteList",
    },
    after: {
      "*": "auditLog",
    },
  },

  // More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
  settings: {
    port: 3000,

    routes: [
      {
        path: "/server",
        callOptions: {
          timeout: 100000,
        },
        authorization: false,

        // The auto-alias feature allows you to declare your route alias directly in your services.
        // The gateway will dynamically build the full routes from service schema.
        // autoAliases: true,

        aliases: {
          health: "$node.health",
          "GET /info": "aayworks.info",
          "GET /:mobile": "user.getUserByMobile",
          // "GET /:id": "user.getUserByUserId",
          "GET /users": "user.getAllUsers",
          "POST /register-worker": "user.registerWorker",
          // "POST /user/verify-user": "user.verifyUser",
          // "POST /user/activate-user": "user.activateUser",
          "GET /user-count": "user.getUserCount",
        },
        whitelist: [
          // Access to any actions in all services under "/server" URL
          "**",
        ],

        bodyParsers: {
          json: {
            strict: false,
            limit: "1MB",
          },
          urlencoded: {
            extended: true,
            limit: "1MB",
          },
        },

        // Mapping policy setting. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Mapping-policy
        mappingPolicy: "all", // Available values: "all", "restrict"

        // Enable/disable logging
        logging: false,
      },
    ],

    // Do not log client side errors (does not log an error response when the error.code is 400<=X<500)
    log4XXResponses: false,
    // Logging the request parameters. Set to any log level to enable it. E.g. "info"
    logRequestParams: null,
    // Logging the response data. Set to any log level to enable it. E.g. "info"
    logResponseData: null,

    // Serve assets from "public" folder
    assets: {
      folder: "./public/",
    },
  },
  actions: {},
  methods: {
    /**
     * Authorize the request
     *
     * @param {Context} ctx
     * @param {Object} _route
     * @param {IncomingMessage} req
     * @returns {Promise}
     */
    authorize(
      ctx: ApiContext,
      _route: Record<string, any>,
      req: http.IncomingMessage
    ) {
      const apiKey = req.headers["x-api-key"];

      if (!apiKey) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (req.$action.auth === "required") {
          return Promise.reject(new UnAuthorizedError(ERR_NO_TOKEN));
        }
        return null;
      }
      // TODO: Get user Permissions from DB
      return { meta: { mobile: "8888888888", userId: 1 } };
      // db.LoginUserByApiKey(apiKey).then((record: any) => {
      //   if (!record) {
      //     return Promise.reject(
      //       new MoleculerClientError("DB Connection error!", 400, "", [])
      //     );
      //   }
      //   const user = record?.recordset?.[0];
      //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   // @ts-ignore
      //   if (!user && req.$action.auth === "required")
      //     return Promise.reject(new UnAuthorizedError(ERR_INVALID_TOKEN));

      //   return this.getUserPermissions(user.id).then(
      //     (permissions: Array<string>) => {
      //       user.permissions = permissions;
      //       ctx.meta.mobile = this.transformEntity(user);
      //       ctx.meta.userId = user.id;
      //       return ctx;
      //     }
      //   );
      // });
    },

    ipWhiteList(ctx: ApiContext) {
      const { req } = ctx?.params;
      if (req?.url?.includes("/trade")) {
        const clientIp =
          req?.headers["x-forwarded-for"] ||
          req?.connection?.remoteAddress ||
          req?.socket?.remoteAddress ||
          req?.connection?.socket?.remoteAddress;

        const { IP_LIST } = process.env;

        const allowIps = (IP_LIST?.split(",") ?? []).filter(Boolean);

        const isLocalhost = clientIp === "127.0.0.1";

        const allowAll = allowIps.length === 0;
        if (!(allowIps.includes(clientIp) || isLocalhost || allowAll)) {
          this.logger.error(`Forbidden for ${clientIp}`);
          throw new Error("Forbidden");
        }
      }
    },

    auditLog(ctx: ApiContext, res: http.ServerResponse) {
      const logTheseMethods = ["PUT", "POST"];
      const { req } = ctx.params;

      if (req && logTheseMethods.includes(req.method)) {
        const responseStatus = res ? "success" : "unknown";

        const clientIp =
          req?.headers["x-forwarded-for"] ||
          req?.connection?.remoteAddress ||
          req?.socket?.remoteAddress ||
          req?.connection?.socket?.remoteAddress;

        const actionParams = req?.body;

        if (actionParams?.user?.password) {
          actionParams.user.password = "<REMOVED>";
        }
        if (actionParams?.password) {
          actionParams.password = "<REMOVED>";
        }

        const logData = {
          action: req?.$action?.name ?? req.url,
          mobile: ctx.meta?.mobile,
          userId: ctx.meta?.userId,
          actionParams: JSON.stringify(actionParams),
          requestHost: req.headers.host,
          requestIp: clientIp,
          apiName: "server",
          responseStatus,
        };

        this.logger.info("Audit Log:", logData);

        // db.SaveAuditLog(logData);
      }
      return res;
    },

    auditErrorLog(ctx: ApiContext, error: Error) {
      const logTheseMethods = ["PUT", "POST"];
      const { req } = ctx.params;

      if (req && logTheseMethods.includes(req.method)) {
        const responseStatus = error.message;

        const clientIp =
          req?.headers["x-forwarded-for"] ||
          req?.connection?.remoteAddress ||
          req?.socket?.remoteAddress ||
          req?.connection?.socket?.remoteAddress;

        const actionParams = req?.body;

        if (actionParams?.user?.password) {
          actionParams.user.password = "<REMOVED>";
        }
        if (actionParams?.password) {
          actionParams.password = "<REMOVED>";
        }

        const logData = {
          action: req?.$action?.name ?? req.url,
          mobile: ctx.meta?.mobile,
          userId: ctx.meta?.userId,
          actionParams: JSON.stringify(actionParams),
          requestHost: req.headers.host,
          requestIp: clientIp,
          apiName: "server",
          responseStatus,
        };

        this.logger.info("Audit Log:", logData);

        // db.SaveAuditLog(logData);
      }

      throw error;
    },
    /**
     * Transform returned user entity. Generate JWT token if necessary.
     *
     * @param {Object} user
     */
    transformEntity(user: { permissions: Array<string> }) {
      return _.pick(user, [
        "parent_id",
        "id",
        "mobile",
        "userName",
        "firstName",
        "lastName",
        "apiKey",
        "permissions",
        "role",
      ]);
    },

    getUserPermissions(userId: string) {
      return { permissions: ["worker", "employer", "superadmin", "admin"] };
      //   db.GetUserPermissions(userId)
      //     .then((record: any) => {
      //       if (!record) {
      //         return Promise.reject(
      //           new MoleculerClientError("Record not found", 400, "", [])
      //         );
      //       }
      //       const { recordset = [] } = record;
      //       return this.transformPermissions(recordset);
      //     })
      //     .catch((error: Error) => {
      //       this.logger.error(error);
      //       return Promise.reject(error);
      //     });
      // },
      // transformPermissions(permissions) {
      //   return permissions.map(
      //     (permission: { permission_id: string }) => permission.permission_id
      //   );
    },
  },
};

// Enable rate limit and https on production
if (process.env.ENABLE_HTTPS === "YES") {
  ApiGateway.settings.https = {
    key: fs.readFileSync(path.join(__dirname, "../ssl/privateKey.key")),
    cert: fs.readFileSync(path.join(__dirname, "../ssl/certificate.pem")),
  };
}

if (process.env.ENABLE_RATE_LIMIT === "YES") {
  ApiGateway.settings.rateLimit = {
    window: 60 * 1000, // (60 seconds)
    limit: 30,
    headers: true,
  };
}

export = Server;
