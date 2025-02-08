/**
 * Contact fetching by email integration tests.
 */
import assert from "assert";
import sinon, { SinonSpy, SinonStub } from "sinon";
import { Request, Response } from "express";
import { commonResponseMessages } from "../../src/presentation/messages/commonResponse.message";
import { contactFailedValidation } from "../../src/domain/messages/contactValidation.message";
import { validContactInput, invalidUserInputs } from "../testInputs";
import { fetchContactByEmail } from "../../src/presentation/apis/v1/controllers/contact.controller";
import { retrieveContactByEmail } from "../../src/service/contact.service";
import * as contactRepository from "../../src/persistence/contact.repository";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";
import { contactServiceMessages } from "../../src/service/messages/contactService.message";

describe("Email-based contact fetching integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  describe("validation-oriented", () => {
    describe("bad requests (400)", () => {
      beforeEach(() => {
        sinon.replace(
          { retrieveContactByEmail },
          "retrieveContactByEmail",
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

        for (const middleware of fetchContactByEmail) {
          await middleware(req as Request, res as Response, next);
        }

        const statusStub = res.status as SinonStub;
        const jsonSpy = res.json as SinonSpy;

        assert.strictEqual(statusStub.calledWith(httpCodes.BAD_REQUEST), true);
        assert.strictEqual(
          jsonSpy.calledWith({
            message: commonResponseMessages.BAD_REQUEST,
            errors: [
              { message: contactFailedValidation.EMAIL_REQUIRED_MESSAGE },
              { message: contactFailedValidation.EMAIL_INVALID_MESSAGE },
            ],
          }),
          true
        );

        testLogger.info(
          `Email-based contact fetching -> 'email is undefined' test OK`
        );
      });

      invalidUserInputs.EMAIL_INVALID_CASES.forEach(
        ([testName, invalidEmail]) => {
          it(testName, async () => {
            req = { body: { email: invalidEmail } };

            for (const middleware of fetchContactByEmail) {
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
                  { message: contactFailedValidation.EMAIL_INVALID_MESSAGE },
                ],
              }),
              true
            );

            testLogger.info(
              `Email-based contact fetching -> '${testName}' test OK`
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
      methodStub = sinon.stub(contactRepository, "getContactByEmail");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error (500)", async () => {
      req = { body: { email: validContactInput.email } };
      methodStub.rejects();

      for (const middleware of fetchContactByEmail) {
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
        `Email-based contact fetching -> 'server error (500)' test OK`
      );
    });

    it("not found 404", async () => {
      req = { body: { email: validContactInput.email } };
      methodStub.resolves(null);

      for (const middleware of fetchContactByEmail) {
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

      testLogger.info(
        `Email-based contact fetching -> 'not found (404)' test OK`
      );
    });
  });
});
