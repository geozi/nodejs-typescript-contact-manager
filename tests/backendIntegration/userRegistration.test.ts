/**
 * User registration integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { registerUser } from "../../src/presentation/apis/v1/controllers/user.controller";
import { createUserProfile } from "../../src/service/user.service";
import { addUser } from "../../src/persistence/user.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";

describe.only("User registration integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation oriented", () => {
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

      it("username is empty", async () => {
        req = { body: { ...validUserInput } };
        req.body.username = "";

        for (const middleware of registerUser) {
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

        testLogger.info(`userRegistration -> 'username is empty' test OK`);
      });

      it("username is too short", async () => {
        req = { body: { ...validUserInput } };
        req.body.username = invalidUserInputs.TOO_SHORT_USERNAME;

        for (const middleware of registerUser) {
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

        testLogger.info(`userRegistration -> 'username is too short' test OK`);
      });

      it("username is too long", async () => {
        req = { body: { ...validUserInput } };
        req.body.username = invalidUserInputs.TOO_LONG_USERNAME;

        for (const middleware of registerUser) {
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

        testLogger.info(`userRegistration -> 'username is too long' test OK`);
      });

      it("email is undefined", async () => {
        req = { body: { ...validUserInput } };
        req.body.email = undefined;

        for (const middleware of registerUser) {
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
              { message: userFailedValidation.EMAIL_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(`userRegistration -> 'email is undefined' test OK`);
      });

      invalidUserInputs.EMAIL_INVALID_CASES.forEach(
        ([testName, invalidEmail]) => {
          it(testName, async () => {
            req = { body: { ...validUserInput } };
            req.body.email = invalidEmail;

            for (const middleware of registerUser) {
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
                  { message: userFailedValidation.EMAIL_INVALID_MESSAGE },
                ],
              }),
              true
            );

            testLogger.info(`userRegistration -> '${testName}' test OK`);
          });
        }
      );

      it("password is undefined", async () => {
        req = { body: { ...validUserInput } };
        req.body.password = undefined;

        for (const middleware of registerUser) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.PASSWORD_REQUIRED_MESSAGE },
              {
                message: userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE,
              },
              {
                message:
                  userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(`userRegistration -> 'password is undefined' test OK`);
      });

      it("password is too short", async () => {
        req = { body: { ...validUserInput } };
        req.body.password = invalidUserInputs.TOO_SHORT_PASSWORD;

        for (const middleware of registerUser) {
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
                message: userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(`userRegistration -> 'password is too short' test OK`);
      });

      invalidUserInputs.PASSWORD_INVALID_CASES.forEach(
        ([testName, invalidPassword]) => {
          it(testName, async () => {
            req = { body: { ...validUserInput } };
            req.body.password = invalidPassword;

            for (const middleware of registerUser) {
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
                    message:
                      userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE,
                  },
                ],
              }),
              true
            );

            testLogger.info(`userRegistration -> '${testName}' test OK`);
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
      methodStub = sinon.stub({ addUser }, "addUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { ...validUserInput } };
      methodStub.rejects();
      for (const middleware of registerUser) {
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

      testLogger.info(`userRegistration -> 'server error (500)' test OK`);
    });
  });
});
