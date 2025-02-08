/**
 * User fetching by email integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { fetchUserByEmail } from "../../src/presentation/apis/v1/controllers/user.controller";
import { retrieveUserByEmail } from "../../src/service/user.service";
import * as userRepository from "../../src/persistence/user.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { userServiceMessages } from "../../src/service/messages/userService.message";

describe.only("Email-based user fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveUserByEmail },
          "retrieveUserByEmail",
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

      it("email is undefined", async () => {
        req = { body: { email: undefined } };

        for (const middleware of fetchUserByEmail) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.EMAIL_REQUIRED_MESSAGE },
              {
                message: userFailedValidation.EMAIL_INVALID_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `Email-based user fetching -> 'email is undefined' test OK`
        );
      });

      invalidUserInputs.EMAIL_INVALID_CASES.forEach(
        ([testName, invalidEmail]) => {
          it(testName, async () => {
            req = { body: { email: invalidEmail } };

            for (const middleware of fetchUserByEmail) {
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
                  {
                    message: userFailedValidation.EMAIL_INVALID_MESSAGE,
                  },
                ],
              }),
              true
            );

            testLogger.info(
              `Email-based user fetching -> '${testName}' test OK`
            );
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
        }),
        json: sinon.spy(),
      };

      next = sinon.spy();
      methodStub = sinon.stub(userRepository, "getUserByEmail");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { email: validUserInput.email } };
      methodStub.rejects();

      for (const middleware of fetchUserByEmail) {
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
        `Email-based user fetching -> 'server error (500)' test OK`
      );
    });

    it("not found (404)", async () => {
      req = { body: { email: validUserInput.email } };
      methodStub.resolves(null);

      for (const middleware of fetchUserByEmail) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: userServiceMessages.USER_NOT_FOUND }),
        true
      );

      testLogger.info(`Email-based user fetching -> 'not found (404)' test OK`);
    });
  });
});
