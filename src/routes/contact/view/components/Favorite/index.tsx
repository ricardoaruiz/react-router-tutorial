import { useFetcher } from 'react-router-dom'

import { FavoriteProps } from './types'

export const Favorite = ({ contact }: FavoriteProps) => {
  const fetcher = useFetcher()
  let favorite = contact.favorite

  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true'
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
