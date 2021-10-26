import { Response, Request } from "express";
import GroupController from "../controllers/groupController";
import { IGroup } from "../models/groupInterface";
import InMemoryGroupService from "../services/inMemoryGroupService";

describe("GroupController", () => {
  const storageService = new InMemoryGroupService();
  const groupController = new GroupController(storageService);

  const mockRequest = (obj = {}): Request => {
    const req = obj;
    return req as Request;
  };

  const mNext = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("getAll method: should return list of groups", async () => {
    const expectedList = [
      {
        id: "2e1afe61-4eab-47dc-bb64-431b88ab46c8",
        name: "admins",
        permissions: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"],
      },
      { id: "3d40db2d-4670-4034-a505-9d3d0c8fff9b", name: "superusers", permissions: ["READ", "WRITE", "DELETE"] },
      { id: "fda96534-4d31-44af-98a5-4719df6d94a3", name: "superstudents", permissions: ["READ"] },
    ];
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest();
    await groupController.getAll(mReq, mockResponse as Response);
    expect(responseObject).toEqual(expectedList);
  });

  test("createGroup method: should return group object", async () => {
    const expectedGroup = { name: "tutor", permissions: ["READ", "SHARE", "UPLOAD_FILES"] };
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ body: { name: "tutor", permissions: ["READ", "SHARE", "UPLOAD_FILES"] } });
    await groupController.createGroup(mReq, mockResponse as Response);
    expect((responseObject as IGroup).name).toBe(expectedGroup.name);
    expect((responseObject as IGroup).permissions).toEqual(expectedGroup.permissions);
  });

  test("updateGroupById method: should return updated group object", async () => {
    const expectedGroup = {
      id: "2e1afe61-4eab-47dc-bb64-431b88ab46c8",
      name: "parents",
      permissions: ["READ"],
    };
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({
      params: { id: "2e1afe61-4eab-47dc-bb64-431b88ab46c8" },
      body: { name: "parents", permissions: ["READ"] },
    });
    await groupController.updateGroupById(mReq, mockResponse as Response, mNext);
    expect(responseObject).toEqual(expectedGroup);
  });

  test("updateGroupById method: should throw error on nextfunction if there is no group with such id", async () => {
    const mReq = mockRequest({
      params: { id: "2e1afe61-4eab-47dc-bb64" },
      body: { name: "parents", permissions: ["READ"] },
    });
    let responseObject = {};
    /* eslint-disable */
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    }; /* eslint-enable */

    await groupController.updateGroupById(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });

  test("deleteGroup method: should return group object by id", async () => {
    const expecteMessage = "Group 2e1afe61-4eab-47dc-bb64-431b88ab46c8 Deleted";
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ params: { id: "2e1afe61-4eab-47dc-bb64-431b88ab46c8" } });
    await groupController.deleteGroup(mReq, mockResponse as Response, mNext);
    expect(responseObject).toBe(expecteMessage);
  });

  test("deleteGroup method: should throw error on nextfunction if there is no group with such id", async () => {
    const mReq = mockRequest({ params: { id: "2e1afe61-4eab-47dc-bb64-431b88ab46c8" } });
    let responseObject = {};
    /* eslint-disable */
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    /* eslint-enable */
    await groupController.deleteGroup(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });

  test("getGroupById method: should return group object by id", async () => {
    const expectedGroup = {
      id: "3d40db2d-4670-4034-a505-9d3d0c8fff9b",
      name: "superusers",
      permissions: ["READ", "WRITE", "DELETE"],
    };
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({ params: { id: "3d40db2d-4670-4034-a505-9d3d0c8fff9b" } });
    await groupController.getGroupById(mReq, mockResponse as Response, mNext);
    expect(responseObject).toEqual(expectedGroup);
  });

  test("getGroupById method: should throw error on nextfunction if there is no group with such id", async () => {
    const mReq = mockRequest({ params: { id: "3d40db2d-4670-4034-a505" } });
    /* eslint-disable */
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    /* eslint-enable */
    await groupController.getGroupById(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });

  test("addUsersToGroup method: should return group object when transtaction of adding users resolved", async () => {
    const expectedGroup = {
      id: "3d40db2d-4670-4034-a505-9d3d0c8fff9b",
      name: "superusers",
      permissions: ["READ", "WRITE", "DELETE"],
    };
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    const mReq = mockRequest({
      body: {
        group: "3d40db2d-4670-4034-a505-9d3d0c8fff9b",
        users: ["c77b646a-7696-4ea9-aeea-bcbdb13a45f1", "38cdc7e4-0369-4b91-9370-032b1370c635"],
      },
    });
    await groupController.addUsersToGroup(mReq, mockResponse as Response, mNext);
    expect(responseObject).toEqual(expectedGroup);
  });

  test("addUsersToGroup method: should throw error on nextfunction if transtaction of adding users was failed", async () => {
    const mReq = mockRequest({ body: { group: "3d40db2d-4670-4034-a505-9d3d0c8fff9b", users: [] } });
    /* eslint-disable */
    let responseObject = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
      }),
    };
    /* eslint-enable */
    await groupController.addUsersToGroup(mReq, mockResponse as Response, mNext);
    expect(mNext).toBeCalled();
  });
});
