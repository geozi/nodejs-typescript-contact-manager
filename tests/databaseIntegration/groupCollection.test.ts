/**
 * Group collection integration tests.
 */

import mongoose, { ConnectOptions } from "mongoose";
import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import Group from "../../src/domain/models/group.model";
import { validGroupInput } from "../testInputs";
import { groupControllerResponseMessages } from "../../src/presentation/messages/groupControllerResponse.message";
import {
  createContactGroup,
  updateContactGroup,
  deleteContactGroup,
} from "../../src/presentation/apis/v1/controllers/group.controller";
import * as dotenv from "dotenv";
dotenv.config();

describe.only("Group collection integration tests", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonSpy;

  before(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      { useNewUrlParser: true } as ConnectOptions
    );
  });

  after(async () => {
    await mongoose.connection.close();
  });

  beforeEach(() => {
    res = {
      status: sinon.stub().callsFake(() => {
        return res;
      }) as unknown as SinonStub,
      json: sinon.spy(),
    };

    next = sinon.spy();
  });

  afterEach(async () => {
    await Group.deleteMany({});
    sinon.restore();
  });

  it("new group created (201)", async () => {
    req = { body: validGroupInput };

    for (const middleware of createContactGroup) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
    assert.strictEqual(
      jsonSpy.calledWith({
        message: groupControllerResponseMessages.CONTACT_GROUP_CREATED,
      }),
      true
    );

    testLogger.info(`groupCollection -> 'new group created (201)' test OK`);
  });

  it("group updated (200)", async () => {
    const group = new Group(validGroupInput);
    const savedContactGroup = await group.save();

    req = {
      body: {
        id: savedContactGroup._id,
        name: "The name of the contact group is updated",
      },
    };

    for (const middleware of updateContactGroup) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);

    testLogger.info(`groupCollection -> 'group updated (200)' test OK`);
  });

  it("group deleted (204)", async () => {
    const group = new Group(validGroupInput);
    const savedContactGroup = await group.save();

    req = { body: { id: savedContactGroup._id } };

    for (const middleware of deleteContactGroup) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.NO_CONTENT), true);

    testLogger.info(`groupCollection -> 'group deleted (204)' test OK`);
  });
});
