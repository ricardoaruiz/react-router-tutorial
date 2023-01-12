import {
  ActionFunctionArgs,
  Form,
  redirect,
  useLoaderData,
  useNavigate,
} from 'react-router-dom'

import { ContactModel } from '../../repositories/contacts'
import { updateContact } from '../../repositories/contacts'
import { getRouterPathWitParams, ROUTER_PATHS } from '..'

import { RouteParams } from './types'

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const routeParams = params as RouteParams
  const updates = Object.fromEntries(formData)
  await updateContact(routeParams.contactId, updates)

  return redirect(
    getRouterPathWitParams(ROUTER_PATHS.CONTACTS_VIEW, routeParams.contactId)
  )
}

export default function ContactEdit() {
  const navigate = useNavigate()
  const contact = useLoaderData() as ContactModel

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </Form>
  )
}
