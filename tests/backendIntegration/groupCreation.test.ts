/**
 * Group creation integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { groupFailedValidation } from "../../src/domain/messages/groupValidation.message";
import { createContactGroup } from "../../src/presentation/apis/v1/controllers/group.controller";
import * as groupService from "../../src/service/group.service";
import * as groupRepository from "../../src/persistence/group.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { invalidGroupCases, validGroupInput } from "../testInputs";

describe.only("Group creation integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(groupService, "createContactGroup", sinon.fake());
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

      it("name is undefined", async () => {
        req = { body: { ...validGroupInput } };
        req.body.name = undefined;

        for (const middleware of createContactGroup) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [{ message: groupFailedValidation.NAME_REQUIRED_MESSAGE }],
          }),
          true
        );

        testLogger.info(`groupCreation -> 'name is undefined' test OK`);
      });

      it("description is undefined", async () => {
        req = { body: { ...validGroupInput } };
        req.body.description = undefined;

        for (const middleware of createContactGroup) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: groupFailedValidation.DESCRIPTION_REQUIRED_MESSAGE },
              { message: groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH },
            ],
          }),
          true
        );

        testLogger.info(`groupCreation -> 'description is undefined' test OK`);
      });

      it("description is too short", async () => {
        req = { body: { ...validGroupInput } };
        req.body.description = invalidGroupCases.TOO_SHORT_DESCRIPTION;

        for (const middleware of createContactGroup) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH },
            ],
          }),
          true
        );

        testLogger.info(`groupCreation -> 'description is too short' test OK`);
      });

      it("description is too long", async () => {
        req = { body: { ...validGroupInput } };
        req.body.description = invalidGroupCases.TOO_LONG_DESCRIPTION;

        for (const middleware of createContactGroup) {
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
                message:
                  groupFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(`groupCreation -> 'description is too long' test OK`);
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
      methodStub = sinon.stub(groupRepository, "addGroup");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { ...validGroupInput } };
      methodStub.rejects();

      for (const middleware of createContactGroup) {
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

      testLogger.info(`groupCreation -> 'server error (500)' test OK`);
    });
  });
});
