import Contact from "../../src/domain/models/contact.model";
import { IContact } from "../../src/domain/interfaces/iContact.interface";
import sinon from "sinon";
import assert from "assert";
import mongoose from "mongoose";
import { contactFailedValidation } from "../../src/domain/messages/contactValidation.message";
import {
  invalidContactCases,
  invalidUserInputs,
  validContactInput,
} from "../testInputs";
import { groupFailedValidation } from "../../src/domain/messages/groupValidation.message";

describe("Contact model unit tests", () => {
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

    it("email is empty", () => {
      validationError.errors = {
        email: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.EMAIL_REQUIRED_MESSAGE,
          path: "email",
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
        mongooseErrors?.errors.email.message,
        contactFailedValidation.EMAIL_REQUIRED_MESSAGE
      );
    });

    it("email is invalid", () => {
      validationError.errors = {
        email: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.EMAIL_INVALID_MESSAGE,
          path: "email",
          value: invalidUserInputs.EMAIL_INVALID_CASES[0][1],
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
        mongooseErrors?.errors.email.message,
        contactFailedValidation.EMAIL_INVALID_MESSAGE
      );
    });

    it("phone number is empty", () => {
      validationError.errors = {
        phoneNumber: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE,
          path: "phoneNumber",
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
        mongooseErrors?.errors.phoneNumber.message,
        contactFailedValidation.PHONE_NUMBER_REQUIRED_MESSAGE
      );
    });

    it("phone number is invalid", () => {
      validationError.errors = {
        phoneNumber: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.PHONE_NUMBER_INVALID_MESSAGE,
          path: "phoneNumber",
          value: invalidContactCases.INVALID_PHONE_NUMBER,
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
        mongooseErrors?.errors.phoneNumber.message,
        contactFailedValidation.PHONE_NUMBER_INVALID_MESSAGE
      );
    });

    it("streetAddress is too short", () => {
      validationError.errors = {
        streetAddress: new mongoose.Error.ValidatorError({
          message:
            contactFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE,
          path: "streetAddress",
          value: invalidContactCases.TOO_SHORT_STREET_ADDRESS,
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
        mongooseErrors?.errors.streetAddress.message,
        contactFailedValidation.STREET_ADDRESS_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("zipCode is invalid", () => {
      validationError.errors = {
        zipCode: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.ZIP_CODE_INVALID_MESSAGE,
          path: "zipCode",
          value: invalidContactCases.INVALID_ZIP_CODE,
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
        mongooseErrors?.errors.zipCode.message,
        contactFailedValidation.ZIP_CODE_INVALID_MESSAGE
      );
    });

    it("zipCode is out of length", () => {
      validationError.errors = {
        zipCode: new mongoose.Error.ValidatorError({
          message: contactFailedValidation.ZIP_CODE_OUT_OF_LENGTH_MESSAGE,
          path: "zipCode",
          value: invalidContactCases.ZIP_CODE_OUT_OF_LENGTH,
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
        mongooseErrors?.errors.zipCode.message,
        contactFailedValidation.ZIP_CODE_OUT_OF_LENGTH_MESSAGE
      );
    });

    it("groupId is empty", () => {
      validationError.errors = {
        groupId: new mongoose.Error.ValidatorError({
          message: groupFailedValidation.GROUP_ID_REQUIRED,
          path: "groupId",
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
        mongooseErrors?.errors.groupId.message,
        groupFailedValidation.GROUP_ID_REQUIRED
      );
    });
  });
});
