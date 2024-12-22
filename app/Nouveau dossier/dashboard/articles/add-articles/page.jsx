import React from 'react'
import GoBack from '@/components/GoBack'
import AddArticle from '@/components/AddArticle'

export default function page() {
  return (
    <div>
      <GoBack title='AddArticle' />
      <AddArticle />

    </div>
  )
}
