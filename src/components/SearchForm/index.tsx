import { useCallback, useEffect, useRef } from 'react'
import { Form, useSubmit } from 'react-router-dom'

import { SearchParamProps } from './types'

export const SearchForm = ({
  query,
  isSearching = false,
}: SearchParamProps) => {
  const searchFieldRef = useRef<HTMLInputElement | null>(null)
  const submit = useSubmit()

  const handleInputSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isFirstSearch = query === null
      submit(event.currentTarget.form, {
        replace: !isFirstSearch,
      })
    },
    [query, submit]
  )

  useEffect(() => {
    if (searchFieldRef.current) searchFieldRef.current.value = query || ''
  }, [query])

  return (
    <div>
      <Form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
          defaultValue={query || ''}
          ref={searchFieldRef}
          onChange={handleInputSearchChange}
          className={isSearching ? 'loading' : ''}
        />
        <div id="search-spinner" aria-hidden hidden={!isSearching} />
        <div className="sr-only" aria-live="polite"></div>
      </Form>

      <Form method="post">
        <button type="submit">New</button>
      </Form>
    </div>
  )
}
