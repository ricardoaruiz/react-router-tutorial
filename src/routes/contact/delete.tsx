import { ActionFunctionArgs, redirect } from 'react-router-dom'

import { deleteContact } from '../../repositories/contacts'
import { ROUTER_PATHS } from '..'

import { RouteParams } from './types'

export const action = async ({ params }: ActionFunctionArgs) => {
  const { contactId } = params as RouteParams
  await deleteContact(contactId)
  return redirect(ROUTER_PATHS.BASE.url)
}
