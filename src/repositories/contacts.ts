import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

export type ContactModel = {
  id?: string
  first?: string
  last?: string
  avatar?: string
  twitter?: string
  notes?: string
  favorite?: boolean
  createdAt?: number
}

export async function getContacts(query?: string | null) {
  await fakeNetwork(`getContacts:${query}`)
  let contacts: ContactModel[] | null = await localforage.getItem('contacts')

  if (!contacts) contacts = []

  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact() {
  await fakeNetwork('createContact')
  const id = Math.random().toString(36).substring(2, 9)
  const contact: ContactModel = { id, createdAt: Date.now() }
  const contacts: ContactModel[] | null = await getContacts()
  if (contacts) {
    contacts.unshift(contact)
    await set(contacts)
  }
  return contact
}

export async function getContact(id: string) {
  await fakeNetwork(`getContact:${id}`)
  const contacts: ContactModel[] | null = await localforage.getItem('contacts')
  const contact = contacts && contacts.find((contact) => contact.id === id)
  return contact ?? null
}

export async function updateContact(id: string, updates: ContactModel) {
  await fakeNetwork(`updateContact:${id}`)
  const contacts: ContactModel[] | null = await localforage.getItem('contacts')
  const contact = contacts && contacts.find((contact) => contact.id === id)
  if (!contact) throw new Error(`No contact found for ${id}`)
  Object.assign(contact, updates)
  contacts && (await set(contacts))
  return contact
}

export async function deleteContact(id: string) {
  const contacts: ContactModel[] | null = await localforage.getItem('contacts')

  if (contacts) {
    const index = contacts.findIndex((contact) => contact.id === id)

    if (contacts && index >= 0) {
      contacts.splice(index, 1)
      await set(contacts)
      return true
    }
  }

  return false
}

function set(contacts: ContactModel[]) {
  return localforage.setItem('contacts', contacts)
}

//===============================================================
type FakeCache = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: FakeCache = {}

async function fakeNetwork(key: string) {
  if (!key) {
    fakeCache = {}
  }

  if (fakeCache[key]) {
    return
  }

  fakeCache[key] = true
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800)
  })
}
