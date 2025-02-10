/**
 * User login failure integration tests.
 */

import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { loginUser } from "../../src/auth/auth.controller";
import assert from "assert";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import * as userRepository from "../../src/persistence/user.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { authResponseMessages } from "../../src/auth/authResponse.message";

describe("User login failure integration tests ", () => {
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

      it("username is undefined", async () => {
        req = {
          body: {
            username: undefined,
            password: validUserInput.password,
          },
        };

        for (const middleware of loginUser) {
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

        testLogger.info(`userLoginFailure -> 'username is undefined' test OK`);
      });

      it("username is too short", async () => {
        req = {
          body: {
            username: invalidUserInputs.TOO_SHORT_USERNAME,
            password: validUserInput.password,
          },
        };

        for (const middleware of loginUser) {
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

        testLogger.info(`userLoginFailure -> 'username is too short' test OK`);
      });

      it("username is too long", async () => {
        req = {
          body: {
            username: invalidUserInputs.TOO_LONG_USERNAME,
            password: validUserInput.password,
          },
        };

        for (const middleware of loginUser) {
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

        testLogger.info(`userLoginFailure -> 'username is too long' test OK`);
      });

      it("password is undefined", async () => {
        req = {
          body: {
            username: validUserInput.username,
            password: undefined,
          },
        };

        for (const middleware of loginUser) {
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

        testLogger.info(`userLoginFailure -> 'password is undefined' test OK`);
      });

      it("password is too short", async () => {
        req = {
          body: {
            username: validUserInput.username,
            password: invalidUserInputs.TOO_SHORT_PASSWORD,
          },
        };

        for (const middleware of loginUser) {
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

        testLogger.info(`userLoginFailure -> 'password is too short' test OK`);
      });

      invalidUserInputs.PASSWORD_INVALID_CASES.forEach(
        ([testName, invalidPassword]) => {
          it(testName, async () => {
            req = {
              body: {
                username: validUserInput.username,
                password: invalidPassword,
              },
            };

            for (const middleware of loginUser) {
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

            testLogger.info(`userLoginFailure -> '${testName}' test OK`);
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
      methodStub = sinon.stub(userRepository, "getUserByUsername");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = {
        body: {
          username: validUserInput.username,
          password: validUserInput.password,
        },
      };

      methodStub.rejects();
      for (const middleware of loginUser) {
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

      testLogger.info(`userLoginFailure -> 'server error (500)' test OK`);
    });

    it("authentication failed (401)", async () => {
      req = {
        body: {
          username: validUserInput.username,
          password: validUserInput.password,
        },
      };

      methodStub.resolves(null);
      for (const middleware of loginUser) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.UNAUTHORIZED), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: authResponseMessages.AUTHENTICATION_FAILED,
        }),
        true
      );

      testLogger.info(
        `userLoginFailure -> 'authentication failed (401)' test OK`
      );
    });
  });
});
