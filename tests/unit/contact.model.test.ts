import Contact from "../../src/domain/models/contact.model";
import { IContact } from "../../src/domain/interfaces/iContact.interface";
import sinon from "sinon";
import assert from "assert";
import mongoose from "mongoose";
import { contactFailedValidation } from "../../src/domain/messages/contactValidation.message";
import { invalidContactCases, validContactInput } from "../testInputs";

describe.only("Contact model unit tests", () => {
  let newContact: IContact;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newContact = new Contact(validContactInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        Contact.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const mongooseErrors = newContact.validateSync();

      assert.strictEqual(mongooseErrors, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: mongoose.Error.ValidationError;

    beforeEach(() => {
      sinon.restore();
      newContact = new Contact();
      validationError = new mongoose.Error.ValidationError();
    });

    it("firstName is empty", () => {
      validationError.errors = {
        firstName: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.FIRST_NAME_REQUIRED_MESSAGE,
          path: "firstName",
          value: "",
        }),
      };

      sinon.replace(
        Contact.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newContact.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.firstName.message,
        contactFailedValidation.FIRST_NAME_REQUIRED_MESSAGE
      );
    });

    it("firstName is invalid", () => {
      validationError.errors = {
        firstName: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.FIRST_NAME_INVALID_MESSAGE,
          path: "firstName",
          value: invalidContactCases.INVALID_FIRST_NAME,
        }),
      };

      sinon.replace(
        Contact.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newContact.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.firstName.message,
        contactFailedValidation.FIRST_NAME_INVALID_MESSAGE
      );
    });

    it("firstName is too short", () => {
      validationError.errors = {
        firstName: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE,
          path: "firstName",
          value: invalidContactCases.TOO_SHORT_FIRST_NAME,
        }),
      };

      sinon.replace(
        Contact.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newContact.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.firstName.message,
        contactFailedValidation.FIRST_NAME_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("lastName is empty", () => {
      validationError.errors = {
        lastName: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.LAST_NAME_REQUIRED_MESSAGE,
          path: "lastName",
          value: "",
        }),
      };

      sinon.replace(
        Contact.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newContact.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.lastName.message,
        contactFailedValidation.LAST_NAME_REQUIRED_MESSAGE
      );
    });

    it("lastName is invalid", () => {
      validationError.errors = {
        lastName: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.LAST_NAME_INVALID_MESSAGE,
          path: "lastName",
          value: invalidContactCases.INVALID_LAST_NAME,
        }),
      };

      sinon.replace(
        Contact.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newContact.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.lastName.message,
        contactFailedValidation.LAST_NAME_INVALID_MESSAGE
      );
    });

    it("lastName is too short", () => {
      validationError.errors = {
        lastName: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE,
          path: "lastName",
          value: invalidContactCases.TOO_SHORT_LAST_NAME,
        }),
      };

      sinon.replace(
        Contact.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newContact.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.lastName.message,
        contactFailedValidation.LAST_NAME_BELOW_MIN_LENGTH_MESSAGE
      );
    });
  });
});
