/**
 * User deletion integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { userServiceMessages } from "../../src/service/messages/userService.message";
import { deleteUserInfo } from "../../src/presentation/apis/v1/controllers/user.controller";
import * as userRepository from "../../src/persistence/user.repository";
import { invalidUserInputs } from "../testInputs";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";

describe("User deletion integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
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

      it("user ID is undefined", async () => {
        req = { body: { id: undefined } };

        for (const middleware of deleteUserInfo) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.USER_ID_REQUIRED },
              { message: userFailedValidation.USER_ID_INVALID },
              { message: userFailedValidation.USER_ID_OUT_OF_LENGTH },
            ],
          }),
          true
        );

        testLogger.info(`userDeletion -> 'user ID is undefined' test OK`);
      });

      invalidUserInputs.USER_ID_LENGTH_CASES.forEach(
        ([testName, invalidUserId]) => {
          it(testName, async () => {
            req = { body: { id: invalidUserId } };

            for (const middleware of deleteUserInfo) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(
              statusStub.calledWith(httpCodes.BAD_REQUEST),
              true
            );
            assert.strictEqual(
              jsonSpy.calledWith({
                message: commonResponseMessages.BAD_REQUEST,
                errors: [
                  { message: userFailedValidation.USER_ID_OUT_OF_LENGTH },
                ],
              }),
              true
            );

            testLogger.info(`userDeletion -> '${testName}' test OK`);
          });
        }
      );

      invalidUserInputs.USER_ID_INVALID_CASES.forEach(
        ([testName, invalidUserId]) => {
          it(testName, async () => {
            req = { body: { id: invalidUserId } };

            for (const middleware of deleteUserInfo) {
              await middleware(req as Request, res as Response, next);
            }

            const statusStub = res.status as SinonStub;
            const jsonSpy = res.json as SinonSpy;

            assert.strictEqual(
              statusStub.calledWith(httpCodes.BAD_REQUEST),
              true
            );
            assert.strictEqual(
              jsonSpy.calledWith({
                message: commonResponseMessages.BAD_REQUEST,
                errors: [{ message: userFailedValidation.USER_ID_INVALID }],
              }),
              true
            );

            testLogger.info(`userDeletion -> '${testName}' test OK`);
          });
        }
      );
    });
  });

  describe("promise-oriented", () => {
    let methodStub: SinonStub;

    beforeEach(() => {
      res = {
        status: sinon.stub().callsFake(() => {
          return res;
        }) as unknown as SinonStub,
        json: sinon.spy(),
      };

      next = sinon.spy();
      methodStub = sinon.stub(userRepository, "deleteUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { id: "67a5d79966dcfebc19277f4f" } };
      methodStub.rejects();

      for (const middleware of deleteUserInfo) {
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

      testLogger.info(`userDeletion -> 'server error (500)' test OK`);
    });

    it("not found (404)", async () => {
      req = { body: { id: "67a5d79966dcfebc19277f4f" } };
      methodStub.resolves(null);

      for (const middleware of deleteUserInfo) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: userServiceMessages.USER_NOT_FOUND }),
        true
      );

      testLogger.info(`userDeletion -> 'not found (404)' test OK`);
    });
  });
});
