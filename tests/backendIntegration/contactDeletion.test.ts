/**
 * Contact deletion integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { deleteContactRecord } from "../../src/presentation/apis/v1/controllers/contact.controller";
import * as contactService from "../../src/service/contact.service";
import * as contactRepository from "../../src/persistence/contact.repository";
import { validContactInput, invalidGroupCases } from "../testInputs";
import { commonFailedValidation } from "../../src/domain/messages/commonValidation.message";
import { contactServiceMessages } from "../../src/service/messages/contactService.message";

describe("Contact deletion integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("bad requests (400)", () => {
    beforeEach(() => {
      sinon.replace(contactService, "deleteContactRecord", sinon.fake());
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

    it("id is undefined", async () => {
      req = { body: { ...validContactInput } };
      req.body.id = undefined;

      for (const middleware of deleteContactRecord) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: commonResponseMessages.BAD_REQUEST,
          errors: [
            { message: commonFailedValidation.MONGODB_ID_REQUIRED },
            { message: commonFailedValidation.MONGODB_ID_INVALID },
            { message: commonFailedValidation.MONGODB_ID_OUT_OF_LENGTH },
          ],
        }),
        true
      );

      testLogger.info(`contactDeletion -> 'id is undefined' test OK`);
    });

    invalidGroupCases.GROUP_ID_LENGTH_CASES.forEach(
      ([testName, invalidGroupId]) => {
        it("id " + testName.substring(9), async () => {
          req = { body: { ...validContactInput } };
          req.body.id = invalidGroupId;

          for (const middleware of deleteContactRecord) {
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
                  message: commonFailedValidation.MONGODB_ID_OUT_OF_LENGTH,
                },
              ],
            }),
            true
          );

          testLogger.info(
            `contactDeletion -> 'id ${testName.substring(9)}' test OK`
          );
        });
      }
    );

    invalidGroupCases.GROUP_ID_INVALID_CASES.forEach(
      ([testName, invalidGroupId]) => {
        it("id " + testName.substring(9), async () => {
          req = { body: { ...validContactInput } };
          req.body.id = invalidGroupId;

          for (const middleware of deleteContactRecord) {
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
                  message: commonFailedValidation.MONGODB_ID_INVALID,
                },
              ],
            }),
            true
          );

          testLogger.info(
            `contactDeletion -> 'id ${testName.substring(9)}' test OK`
          );
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
        }),
        json: sinon.spy(),
      };

      next = sinon.spy();
      methodStub = sinon.stub(contactRepository, "deleteContact");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { id: "67a77bcf9d38a3c9413150fc" } };
      methodStub.rejects();

      for (const middleware of deleteContactRecord) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(
        statusStub.calledWith(httpCodes.INTERNAL_SERVER_ERROR),
        true
      );
      assert.strictEqual(
        jsonSpy.calledWith({
          message: commonServiceMessages.SERVER_ERROR,
        }),
        true
      );

      testLogger.info(`contactDeletion -> 'server error (500)' test OK`);
    });

    it("not found (404)", async () => {
      req = { body: { id: "67a77bcf9d38a3c9413150fc" } };
      methodStub.resolves(null);

      for (const middleware of deleteContactRecord) {
        await middleware(req as Request, res as Response, next);
      }

      const statusStub = res.status as SinonStub;
      const jsonSpy = res.json as SinonSpy;

      assert.strictEqual(statusStub.calledWith(httpCodes.NOT_FOUND), true);
      assert.strictEqual(
        jsonSpy.calledWith({
          message: contactServiceMessages.CONTACT_NOT_FOUND,
        }),
        true
      );

      testLogger.info(`contactDeletion -> 'not found (404)' test OK`);
    });
  });
});
