export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('Organization e-mail already exists');
  }
}