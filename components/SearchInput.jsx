import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative mx-2  w-2/3  ">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-8 pr-4 bg-gray-200 rounded-3xl border-0"
      />
    </div>
  )
}

export default SearchInput