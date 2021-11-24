export interface BodyValidator {
  validate: (body: object) => Error
}
