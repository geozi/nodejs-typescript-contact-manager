import User from "../../src/domain/models/user.model";
import { IUser } from "../../src/domain/interfaces/iUser.interface";
import { validUserInput } from "../testInputs";
import sinon from "sinon";
import assert from "assert";
import mongoose from "mongoose";
import { userFailedValidation } from "../../src/domain/messages/userValidation.message";

describe("User model unit test", () => {
  let newUser: IUser;

  beforeEach(() => {
    newUser = new User(validUserInput);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("has valid inputs", () => {
    sinon.replace(
      User.prototype,
      "validateSync",
      sinon.stub().returns(undefined)
    );

    const mongooseErrors = newUser.validateSync();

    assert.strictEqual(mongooseErrors, undefined);
  });

  it("username is empty", () => {
    const validationError = new mongoose.Error.ValidationError();
    validationError.errors = {
      username: new mongoose.Error.ValidatorError({
        message: "Username is a required field",
        path: "username",
        type: "required",
        value: "",
      }),
    };

    sinon.replace(
      User.prototype,
      "validateSync",
      sinon.stub().returns(validationError)
    );

    newUser.username = "";
    const mongooseErrors = newUser.validateSync();

    assert.notStrictEqual(mongooseErrors, undefined);
    assert.strictEqual(
      mongooseErrors?.errors.username.message,
      userFailedValidation.USERNAME_REQUIRED_MESSAGE
    );
  });
});
