import { loggerError } from "../utils/loggerConfig";
import { ResponseError } from "../models/responseError";

export function TryCatch() {
  return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;
    descriptor.value = async function (...args: any) {
      try {
        await method.apply(this, args);
      } catch (error) {
        loggerError.error((error as ResponseError).message);
        const [, , next] = args;
        next(error);
      }
    };
  };
}
