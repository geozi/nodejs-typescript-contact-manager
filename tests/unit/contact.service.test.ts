import sinon from "sinon";
import { validContactInput } from "../testInputs";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { IContactUpdate } from "../../src/presentation/interfaces/iContactUpdate.interface";
import Contact from "../../src/domain/models/contact.model";
import * as contactRepository from "../../src/persistence/contact.repository";
import {
  createContactRecord,
  deleteContactRecord,
  retrieveContactByEmail,
  updateContactRecord,
} from "../../src/service/contact.service";
import { Types } from "mongoose";
import { testLogger } from "../../logs/logger.config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("Contact service unit tests", () => {
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

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(retrieveContactByEmail(validContact.email))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`retrieveContactByEmail() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(retrieveContactByEmail(validContact.email))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`retrieveContactByEmail() -> not found test OK`);
    });
  });

  describe("createContactRecord()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(contactRepository, "addContact");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(createContactRecord(validContact))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`createContactRecord() -> server error test OK`);
    });
  });

  describe("updateContactRecord()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(contactRepository, "updateContact");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(updateContactRecord(mockId, mockUpdateDateObj))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`updateContactRecord() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(updateContactRecord(mockId, mockUpdateDateObj))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`updateContactRecord() -> not found test OK`);
    });
  });

  describe("deleteContactRecord()", async () => {
    beforeEach(() => {
      methodStub = sinon.stub(contactRepository, "deleteContact");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(deleteContactRecord(mockId))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`deleteContactRecord() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(deleteContactRecord(mockId))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`deleteContactRecord() -> not found test OK`);
    });
  });
});
