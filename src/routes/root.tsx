import {
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from 'react-router-dom'

import { Menu, SearchForm } from '../components'
import {
  ContactModel,
  createContact,
  getContacts,
} from '../repositories/contacts'

import { getRouterPathWitParams, ROUTER_PATHS } from '.'

type Loader = {
  contacts: ContactModel[]
  q: string | null
}

export const loader = async ({
  request,
}: LoaderFunctionArgs): Promise<Loader> => {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const contacts = await getContacts(q)
  return { contacts, q }
}

export const action = async () => {
  const contact = await createContact()
  const contactId = contact.id || ''
  return redirect(getRouterPathWitParams(ROUTER_PATHS.CONTACTS_EDIT, contactId))
}

export default function Root() {
  const navigation = useNavigation()
  const { contacts, q } = useLoaderData() as Loader

  const detailLoadingClass = navigation.state === 'loading' ? 'loading' : ''
  const isSearching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q')

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <SearchForm query={q} isSearching={isSearching} />
        <Menu items={contacts} />
      </div>

      <div id="detail" className={detailLoadingClass}>
        <Outlet />
      </div>
    </>
  )
}
