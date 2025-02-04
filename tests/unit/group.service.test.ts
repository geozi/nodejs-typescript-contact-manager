import sinon from "sinon";
import assert from "assert";
import { validGroupInput } from "../testInputs";
import { NotFoundError } from "../../src/errors/notFoundError.class";
import { ServerError } from "../../src/errors/serverError.class";
import { IGroupUpdate } from "../../src/presentation/interfaces/iGroupUpdate.interface";
import Group from "../../src/domain/models/group.model";
import * as groupRepository from "../../src/persistence/group.repository";
import {
  createContactGroup,
  retrieveContactGroupByName,
} from "../../src/service/group.service";
import { Types } from "mongoose";

describe.only("Group service unit tests", () => {
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

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await retrieveContactGroupByName(validGroup.name);
      }, ServerError);
    });

    it("not found", () => {
      methodStub.resolves(null);
      assert.rejects(async () => {
        await retrieveContactGroupByName(validGroup.name);
      }, NotFoundError);
    });
  });

  describe("createContactGroup()", () => {
    beforeEach(() => {
      methodStub = sinon.stub(groupRepository, "addGroup");
    });

    afterEach(() => {
      methodStub.restore();
    });

    it("server error", () => {
      methodStub.rejects();
      assert.rejects(async () => {
        await createContactGroup(validGroup);
      }, ServerError);
    });
  });
});
