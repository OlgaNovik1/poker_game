export class RedirectPath extends String {
  readonly #path: string;

  constructor(path: string) {
    super();
    this.#path = path;
  }

  toString(): string {
    return this.#path;
  }

  valueOf(): string {
    return this.#path;
  }

  [Symbol.toPrimitive](): string {
    return this.#path;
  }
}
