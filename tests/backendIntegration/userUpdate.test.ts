/**
 * User update integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { userServiceMessages } from "../../src/service/messages/userService.message";
import { createUserProfile } from "../../src/service/user.service";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { updateUserInfo } from "../../src/presentation/apis/v1/controllers/user.controller";

describe.only("User update integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace({ createUserProfile }, "createUserProfile", sinon.fake());
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

        for (const middleware of updateUserInfo) {
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
      });

      invalidUserInputs.USER_ID_LENGTH_CASES.forEach(
        ([testName, invalidUserId]) => {
          it(testName, async () => {
            req = { body: { id: invalidUserId } };

            for (const middleware of updateUserInfo) {
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
          });
        }
      );

      invalidUserInputs.USER_ID_INVALID_CASES.forEach(
        ([testName, invalidUserId]) => {
          it(testName, async () => {
            req = { body: { id: invalidUserId } };

            for (const middleware of updateUserInfo) {
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
          });
        }
      );
    });
  });
});
