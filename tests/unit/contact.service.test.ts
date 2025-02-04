import sinon from "sinon";
import assert from "assert";
import { validContactInput } from "../testInputs";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { IContactUpdate } from "../../src/presentation/interfaces/iContactUpdate.interface";
import Contact from "../../src/domain/models/contact.model";
import * as contactRepository from "../../src/persistence/contact.repository";
import {
  createContactRecord,
  retrieveContactByEmail,
  updateContactRecord,
} from "../../src/service/contact.service";
import { Types } from "mongoose";
import { testLogger } from "../../logs/logger.config";
import { IContact } from "../../src/domain/interfaces/iContact.interface";
import { commonServiceMessages } from "../../src/service/messages/commonService.message";

describe.only("Contact service unit tests", () => {
  const validContact = new Contact(validContactInput);
  const mockId = new Types.ObjectId("67a2392828834335f628374f");
  const mockUpdateDateObj: IContactUpdate = {};
  let methodStub: sinon.SinonStub;

  describe("retrieveContactByEmail()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(contactRepository, "getContactByEmail");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();

      assert.rejects(async () => {
        await retrieveContactByEmail(validContact.email);
      }, ServerError);
      testLogger.info(`retrieveContactByEmail() -> server error OK`);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await retrieveContactByEmail(validContact.email);
      }, NotFoundError);
      testLogger.info(`retrieveContactByEmail() -> not found OK`);
    });
  });

  describe("createContactRecord()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(contactRepository, "addContact");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await createContactRecord(validContact);
      }, ServerError);

      testLogger.info(`createContactRecord() -> server error OK`);
    });
  });

  describe("updateContactRecord()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(contactRepository, "updateContact");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await updateContactRecord(mockId, mockUpdateDateObj);
      }, ServerError);

      testLogger.info(`updateContactRecord() -> server error OK`);
    });
  });
});
