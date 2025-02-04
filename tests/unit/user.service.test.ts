import sinon from "sinon";
import assert from "assert";
import { validUserInput } from "../testInputs";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { IUserUpdate } from "../../src/presentation/interfaces/iUserUpdate.interface";
import User from "../../src/domain/models/user.model";
import * as userRepository from "../../src/persistence/user.repository";
import {
  createUserProfile,
  deleteUserProfile,
  retrieveUserByEmail,
  retrieveUserByUsername,
  retrieveUsersByRole,
  updateUserProfile,
} from "../../src/service/user.service";
import { Types } from "mongoose";

describe.only("User service unit tests", () => {
  const validUser = new User(validUserInput);
  const mockId = new Types.ObjectId("67a1d59cc3311a606aca661e");
  const mockUpdateDateObj: IUserUpdate = {};
  let methodStub: sinon.SinonStub;

  describe("retrieveUserByUsername()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "getUserByUsername");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await retrieveUserByUsername(validUser.username);
      }, ServerError);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await retrieveUserByUsername(validUser.username);
      }, NotFoundError);
    });
  });

  describe("retrieveUserByEmail()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "getUserByEmail");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await retrieveUserByEmail(validUser.email);
      }, ServerError);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await retrieveUserByEmail(validUser.email);
      }, NotFoundError);
    });
  });

  describe("retrieveUsersByRole()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "getUsersByRole");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await retrieveUsersByRole(validUser.role);
      }, ServerError);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await retrieveUsersByRole(validUser.role);
      }, NotFoundError);
    });
  });

  describe("createUserProfile()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "addUser");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await createUserProfile(validUser);
      }, ServerError);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await createUserProfile(validUser);
      }, NotFoundError);
    });
  });

  describe("updateUserProfile()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "updateUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await updateUserProfile(mockId, mockUpdateDateObj);
      }, ServerError);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await updateUserProfile(mockId, mockUpdateDateObj);
      }, NotFoundError);
    });
  });

  describe("deleteUserProfile()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "deleteUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await deleteUserProfile(mockId);
      }, ServerError);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await deleteUserProfile(mockId);
      }, NotFoundError);
    });
  });
});
