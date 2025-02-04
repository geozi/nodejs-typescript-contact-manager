import sinon from "sinon";
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
import { testLogger } from "../../logs/logger.config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { IUser } from "../../src/domain/interfaces/iUser.interface";
chai.use(chaiAsPromised);

describe("User service unit tests", () => {
  const validUser = new User(validUserInput);
  const mockId = new Types.ObjectId("67a1d59cc3311a606aca661e");
  const mockUpdateDateObj: IUserUpdate = {};
  const mockUsers: Array<IUser> = [];
  let methodStub: sinon.SinonStub;

  describe("retrieveUserByUsername()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "getUserByUsername");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(retrieveUserByUsername(validUser.username))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`retrieveUserByUsername() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(retrieveUserByUsername(validUser.username))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`retrieveUserByUsername() -> not found test OK`);
    });
  });

  describe("retrieveUserByEmail()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "getUserByEmail");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();
      await chai
        .expect(retrieveUserByEmail(validUser.email))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`retrieveUserByEmail() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(retrieveUserByEmail(validUser.email))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`retrieveUserByEmail() -> not found test OK`);
    });
  });

  describe("retrieveUsersByRole()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "getUsersByRole");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(retrieveUsersByRole(validUser.role))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`retrieveUsersByRole() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(mockUsers);

      await chai
        .expect(retrieveUsersByRole(validUser.role))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`retrieveUsersByRole() -> not found test OK`);
    });
  });

  describe("createUserProfile()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "addUser");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();
      await chai
        .expect(createUserProfile(validUser))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`createUserProfile() -> server error test OK`);
    });
  });

  describe("updateUserProfile()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "updateUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error", async () => {
      methodStub.rejects();
      await chai
        .expect(updateUserProfile(mockId, mockUpdateDateObj))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`updateUserProfile() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);
      await chai
        .expect(updateUserProfile(mockId, mockUpdateDateObj))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`updateUserProfile() -> not found test OK`);
    });
  });

  describe("deleteUserProfile()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(userRepository, "deleteUser");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("server error", async () => {
      methodStub.rejects();
      await chai
        .expect(deleteUserProfile(mockId))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`deleteUserProfile() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(deleteUserProfile(mockId))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`deleteUserProfile() -> not found test OK`);
    });
  });
});
