import { AnyAction, Middleware, MiddlewareAPI, isRejected, isRejectedWithValue } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

interface IPayloadErrMsg {
  data: {
    error: string
  }
  status: number
}

function isPayloadErrMsg(payload: unknown): payload is IPayloadErrMsg {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'data' in payload &&
    typeof (payload as any).data?.error === 'string'
  )
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejected(action)) {
    // Check execution err
    if (action.error.name === 'CustomError') {
      toast.warn(action.error.message)
    }

    // Check when server return err msg
    if (isRejectedWithValue(action)) {
      if (isPayloadErrMsg(action.payload)) {
        toast.warn(action.payload.data.error)
      }
    }
  }

  return next(action)
}
