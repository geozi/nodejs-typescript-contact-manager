/**
 * User collection database integration test.
 */
import mongoose, { ConnectOptions } from "mongoose";
import { registerUser } from "../../src/presentation/apis/v1/controllers/user.controller";
import assert from "assert";
import { userControllerResponseMessages } from "../../src/presentation/messages/userControllerResponse.message";
import sinon, { SinonStub, SinonSpy } from "sinon";
import { validUserInput } from "../testInputs";
import * as dotenv from "dotenv";
import { Request, Response } from "express";
import User from "../../src/domain/models/user.model";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
dotenv.config();

describe("User collection integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  before(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true } as ConnectOptions
    );
  });

  after(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(() => {
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("new user registered (201)", async () => {
    req = { body: validUserInput };

    for (const middleware of registerUser) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
    assert.strictEqual(
      jsonSpy.calledWith({
        message: userControllerResponseMessages.USER_REGISTERED,
      }),
      true
    );

    testLogger.info(`userCollection -> 'new user registered (201)' test OK`);
  });
});
