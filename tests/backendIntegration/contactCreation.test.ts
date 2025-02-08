/**
 * Contact creation integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { contactFailedValidation } from "../../src/domain/messages/contactValidation.message";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { createContactRecord } from "../../src/presentation/apis/v1/controllers/contact.controller";
import * as contactService from "../../src/service/contact.service";
import * as contactRepository from "../../src/persistence/contact.repository";
import {
  validContactInput,
  invalidContactCases,
  invalidGroupCases,
} from "../testInputs";
import { groupFailedValidation } from "../../src/domain/messages/groupValidation.message";

describe("Contact creation integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(contactService, "createContactRecord", sinon.fake());
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

      it("firstName is undefined", async () => {
        req = { body: { ...validContactInput } };
        req.body.firstName = undefined;

        for (const middleware of createContactRecord) {
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
                message: contactFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
              },
              {
                message:
                  contactFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
              },
              { message: contactFailedValidation.FIRST_NAME_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'firstName is undefined' test OK`);
      });

      it("firstName is invalid", async () => {
        req = { body: { ...validContactInput } };
        req.body.firstName = invalidContactCases.INVALID_FIRST_NAME;

        for (const middleware of createContactRecord) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: contactFailedValidation.FIRST_NAME_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'firstName is invalid' test OK`);
      });

      it("firstName is too short", async () => {
        req = { body: { ...validContactInput } };
        req.body.firstName = invalidContactCases.TOO_SHORT_FIRST_NAME;

        for (const middleware of createContactRecord) {
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
                  contactFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'firstName is too short' test OK`);
      });

      it("lastName is undefined", async () => {
        req = { body: { ...validContactInput } };
        req.body.lastName = undefined;

        for (const middleware of createContactRecord) {
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
                message: contactFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
              },
              {
                message:
                  contactFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE,
              },
              { message: contactFailedValidation.LAST_NAME_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'lastName is undefined' test OK`);
      });

      it("lastName is invalid", async () => {
        req = { body: { ...validContactInput } };
        req.body.lastName = invalidContactCases.INVALID_LAST_NAME;

        for (const middleware of createContactRecord) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: contactFailedValidation.LAST_NAME_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'lastName is invalid' test OK`);
      });

      it("lastName is too short", async () => {
        req = { body: { ...validContactInput } };
        req.body.lastName = invalidContactCases.TOO_SHORT_LAST_NAME;

        for (const middleware of createContactRecord) {
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
                  contactFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'lastName is too short' test OK`);
      });

      it("phoneNumber is undefined", async () => {
        req = { body: { ...validContactInput } };
        req.body.phoneNumber = undefined;

        for (const middleware of createContactRecord) {
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
                message: contactFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE,
              },
              { message: contactFailedValidation.PHONE_NUMBER_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(
          `contactCreation -> 'phoneNumber is undefined' test OK`
        );
      });

      it("phoneNumber is invalid", async () => {
        req = { body: { ...validContactInput } };
        req.body.phoneNumber = invalidContactCases.INVALID_PHONE_NUMBER;

        for (const middleware of createContactRecord) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: contactFailedValidation.PHONE_NUMBER_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'phoneNumber is invalid' test OK`);
      });

      it("streetAddress is too short", async () => {
        req = { body: { ...validContactInput } };
        req.body.streetAddress = invalidContactCases.TOO_SHORT_STREET_ADDRESS;

        for (const middleware of createContactRecord) {
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
                  contactFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `contactCreation -> 'streetAddress is too short' test OK`
        );
      });

      it("zipCode is invalid", async () => {
        req = { body: { ...validContactInput } };
        req.body.zipCode = invalidContactCases.INVALID_ZIP_CODE;

        for (const middleware of createContactRecord) {
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
                message: contactFailedValidation.ZIP_CODE_INVALID_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(`contactCreation -> 'zipCode is invalid' test OK`);
      });

      it("zipCode is out of length", async () => {
        req = { body: { ...validContactInput } };
        req.body.zipCode = invalidContactCases.ZIP_CODE_OUT_OF_LENGTH;

        for (const middleware of createContactRecord) {
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
                message: contactFailedValidation.ZIP_CODE_OUT_OF_LENGTH_MESSAGE,
              },
            ],
          }),
          true
        );

        testLogger.info(
          `contactCreation -> 'zipCode is out of length' test OK`
        );
      });

      it("Group ID is undefined", async () => {
        req = { body: { ...validContactInput } };
        req.body.groupId = undefined;

        for (const middleware of createContactRecord) {
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

        testLogger.info(`contactCreation -> 'Group ID is undefined' test OK`);
      });

      invalidGroupCases.GROUP_ID_LENGTH_CASES.forEach(
        ([testName, invalidGroupId]) => {
          it(testName, async () => {
            req = { body: { ...validContactInput } };
            req.body.groupId = invalidGroupId;

            for (const middleware of createContactRecord) {
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
                    message: groupFailedValidation.GROUP_ID_OUT_OF_LENGTH,
                  },
                ],
              }),
              true
            );

            testLogger.info(`contactCreation -> '${testName}' test OK`);
          });
        }
      );

      invalidGroupCases.GROUP_ID_INVALID_CASES.forEach(
        ([testName, invalidGroupId]) => {
          it(testName, async () => {
            req = { body: { ...validContactInput } };
            req.body.groupId = invalidGroupId;

            for (const middleware of createContactRecord) {
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
                    message: groupFailedValidation.GROUP_ID_INVALID,
                  },
                ],
              }),
              true
            );

            testLogger.info(`contactCreation -> '${testName}' test OK`);
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
      methodStub = sinon.stub(contactRepository, "addContact");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { ...validContactInput } };
      methodStub.rejects();

      for (const middleware of createContactRecord) {
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

      testLogger.info(`contactCreation -> 'server error (500)' test OK`);
    });
  });
});
