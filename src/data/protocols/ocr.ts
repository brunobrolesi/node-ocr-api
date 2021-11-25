export interface Ocr {
  read: (file: string) => Promise<string>
}
