export interface ReadLettersFromCaptcha {
  read: (file: object) => Promise<string>
}
