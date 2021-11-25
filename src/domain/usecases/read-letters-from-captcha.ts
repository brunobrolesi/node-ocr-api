export interface ReadLettersFromCaptcha {
  read: (file: string) => Promise<string>
}
