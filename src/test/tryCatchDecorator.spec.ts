import { TryCatch } from "../utils/tryCatchDecorator";

describe("@TryCatch", () => {
  class Test {
    @TryCatch()
    randomMethod(args: any) {
      if (args instanceof Error) {
        throw args;
      }
      mNext(args);
    }
  }

  const mNext = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("decorator is defined", async () => {
    expect(TryCatch).toBeDefined();
  });

  test("should be pass the value to nextFunction if there is no error", function () {
    const testClass = new Test();
    const testObj = { test: "test" };
    testClass.randomMethod(testObj);
    expect(mNext).toBeCalled();
  });
});
