/**
 * represent 'data' object to be returned in response body.
 *
 * example:
 *
 * {
 *   message: "example"
 *   data: { this: object }
 * }
 */
export interface ResponseData {}

export class ResJSON {
  constructor(
    public readonly message: string,
    public readonly data: ResponseData = {},
  ) {}
}
