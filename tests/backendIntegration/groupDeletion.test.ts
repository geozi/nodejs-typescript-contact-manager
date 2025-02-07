/**
 * Contact group deletion integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { groupFailedValidation } from "../../src/domain/messages/groupValidation.message";
import { deleteContactGroup } from "../../src/presentation/apis/v1/controllers/group.controller";
import * as groupRepository from "../../src/persistence/group.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { invalidGroupCases, validGroupInput } from "../testInputs";
import { groupServiceMessages } from "../../src/service/messages/groupService.message";

describe("Contact group deletion integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
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

    it("Group ID is undefined", async () => {
      req = { body: { id: undefined } };

      for (const middleware of deleteContactGroup) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: commonResponseMessages.BAD_REQUEST,
          errors: [
            { message: groupFailedValidation.GROUP_ID_REQUIRED },
            { message: groupFailedValidation.GROUP_ID_INVALID },
            { message: groupFailedValidation.GROUP_ID_OUT_OF_LENGTH },
          ],
        }),
        true
      );

      testLogger.info(`groupDeletion -> 'Group ID is undefined' test OK`);
    });

    invalidGroupCases.GROUP_ID_LENGTH_CASES.forEach(
      ([testName, invalidGroupId]) => {
        it(testName, async () => {
          req = { body: { id: invalidGroupId } };

          for (const middleware of deleteContactGroup) {
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
                { message: groupFailedValidation.GROUP_ID_OUT_OF_LENGTH },
              ],
            }),
            true
          );

          testLogger.info(`groupDeletion -> '${testName}' test OK`);
        });
      }
    );

    invalidGroupCases.GROUP_ID_INVALID_CASES.forEach(
      ([testName, invalidGroupId]) => {
        it(testName, async () => {
          req = { body: { id: invalidGroupId } };

          for (const middleware of deleteContactGroup) {
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
              errors: [{ message: groupFailedValidation.GROUP_ID_INVALID }],
            }),
            true
          );

          testLogger.info(`groupDeletion -> '${testName}' test OK`);
        });
      }
    );
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
      methodStub = sinon.stub(groupRepository, "deleteGroup");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { id: "67a5d79966dcfebc19277f4f", ...validGroupInput } };
      methodStub.rejects();

      for (const middleware of deleteContactGroup) {
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

      testLogger.info(`groupDeletion -> 'server error (500)' test OK`);
    });

    it("not found (404)", async () => {
      req = { body: { id: "67a5d79966dcfebc19277f4f", ...validGroupInput } };
      methodStub.resolves(null);

      for (const middleware of deleteContactGroup) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: groupServiceMessages.GROUP_NOT_FOUND }),
        true
      );

      testLogger.info(`groupDeletion -> 'not found (404)' test OK`);
    });
  });
});
