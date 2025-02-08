/**
 * User fetching by role integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";
import { invalidUserInputs, validUserInput } from "../testInputs";
import { fetchUsersByRole } from "../../src/presentation/apis/v1/controllers/user.controller";
import { retrieveUsersByRole } from "../../src/service/user.service";
import * as userRepository from "../../src/persistence/user.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { userServiceMessages } from "../../src/service/messages/userService.message";
import { IUser } from "../../src/domain/interfaces/iUser.interface";

describe("Role-based user fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveUsersByRole },
          "retrieveUsersByRole",
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

      it("role is undefined", async () => {
        req = { body: { role: undefined } };

        for (const middleware of fetchUsersByRole) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: userFailedValidation.ROLE_REQUIRED_MESSAGE },
              {
                message: userFailedValidation.ROLE_INVALID_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `Role-based user fetching -> 'role is undefined' test OK`
        );
      });

      it("role is invalid", async () => {
        req = { body: { role: invalidUserInputs.ROLE_INVALID } };

        for (const middleware of fetchUsersByRole) {
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
                message: userFailedValidation.ROLE_INVALID_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `Role-based user fetching -> 'role is invalid' test OK`
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
      methodStub = sinon.stub(userRepository, "getUsersByRole");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { role: validUserInput.role } };
      methodStub.rejects();

      for (const middleware of fetchUsersByRole) {
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
        `Role-based user fetching -> 'server error (500)' test OK`
      );
    });

    it("not found (404)", async () => {
      req = { body: { role: validUserInput.role } };
      const mockUsers: Array<IUser> = [];
      methodStub.resolves(mockUsers);

      for (const middleware of fetchUsersByRole) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: userServiceMessages.USERS_NOT_FOUND }),
        true
      );

      testLogger.info(`Role-based user fetching -> 'not found (404)' test OK`);
    });
  });
});
