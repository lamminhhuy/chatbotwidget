"use strict";

import { Response } from "express";
import { z } from "zod";

type StatusCodeType = {
  OK: 200;
  CREATED: 201;
};

type ReasonStatusCodeType = {
  OK: "Success";
  CREATED: "Created!";
};

const StatusCode: StatusCodeType = {
  OK: 200,
  CREATED: 201,
};

const ReasonStatusCode: ReasonStatusCodeType = {
  OK: "Success",
  CREATED: "Created!",
};

interface SuccessResponseParams {
  message?: string;
  statusCode?: StatusCodeType[keyof StatusCodeType];
  reasonStatusCode?: ReasonStatusCodeType[keyof ReasonStatusCodeType];
  data?: Record<string, unknown>;
}

class SuccessResponse {
  message: string;
  status: number;
  data: Record<string, unknown>;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    data = {},
  }: SuccessResponseParams) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.data = data;
  }
  send(res: Response) {
    return res.status(this.status).json(this);
  }
}

interface OKParams {
  message?: string;
  data?: Record<string, unknown>;
}

class OK extends SuccessResponse {
  constructor({ message, data }: OKParams) {
    super({ message, data });
  }
}

interface CREATEDParams extends SuccessResponseParams {
  options?: Record<string, unknown>;
}

class CREATED extends SuccessResponse {
  options: Record<string, unknown>;

  constructor({
    options = {},
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    data,
  }: CREATEDParams) {
    super({ message, statusCode, reasonStatusCode, data });
    this.options = options;
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    message: z.string(),
    data: dataSchema.optional(),
    status: z.number(),
  });

export { OK, CREATED, SuccessResponse };
