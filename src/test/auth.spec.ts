import { Response, Request } from "express";
import Auth from "../middleware/auth";
import InMemoryUserService from "../services/inMemoryUserService";

describe("Authmiddleware", () => {
  const storageService = new InMemoryUserService(); // sync data service
  const auth = new Auth(storageService);
  let token: any;

  const mockRequest = (obj = {}): Request => {
    const req = obj;
    return req as Request;
  };

  const mNext = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("login method: should return jwt token", async () => {
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ body: { login: "Boba23", password: "43ad523af5" } });
    await auth.login(mReq, mockResponse as Response);
    token = responseObject;
    expect(responseObject).not.toBeFalsy();
  });

  test("login method: should return status code 401", async () => {
    const mReq = mockRequest({ body: { login: "Qeett23", password: "43ad523af5" } });
    const mRes = {} as Response;
    const mockStatus = jest.fn().mockReturnValue(mRes);
    mRes.status = mockStatus;
    const mockJson = jest.fn().mockReturnValue(mRes);
    mRes.send = mockJson;
    await auth.login(mReq, mRes as Response);
    expect(mRes.status).toHaveBeenCalledWith(401);
  });

  test("checkToken method: should call next function if received token is verifed", async () => {
    const mReq = mockRequest({ headers: { authorization: "Bearer " + token } });
    let responseObject = {};
    /* eslint-disable */
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    /* eslint-enable */
    await auth.checkToken(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });

  test("checkToken method: should return status code 403 if received token is verifed ", async () => {
    const mReq = mockRequest({ headers: { authorization: token } });
    const mRes = {} as Response;
    const mockStatus = jest.fn().mockReturnValue(mRes);
    mRes.status = mockStatus;
    const mockJson = jest.fn().mockReturnValue(mRes);
    mRes.send = mockJson;
    await auth.checkToken(mReq, mRes as Response, mNext);
    expect(mRes.status).toHaveBeenCalledWith(403); /* eslint-disable */
  });

  test("checkToken method: should return status code 401 if request does not have authorization header ", async () => {
    const mReq = mockRequest({ headers: {} });
    const mRes = {} as Response;
    const mockStatus = jest.fn().mockReturnValue(mRes);
    mRes.status = mockStatus;
    const mockJson = jest.fn().mockReturnValue(mRes);
    mRes.send = mockJson;
    await auth.checkToken(mReq, mRes as Response, mNext);
    expect(mRes.status).toHaveBeenCalledWith(401);
  });
});
