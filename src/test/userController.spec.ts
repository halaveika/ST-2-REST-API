import { Response, Request } from "express";
import UserController from "../controllers/userController";
import { IUser } from "../models/userInterface";
import InMemoryUserService from "../services/inMemoryUserService";

describe("UserController", () => {
  const storageService = new InMemoryUserService(); // sync data service
  const userController = new UserController(storageService);

  const mockRequest = (obj = {}): Request => {
    const req = obj;
    return req as Request;
  };

  const mNext = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getAutoSuggestList method: should return list of users", async () => {
    const expectedList = [
      {
        id: "38cdc7e4-0369-4b91-9370-032b1370c635",
        login: "Alex123",
        password: "43fhaf5",
        age: 46,
        isDeleted: false,
      },
      {
        id: "c77b646a-7696-4ea9-aeea-bcbdb13a45f1",
        login: "Alexander13",
        password: "43adaffhdaf5",
        age: 44,
        isDeleted: false,
      },
    ];
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ query: { loginSubstring: "Alex", limit: "10" } });
    await userController.getAutoSuggestList(mReq, mockResponse as Response, mNext);
    expect(responseObject).toEqual(expectedList);
  });

  test("getAutoSuggestList method: should throw error on nextfunction if there is no user with such substring", async () => {
    const mReq = mockRequest({ query: { loginSubstring: "Kokoko", limit: "10" } });
    let responseObject = {};
    /* eslint-disable */
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    /* eslint-enable */
    await userController.getAutoSuggestList(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });

  test("createUser method: should return user object", async () => {
    const expectedUser = {
      login: "Rambo123",
      password: "31445dfD",
      age: 46,
      isDeleted: false,
    };
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ body: { login: "Rambo123", password: "31445dfD", age: 46 } });
    await userController.createUser(mReq, mockResponse as Response);
    expect((responseObject as IUser).login).toBe(expectedUser.login);
    expect((responseObject as IUser).password).toBe(expectedUser.password);
    expect((responseObject as IUser).age).toBe(expectedUser.age);
    expect((responseObject as IUser).isDeleted).toBe(expectedUser.isDeleted);
  });

  test("updateUserById method: should return updated user object", async () => {
    const expectedUser = {
      id: "c77b646a-7696-4ea9-aeea-bcbdb13a45f1",
      login: "Bulbo1233",
      password: "314f45dfD",
      age: 55,
      isDeleted: false,
    };
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({
      params: { id: "c77b646a-7696-4ea9-aeea-bcbdb13a45f1" },
      body: { login: "Bulbo1233", password: "314f45dfD", age: 55 },
    });
    await userController.updateUserById(mReq, mockResponse as Response, mNext);
    expect(responseObject).toEqual(expectedUser);
  });

  test("updateUserById method: should throw error on nextfunction if there is no user with such id", async () => {
    const mReq = mockRequest({
      params: { id: "ceerdb646a-7696-4ea9-aeea-bcbdb13a45f1" },
      body: { login: "Bulbo1233", password: "314f45dfD", age: 55 },
    });
    let responseObject = {};
    /* eslint-disable */
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    }; /* eslint-enable */

    await userController.getUserById(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });

  test("deleteSoftUser method: should return user object by id", async () => {
    const expecteMessage = "User c77b646a-7696-4ea9-aeea-bcbdb13a45f1 Deleted";
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ params: { id: "c77b646a-7696-4ea9-aeea-bcbdb13a45f1" } });
    await userController.deleteSoftUser(mReq, mockResponse as Response, mNext);
    expect(responseObject).toBe(expecteMessage);
  });

  test("deleteSoftUser method: should throw error on nextfunction if there is no user with such id", async () => {
    const mReq = mockRequest({ params: { id: "ceerdb646a-0369-4b91-9370-032b1370c630" } });
    let responseObject = {};
    /* eslint-disable */
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    /* eslint-enable */
    await userController.deleteSoftUser(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });

  test("getUserById method: should return user object by id", async () => {
    const expectedUser = {
      id: "38cdc7e4-0369-4b91-9370-032b1370c635",
      login: "Alex123",
      password: "43fhaf5",
      age: 46,
      isDeleted: false,
    };
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ params: { id: "38cdc7e4-0369-4b91-9370-032b1370c635" } });
    await userController.getUserById(mReq, mockResponse as Response, mNext);
    expect(responseObject).toEqual(expectedUser);
  });

  test("getUserById method: should throw error on nextfunction if there is no user with such id", async () => {
    const mReq = mockRequest({ params: { id: "38cdc7e4-0369-4b91-9370-032b1370c630" } });
    /* eslint-disable */
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    /* eslint-enable */
    await userController.getUserById(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });
});
