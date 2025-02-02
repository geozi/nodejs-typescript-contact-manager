import Contact from "../../src/domain/models/contact.model";
import sinon from "sinon";
import assert from "assert";
import { Types } from "mongoose";
import {
  addContact,
  deleteContact,
  getContactByEmail,
  updateContact,
} from "../../src/persistence/contact.repository";
import { validContactInput } from "../testInputs";
import { IContact } from "../../src/domain/interfaces/iContact.interface";

describe("Contact repository unit tests", () => {
  const mockContact = new Contact();
  const mockId = new Types.ObjectId("679f3f23ab87738dd4011ec6");

  describe("getContactByEmail()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Contact object", async () => {
      sinon.stub(Contact, "findOne").resolves(mockContact);
      const foundContact = await getContactByEmail(validContactInput.email);
      assert(foundContact instanceof Contact);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Contact, "findOne").resolves(null);
      const foundContact = await getContactByEmail(validContactInput.email);
      assert.strictEqual(foundContact, null);
    });
  });

  describe("addContact()", () => {
    let newContact: IContact;

    beforeEach(() => {
      sinon.restore();
      newContact = new Contact(validContactInput);
    });

    it("Promise resolves to Contact object", async () => {
      sinon.stub(Contact.prototype, "save").resolves(mockContact);
      const savedContact = await addContact(newContact);
      assert(savedContact instanceof Contact);
    });
  });

  describe("updateContact", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Contact object", async () => {
      sinon.stub(Contact, "findByIdAndUpdate").resolves(mockContact);
      const updatedContact = await updateContact(mockId, validContactInput);
      assert(updatedContact instanceof Contact);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Contact, "findByIdAndUpdate").resolves(null);
      const updatedContact = await updateContact(mockId, validContactInput);
      assert.strictEqual(updatedContact, null);
    });
  });

  describe("deleteContact()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Contact object", async () => {
      sinon.stub(Contact, "findByIdAndDelete").resolves(mockContact);
      const deletedContact = await deleteContact(mockId);
      assert(deletedContact instanceof Contact);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Contact, "findByIdAndDelete").resolves(null);
      const deletedContact = await deleteContact(mockId);
      assert.strictEqual(deletedContact, null);
    });
  });
});
