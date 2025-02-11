/**
 * User login success integration test(s).
 */

import sinon, { SinonStub, SinonSpy } from "sinon";
import { Request, Response } from "express";
import assert from "assert";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginUser } from "../../src/auth/auth.controller";
import { IUser } from "../../src/domain/interfaces/iUser.interface";
import * as userService from "../../src/service/user.service";
import { testToken, validUserInput } from "../testInputs";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { authResponseMessages } from "../../src/auth/authResponse.message";
import { testLogger } from "../../logs/logger.config";

describe("User login success integration test(s)", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let retrieveUserStub: SinonStub;
  let bcryptCompareStub: SinonStub;
  let jwtSignStub: SinonStub;

  beforeEach(() => {
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();

    retrieveUserStub = sinon.stub(userService, "retrieveUserByUsername");
    bcryptCompareStub = sinon.stub(bcrypt, "compare");
    jwtSignStub = sinon.stub(jwt, "sign");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("valid inputs", async () => {
    const mockUser: Partial<IUser> = {};
    retrieveUserStub.resolves(mockUser);
    bcryptCompareStub.resolves(true);
    jwtSignStub.returns(testToken);

    req = {
      body: {
        username: validUserInput.username,
        password: validUserInput.password,
      },
    };

    for (const middleware of loginUser) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);
    assert.strictEqual(
      jsonSpy.calledWith({
        message: authResponseMessages.AUTHENTICATION_SUCCESS,
        token: testToken,
      }),
      true
    );

    testLogger.info(`userLoginSuccess -> 'valid inputs' test OK`);
  });
});
