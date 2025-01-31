import User from "../../src/domain/models/user.model";
import { IUser } from "../../src/domain/interfaces/iUser.interface";
import { invalidUserInputs, validUserInput } from "../testInputs";
import sinon from "sinon";
import assert from "assert";
import mongoose from "mongoose";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";

describe("User model unit test", () => {
  let newUser: IUser;
  before(() => {
    newUser = new User(validUserInput);
  });

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );
    });

    afterEach(() => {
      sinon.restore();
    });

    it("has valid inputs", () => {
      const mongooseErrors = newUser.validateSync();

      assert.strictEqual(mongooseErrors, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: mongoose.Error.ValidationError;

    beforeEach(() => {
      validationError = new mongoose.Error.ValidationError();
    });

    afterEach(() => {
      sinon.restore();
    });

    it("username is empty", () => {
      validationError.errors = {
        username: new mongoose.Error.ValidatorError({
          message: userFailedValidation.USERNAME_REQUIRED_MESSAGE,
          path: "username",
          value: "",
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.username.message,
        userFailedValidation.USERNAME_REQUIRED_MESSAGE
      );
    });

    it("username is too long", () => {
      validationError.errors = {
        username: new mongoose.Error.ValidatorError({
          message: userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE,
          path: "username",
          value: invalidUserInputs.TOO_LONG_USERNAME,
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.username.message,
        userFailedValidation.USERNAME_ABOVE_MAX_LENGTH_MESSAGE
      );
    });

    it("username is too short", () => {
      validationError.errors = {
        username: new mongoose.Error.ValidatorError({
          message: userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE,
          path: "username",
          value: invalidUserInputs.TOO_SHORT_USERNAME,
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.username.message,
        userFailedValidation.USERNAME_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("email is empty", () => {
      validationError.errors = {
        email: new mongoose.Error.ValidatorError({
          message: userFailedValidation.EMAIL_REQUIRED_MESSAGE,
          path: "email",
          value: "",
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.email.message,
        userFailedValidation.EMAIL_REQUIRED_MESSAGE
      );
    });

    it("email is invalid", () => {
      validationError.errors = {
        email: new mongoose.Error.ValidatorError({
          message: userFailedValidation.EMAIL_INVALID_MESSAGE,
          path: "email",
          value: invalidUserInputs.EMAIL_INVALID_CASES[0][1],
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.email.message,
        userFailedValidation.EMAIL_INVALID_MESSAGE
      );
    });

    it("password is empty", () => {
      validationError.errors = {
        password: new mongoose.Error.ValidatorError({
          message: userFailedValidation.PASSWORD_REQUIRED_MESSAGE,
          path: "password",
          value: "",
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.password.message,
        userFailedValidation.PASSWORD_REQUIRED_MESSAGE
      );
    });

    it("password is too short", () => {
      validationError.errors = {
        password: new mongoose.Error.ValidatorError({
          message: userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE,
          path: "password",
          value: invalidUserInputs.TOO_SHORT_PASSWORD,
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.password.message,
        userFailedValidation.PASSWORD_BELOW_MIN_LENGTH_MESSAGE
      );
    });

    it("password is invalid", () => {
      validationError.errors = {
        password: new mongoose.Error.ValidatorError({
          message: userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE,
          path: "password",
          value: invalidUserInputs.PASSWORD_INVALID_CASES[0][1],
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.password.message,
        userFailedValidation.PASSWORD_MUST_HAVE_CHARACTERS_MESSAGE
      );
    });

    it("role is empty", () => {
      validationError.errors = {
        role: new mongoose.Error.ValidatorError({
          message: userFailedValidation.ROLE_REQUIRED_MESSAGE,
          path: "role",
          value: "",
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.role.message,
        userFailedValidation.ROLE_REQUIRED_MESSAGE
      );
    });

    it("role is invalid", () => {
      validationError.errors = {
        role: new mongoose.Error.ValidatorError({
          message: userFailedValidation.ROLE_INVALID_MESSAGE,
          path: "role",
          value: invalidUserInputs.ROLE_INVALID,
        }),
      };

      sinon.replace(
        User.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newUser.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.role.message,
        userFailedValidation.ROLE_INVALID_MESSAGE
      );
    });
  });
});
