import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from '../error-page'

import { action as deleteAction } from './contact/delete'
import ContactEdit, { action as editAction } from './contact/edit'
import ContactView, {
  action as contactAction,
  loader as contactLoader,
} from './contact/view'
import Home from './home'
import Root, { action as rootAction, loader as rootLoader } from './root'

const CONTACTS_PATH = '/contacts'

type RouteObject = {
  url: string
  params?: string[]
}

export const ROUTER_PATHS = {
  BASE: { url: '/' } as RouteObject,
  CONTACTS_VIEW: {
    url: `${CONTACTS_PATH}/:contactId`,
    params: ['contactId'],
  } as RouteObject,
  CONTACTS_EDIT: {
    url: `${CONTACTS_PATH}/:contactId/edit`,
    params: ['contactId'],
  } as RouteObject,
  CONTACTS_DELETE: {
    url: `${CONTACTS_PATH}/:contactId/delete`,
    params: ['contactId'],
  } as RouteObject,
}

export const getRouterPathWitParams = (
  routerObject: RouteObject,
  ...params: string[]
) => {
  if (!params || !routerObject.params) return routerObject.url

  let path = routerObject.url
  routerObject.params.forEach(
    (param, paramIndex) =>
      (path = path.replace(`:${param}`, params[paramIndex]))
  )
  return path
}

export const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.BASE.url,
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ROUTER_PATHS.CONTACTS_VIEW.url,
            element: <ContactView />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: ROUTER_PATHS.CONTACTS_EDIT.url,
            element: <ContactEdit />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: ROUTER_PATHS.CONTACTS_DELETE.url,
            action: deleteAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
])
