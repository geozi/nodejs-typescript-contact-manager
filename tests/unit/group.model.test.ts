import Group from "../../src/domain/models/group.model";
import { IGroup } from "../../src/domain/interfaces/iGroup.interface";
import { invalidGroupCases, validGroupInput } from "../testInputs";
import sinon from "sinon";
import assert from "assert";
import mongoose from "mongoose";
import { groupFailedValidation } from "../../src/domain/messages/groupValidation.message";

describe("Group model unit tests", () => {
  let newGroup: IGroup;

  describe("Successful validation", () => {
    beforeEach(() => {
      sinon.restore();
      newGroup = new Group(validGroupInput);
    });

    it("has valid inputs", () => {
      sinon.replace(
        Group.prototype,
        "validateSync",
        sinon.stub().returns(undefined)
      );

      const mongooseErrors = newGroup.validateSync();

      assert.strictEqual(mongooseErrors, undefined);
    });
  });

  describe("Failed validation", () => {
    let validationError: mongoose.Error.ValidationError;

    beforeEach(() => {
      sinon.restore();
      newGroup = new Group();
      validationError = new mongoose.Error.ValidationError();
    });

    it("name is empty", () => {
      validationError.errors = {
        name: new mongoose.Error.ValidatorError({
          message: groupFailedValidation.NAME_REQUIRED_MESSAGE,
          path: "name",
          value: "",
        }),
      };

      sinon.replace(
        Group.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newGroup.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.name.message,
        groupFailedValidation.NAME_REQUIRED_MESSAGE
      );
    });

    it("Description is empty", () => {
      validationError.errors = {
        description: new mongoose.Error.ValidatorError({
          message: groupFailedValidation.DESCRIPTION_REQUIRED_MESSAGE,
          path: "description",
          value: "",
        }),
      };

      sinon.replace(
        Group.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newGroup.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.description.message,
        groupFailedValidation.DESCRIPTION_REQUIRED_MESSAGE
      );
    });

    it("Description is too long", () => {
      validationError.errors = {
        description: new mongoose.Error.ValidatorError({
          message: groupFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
          path: "description",
          value: invalidGroupCases.TOO_LONG_DESCRIPTION,
        }),
      };

      sinon.replace(
        Group.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newGroup.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.description.message,
        groupFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE
      );
    });

    it("Description is too short", () => {
      validationError.errors = {
        description: new mongoose.Error.ValidatorError({
          message: groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH,
          path: "description",
          value: invalidGroupCases.TOO_SHORT_DESCRIPTION,
        }),
      };

      sinon.replace(
        Group.prototype,
        "validateSync",
        sinon.stub().returns(validationError)
      );

      const mongooseErrors = newGroup.validateSync();

      assert.notStrictEqual(mongooseErrors, undefined);
      assert.strictEqual(
        mongooseErrors?.errors.description.message,
        groupFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH
      );
    });
  });
});
