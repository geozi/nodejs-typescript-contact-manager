/**
 * Token authentication integration tests.
 */
import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import assert from "assert";
import * as userRepository from "../../src/persistence/user.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { testLogger } from "../../logs/logger.config";
import { testToken } from "../testInputs";
import { authenticateToken } from "../../src/auth/auth.controller";
import { authResponseMessages } from "../../src/auth/authResponse.message";

describe("Token authentication integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;
  let methodStub: SinonStub;

  beforeEach(() => {
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();
    methodStub = sinon.stub(userRepository, "getUserByUsername");
  });

  afterEach(() => {
    sinon.restore();
  });

  it("server error (500)", async () => {
    req = {
      headers: { authorization: `Bearer ${testToken}` },
      body: { username: undefined },
    };
    methodStub.rejects();

    await authenticateToken(req as Request, res as Response, next);

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(
      statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR),
      true
    );
    assert.strictEqual(
      jsonSpy.calledWith({ message: commonServiceMessages.SERVER_ERROR }),
      true
    );

    testLogger.info(`authenticateToken -> 'server error (500)' test OK`);
  });

  it("forbidden (403)", async () => {
    req = {
      headers: { authorization: `Bearer ${testToken}` },
      body: { username: undefined },
    };
    methodStub.resolves(null);

    await authenticateToken(req as Request, res as Response, next);

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.FORBIDDEN), true);
    assert.strictEqual(
      jsonSpy.calledWith({
        message: authResponseMessages.AUTHORIZATION_FAILED,
      }),
      true
    );

    testLogger.info(`authenticateToken -> 'forbidden (403)' test OK`);
  });
});
