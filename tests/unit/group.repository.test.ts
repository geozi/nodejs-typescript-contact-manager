import Group from "../../src/domain/models/group.model";
import sinon from "sinon";
import assert from "assert";
import { Types } from "mongoose";
import {
  addGroup,
  deleteGroup,
  getGroupByName,
  updateGroup,
} from "../../src/persistence/group.repository";
import { validGroupInput } from "../testInputs";
import { IGroup } from "../../src/domain/interfaces/iGroup.interface";

describe("Group repository unit tests", () => {
  const mockGroup = new Group();
  const mockId = new Types.ObjectId("679e4f0a998f625554eda7f3");

  describe("getGroupByName()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Group object", async () => {
      sinon.stub(Group, "findOne").resolves(mockGroup);
      const foundGroup = await getGroupByName(validGroupInput.name);
      assert(foundGroup instanceof Group);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Group, "findOne").resolves(null);
      const foundGroup = await getGroupByName(validGroupInput.name);
      assert.strictEqual(foundGroup, null);
    });
  });

  describe("addGroup()", () => {
    let newGroup: IGroup;
    beforeEach(() => {
      sinon.restore();
      newGroup = new Group(validGroupInput);
    });

    it("Promise resolves to Group object", async () => {
      sinon.stub(Group.prototype, "save").resolves(mockGroup);
      const savedGroup = await addGroup(newGroup);
      assert(savedGroup instanceof Group);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Group.prototype, "save").resolves(null);
      const savedGroup = await addGroup(newGroup);
      assert.strictEqual(savedGroup, null);
    });
  });

  describe("updateGroup()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Group object", async () => {
      sinon.stub(Group, "findByIdAndUpdate").resolves(mockGroup);
      const updatedGroup = await updateGroup(mockId, validGroupInput);
      assert(updatedGroup instanceof Group);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Group, "findByIdAndUpdate").resolves(null);
      const updatedGroup = await updateGroup(mockId, validGroupInput);
      assert.strictEqual(updatedGroup, null);
    });
  });

  describe("deleteGroup()", () => {
    beforeEach(() => {
      sinon.restore();
    });

    it("Promise resolves to Group object", async () => {
      sinon.stub(Group, "findByIdAndDelete").resolves(mockGroup);
      const deletedGroup = await deleteGroup(mockId);
      assert(deletedGroup instanceof Group);
    });

    it("Promise resolves to null", async () => {
      sinon.stub(Group, "findByIdAndDelete").resolves(null);
      const deletedGroup = await deleteGroup(mockId);
      assert.strictEqual(deletedGroup, null);
    });
  });
});
