export interface ResponseData {}

export class ResJSON {
  constructor(
    public readonly message: string,
    public readonly data: ResponseData = {},
  ) {}
}
