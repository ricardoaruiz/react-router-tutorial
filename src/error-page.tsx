import { useCallback } from 'react'
import { useRouteError } from 'react-router-dom'

type ErrorResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  status: number
  statusText: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError()

  const errorCheck = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any): error is ErrorResponse =>
      'data' in error && 'status' in error && 'statusText' in error,
    []
  )

  if (errorCheck(error)) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    )
  }

  return <></>
}
