import { HttpResponse } from '../protocols/http-protocol'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: {
    error: error.message
  }
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: {
    data: data
  }
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: { error: 'internal server error' }
})
