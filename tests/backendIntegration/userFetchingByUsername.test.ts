/**
 * User fetching by username integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { fetchUserByUsername } from "../../src/presentation/apis/v1/controllers/user.controller";
import { retrieveUserByUsername } from "../../src/service/user.service";
import * as userRepository from "../../src/persistence/user.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { userServiceMessages } from "../../src/service/messages/userService.message";

describe.only("Username-based user fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveUserByUsername },
          "retrieveUserByUsername",
          sinon.fake()
        );
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

      it("username is undefined", async () => {
        req = { body: { username: undefined } };

        for (const middleware of fetchUserByUsername) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.USERNAME_REQUIRED_MESSAGE },
              {
                message: userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `Username-based user fetching -> 'username is undefined' test OK`
        );
      });

      it("username is too short", async () => {
        req = { body: { username: invalidUserInputs.TOO_SHORT_USERNAME } };

        for (const middleware of fetchUserByUsername) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              {
                message: userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `Username-based user fetching -> 'username is too short' test OK`
        );
      });

      it("username is too long", async () => {
        req = { body: { username: invalidUserInputs.TOO_LONG_USERNAME } };

        for (const middleware of fetchUserByUsername) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              {
                message: userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `Username-based user fetching -> 'username is too long' test OK`
        );
      });
    });
  });

  describe("promise-oriented", () => {
    let methodStub: SinonStub;

    beforeEach(() => {
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }),
        json: sinon.spy(),
      };

      next = sinon.spy();
      methodStub = sinon.stub(userRepository, "getUserByUsername");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { username: validUserInput.username } };
      methodStub.rejects();

      for (const middleware of fetchUserByUsername) {
        await middleware(req as Request, res as Response, next);
      }

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

      testLogger.info(
        `Username-based user fetching -> 'server error (500)' test OK`
      );
    });

    it("not found (404)", async () => {
      req = { body: { username: validUserInput.username } };
      methodStub.resolves(null);

      for (const middleware of fetchUserByUsername) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: userServiceMessages.USER_NOT_FOUND }),
        true
      );

      testLogger.info(
        `Username-based user fetching -> 'not found (404)' test OK`
      );
    });
  });
});
