/**
 * Contact collection integration tests.
 */
import mongoose, { ConnectOptions } from "mongoose";
import assert from "assert";
import { Request, Response } from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import { httpCodes } from "../../src/presentation/codes/responseStatusCodes";
import { testLogger } from "../../logs/logger.config";
import Contact from "../../src/domain/models/contact.model";
import { validContactInput } from "../testInputs";
import { contactControllerResponseMessages } from "../../src/presentation/messages/contactControllerResponse.message";
import {
  createContactRecord,
  deleteContactRecord,
  updateContactRecord,
} from "../../src/presentation/apis/v1/controllers/contact.controller";
import * as dotenv from "dotenv";
dotenv.config();

describe("Contact collection integration tests", () => {
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
    await Contact.deleteMany({});
    sinon.restore();
  });

  it("new contact created (201)", async () => {
    req = { body: validContactInput };

    for (const middleware of createContactRecord) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;
    const jsonSpy = res.json as SinonSpy;

    assert.strictEqual(statusStub.calledWith(httpCodes.CREATED), true);
    assert.strictEqual(
      jsonSpy.calledWith({
        message: contactControllerResponseMessages.CONTACT_CREATED,
      }),
      true
    );

    testLogger.info(`contactCollection -> 'new contact created (201)' test OK`);
  });

  it("contact updated (200)", async () => {
    const contact = new Contact(validContactInput);
    const savedContact = await contact.save();

    req = {
      body: { id: savedContact._id, city: "Athens" },
    };

    for (const middleware of updateContactRecord) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.OK), true);

    testLogger.info(`contactCollection -> 'contact updated (200)' test OK`);
  });

  it("contact deleted (204)", async () => {
    const contact = new Contact(validContactInput);
    const savedContact = await contact.save();

    req = { body: { id: savedContact._id } };

    for (const middleware of deleteContactRecord) {
      await middleware(req as Request, res as Response, next);
    }

    const statusStub = res.status as SinonStub;

    assert.strictEqual(statusStub.calledWith(httpCodes.NO_CONTENT), true);

    testLogger.info(`contactCollection -> 'contact deleted (204)' test OK`);
  });
});
