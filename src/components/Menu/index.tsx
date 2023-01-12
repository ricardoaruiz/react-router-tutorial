import { useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import { getRouterPathWitParams, ROUTER_PATHS } from '../../routes'

import { MenuProps } from './types'

export const Menu = ({ items }: MenuProps) => {
  const isActiveLink = useCallback((isActive: boolean, isPending: boolean) => {
    return isActive ? 'active' : isPending ? 'pending' : ''
  }, [])

  return (
    <nav>
      <NavLink
        to={ROUTER_PATHS.BASE.url}
        className={({ isActive, isPending }) =>
          isActiveLink(isActive, isPending)
        }
      >
        Home
      </NavLink>
      <hr />

      <h4>Contacts</h4>

      {items.length ? (
        <ul>
          {items.map((contact) => (
            <li key={contact.id}>
              <NavLink
                to={getRouterPathWitParams(
                  ROUTER_PATHS.CONTACTS_VIEW,
                  contact.id || ''
                )}
                className={({ isActive, isPending }) =>
                  isActiveLink(isActive, isPending)
                }
              >
                {contact.first || contact.last ? (
                  <>
                    {contact.first} {contact.last}
                  </>
                ) : (
                  <i>No Name</i>
                )}{' '}
                {contact.favorite && <span>★</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          <i>No contacts</i>
        </p>
      )}
    </nav>
  )
}
