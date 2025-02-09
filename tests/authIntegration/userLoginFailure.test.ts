/**
 * User login failure integration tests.
 */

import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { validUserInput } from "../testInputs";
import { loginUser } from "../../src/auth/auth.controller";
import assert from "assert";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import * as userRepository from "../../src/persistence/user.repository";
import { userServiceMessages } from "../../src/service/messages/userService.message";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";

describe.only("User login failure integration tests ", () => {
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
    });
  });
});
