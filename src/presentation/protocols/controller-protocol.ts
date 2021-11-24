import { HttpResponse, HttpRequest } from './http-protocol'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
