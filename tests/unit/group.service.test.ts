import sinon from "sinon";
import { validGroupInput } from "../testInputs";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { IGroupUpdate } from "../../src/presentation/interfaces/iGroupUpdate.interface";
import Group from "../../src/domain/models/group.model";
import * as groupRepository from "../../src/persistence/group.repository";
import {
  createContactGroup,
  deleteContactGroup,
  retrieveContactGroupByName,
  updateContactGroup,
} from "../../src/service/group.service";
import { Types } from "mongoose";
import { testLogger } from "../../logs/logger.config";
import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("Group service unit tests", () => {
  const validGroup = new Group(validGroupInput);
  const mockId = new Types.ObjectId("67a1d59cc3311a606aca661e");
  const mockUpdateDateObj: IGroupUpdate = {};
  let methodStub: sinon.SinonStub;

  describe("retrieveContactGroupByName()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(groupRepository, "getGroupByName");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(retrieveContactGroupByName(validGroup.name))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`retrieveContactGroupByName() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(retrieveContactGroupByName(validGroup.name))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`retrieveContactGroupByName() -> not found test OK`);
    });
  });

  describe("createContactGroup()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(groupRepository, "addGroup");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(createContactGroup(validGroup))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`createContactGroup() -> server error test OK`);
    });
  });

  describe("updateContactGroup()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(groupRepository, "updateGroup");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();

      await chai
        .expect(updateContactGroup(mockId, mockUpdateDateObj))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`updateContactGroup() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(updateContactGroup(mockId, mockUpdateDateObj))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`updateContactGroup() -> not found test OK`);
    });
  });

  describe("deleteContactGroup()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(groupRepository, "deleteGroup");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", async () => {
      methodStub.rejects();
      await chai
        .expect(deleteContactGroup(mockId))
        .to.be.rejectedWith(ServerError);

      testLogger.info(`deleteContactGroup() -> server error test OK`);
    });

    it("not found", async () => {
      methodStub.resolves(null);

      await chai
        .expect(deleteContactGroup(mockId))
        .to.be.rejectedWith(NotFoundError);

      testLogger.info(`deleteContactGroup() -> not found test OK`);
    });
  });
});
