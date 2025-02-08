/**
 * Contact group fetching by name integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { groupFailedValidation } from "../../src/domain/messages/groupValidation.message";
import { validGroupInput } from "../testInputs";
import { fetchContactGroupByName } from "../../src/presentation/apis/v1/controllers/group.controller";
import { retrieveContactGroupByName } from "../../src/service/group.service";
import * as groupRepository from "../../src/persistence/group.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { groupServiceMessages } from "../../src/service/messages/groupService.message";

describe("Name-based group fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveContactGroupByName },
          "retrieveContactGroupByName",
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

      it("name is undefined", async () => {
        req = { body: { name: undefined } };

        for (const middleware of fetchContactGroupByName) {
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

        testLogger.info(
          `Name-based group fetching -> 'name is undefined' test OK`
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
      methodStub = sinon.stub(groupRepository, "getGroupByName");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { name: validGroupInput.name } };
      methodStub.rejects();

      for (const middleware of fetchContactGroupByName) {
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
        `Name-based group fetching -> 'server error (500)' test OK`
      );
    });

    it("not found (404)", async () => {
      req = { body: { name: validGroupInput.name } };
      methodStub.resolves(null);

      for (const middleware of fetchContactGroupByName) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({ message: groupServiceMessages.GROUP_NOT_FOUND }),
        true
      );

      testLogger.info(`Name-based group fetching -> 'not found (404)' test OK`);
    });
  });
});
