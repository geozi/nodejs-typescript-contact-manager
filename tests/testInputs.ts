import mongoose from "mongoose";
import { Role } from "../src/domain/enums/role.enum";

export const invalidUserInputs = {
  USER_ID_LENGTH_CASES: [
    ["user ID is too short", "67710722913928977"],
    ["user ID is too long", "67710722913928977aa04ea067710722913928977aa04ea0"],
  ] as [string, string][],
  USER_ID_INVALID_CASES: [
    ["user ID contains special symbols", "67*db12ed*29a1*ed143e37e"],
    ["user ID contains white spaces", "6771 722 13928977aa04ea0"],
    ["user ID contains capital letters", "67710722913928977AA04ea0"],
  ] as [string, string][],
  TOO_SHORT_USERNAME: "ab",
  TOO_LONG_USERNAME: "thisIsAVeryLongUsernameToTest",
  EMAIL_INVALID_CASES: [
    ["email has no prefix", "@mail.com"],
    ["email has no @", "randommail.com"],
    ["email has no domain name", "random@.com"],
    ["email has no .", "random@mailcom"],
    ["email has no top level domain", "random@mail."],
  ] as [string, string][],
  TOO_SHORT_PASSWORD: "E^e;0=",
  PASSWORD_INVALID_CASES: [
    ["password has no uppercase letters", "!]i&u^^.57h3.,%"],
    ["password has no lowercase letters", "+[Q]D~~A,9CGYZ~"],
    ["password has no numbers", "Q}_MC}mdguOs!Gr"],
    ["password has no special symbols", "EyB0McqoXAOYA1Y"],
  ] as [string, string][],
  ROLE_INVALID: "Executive",
};

export const validUserInput = {
  username: "newUser",
  email: "random@mail.com",
  password: "5W]L8t1m4@PcTTO",
  role: Role.User,
};

export const validGroupInput = {
  name: "Work group",
  description: "Contact info of work colleagues",
};

export const invalidGroupCases = {
  TOO_LONG_DESCRIPTION:
    "This group includes all the contacts related to professional engagements and networking events.",
  TOO_SHORT_DESCRIPTION: "VIP",
};

export const validContactInput = {
  firstName: "Amanda",
  lastName: "Harris",
  email: "ajharris77@rocketmail.com",
  phoneNumber: "601-766-3728",
  streetAddress: "36947 Lincoln Avenue",
  city: "Painted Post",
  zipCode: "14870",
  companyName: "Paper Products Corp.",
  groupId: new mongoose.Types.ObjectId("679d0f628456f610eb27986a"),
};

export const invalidContactCases = {
  INVALID_FIRST_NAME: "T1m0thy",
  TOO_SHORT_FIRST_NAME: "T",
  INVALID_LAST_NAME: "J3nk1ns*",
  TOO_SHORT_LAST_NAME: "J",
  INVALID_PHONE_NUMBER: "543*123*",
  TOO_SHORT_STREET_ADDRESS: "A street",
  INVALID_ZIP_CODE: "AA356",
  ZIP_CODE_OUT_OF_LENGTH: "123",
};
