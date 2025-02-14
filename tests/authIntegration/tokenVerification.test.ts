/**
 * Token verification integration tests.
 */
import sinon, { SinonSpy, SinonStub } from "sinon";
import assert from "assert";
import { Request, Response } from "express";
import { authResponseMessages } from "../../src/auth/authResponse.message";
import { verifyToken } from "../../src/auth/auth.controller";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { authHeaderInvalidCases, authHeaderRequiredCases } from "../testInputs";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
dotenv.config();

describe("Token verification integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("bad requests (400)", () => {
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

    authHeaderRequiredCases.forEach(([testName, missingAuthHeader]) => {
      it(testName, async () => {
        req = {
          headers: { authorization: missingAuthHeader },
          body: {},
        };

        for (const middleware of verifyToken) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: authResponseMessages.AUTHORIZATION_HEADER_REQUIRED },
              { message: authResponseMessages.AUTHORIZATION_TOKEN_INVALID },
            ],
          }),
          true
        );

        testLogger.info(`webTokenOps -> '${testName}' test OK`);
      });
    });

    authHeaderInvalidCases.forEach(([testName, invalidToken]) => {
      it(testName, async () => {
        req = {
          headers: { authorization: invalidToken },
          body: {},
        };

        for (const middleware of verifyToken) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: authResponseMessages.AUTHORIZATION_TOKEN_INVALID },
            ],
          }),
          true
        );

        testLogger.info(`webTokenOps -> '${testName}' test OK`);
      });
    });

    it("token is invalid", async () => {
      const invalidToken = jwt.sign(
        { loggedInUser: "testUser" },
        process.env.TEST_KEY as string,
        { expiresIn: "1h" }
      );

      req = { headers: { authorization: `Bearer ${invalidToken}` }, body: {} };

      for (const middleware of verifyToken) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.FORBIDDEN), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: authResponseMessages.AUTHORIZATION_FAILED,
        }),
        true
      );

      testLogger.info(`webTokenOps -> 'token is invalid' test OK`);
    });
  });
});
