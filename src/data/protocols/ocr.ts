export interface Ocr {
  read: (file: object) => Promise<string>
}
