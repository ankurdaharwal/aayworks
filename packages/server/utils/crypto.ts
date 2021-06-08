import { randomBytes } from "crypto";
import { privateToAddress, toBuffer } from "ethereumjs-util";

export const keyGen = (): any => {
  const privateKey = "0x" + randomBytes(32).toString("hex");
  const address = "0x" + privateToAddress(toBuffer(privateKey)).toString("hex");
  return address;
};
