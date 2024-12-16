import React from 'react'
import GoBack from '@/components/GoBack';
import AddArea from '@/components/AddArea';

export default function page() {
  return (
    <div>
      <GoBack title="Add Area" />
      <AddArea/>
      {/* Upleaging soon */}
    </div>
  )
}
