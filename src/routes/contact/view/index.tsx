import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  useLoaderData,
} from 'react-router-dom'

import {
  ContactModel,
  getContact,
  updateContact,
} from '../../../repositories/contacts'
import { RouteParams } from '../types'

import { Favorite } from './components/Favorite'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const routeParams = params as RouteParams
  const contact = await getContact(routeParams.contactId)

  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return contact
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const routeParams = params as RouteParams
  return updateContact(routeParams.contactId, {
    favorite: formData.get('favorite') === 'true',
  })
}

export default function ContactView() {
  const contact = useLoaderData() as ContactModel

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}
