import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useAddPostsMutation } from 'service/blog.service'
import { IPost } from 'types/blog.type'

const initData: Omit<IPost, 'id'> = {
  description: '',
  featuredImage: '',
  publishDate: '',
  published: false,
  title: ''
}

function trimmedFormData<T>(obj: T) {
  let trimmedForm = { ...obj }
  for (const key in obj) {
    trimmedForm[key] = (
      typeof trimmedForm[key] === 'string' ? (trimmedForm[key] as string).trim() : trimmedForm[key]
    ) as T[typeof key]
  }

  return trimmedForm
}

export default function CreatePost() {
  const [formData, setFormData] = useState(initData)

  const [addPost] = useAddPostsMutation()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    let trimmedForm = trimmedFormData(formData)

    const res = await addPost(trimmedForm).unwrap()
    setFormData(initData)
    console.log('🚀 ~ file: CreatePost.tsx:21 ~ onSubmit ~ res:', res)
  }

  function onFieldChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let element = e.target

    if (element.type !== 'checkbox') {
      setFormData((prv) => ({ ...prv, [element.name]: element.value })) // Not checkbox
    } else {
      setFormData((prv) => ({ ...prv, [element.name]: (element as HTMLInputElement).checked })) // Is checkbox
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='mb-6'>
        <label htmlFor='title' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Title
        </label>
        <input
          type='text'
          name='title'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Title'
          required
          onChange={onFieldChange}
          value={formData.title}
        />
      </div>
      <div className='mb-6'>
        <label htmlFor='featuredImage' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Featured Image
        </label>
        <input
          type='text'
          name='featuredImage'
          className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='Url image'
          required
          onChange={onFieldChange}
          value={formData.featuredImage}
        />
      </div>
      <div className='mb-6'>
        <div>
          <label htmlFor='description' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400'>
            Description
          </label>
          <textarea
            name='description'
            rows={3}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
            placeholder='Your description...'
            required
            onChange={onFieldChange}
            value={formData.description}
          />
        </div>
      </div>
      <div className='mb-6'>
        <label htmlFor='publishDate' className='mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300'>
          Publish Date
        </label>
        <input
          type='datetime-local'
          name='publishDate'
          className='block w-56 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500'
          placeholder='publishDate'
          required
          onChange={onFieldChange}
          value={formData.publishDate}
        />
      </div>
      <div className='mb-6 flex items-center'>
        <input
          id='published'
          name='published'
          type='checkbox'
          className='h-4 w-4 focus:ring-2 focus:ring-blue-500'
          onChange={onFieldChange}
          checked={formData.published}
        />
        <label htmlFor='published' className='ml-2 text-sm font-medium text-gray-900'>
          Publish
        </label>
      </div>
      <div>
        <button
          className='group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
          type='submit'
        >
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            Publish Post
          </span>
        </button>

        {/* Update */}
        {/* <button
          type='submit'
          className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-lime-200 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 dark:focus:ring-lime-800'
        >
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            Update Post
          </span>
        </button> */}

        {/* Cancel */}
        {/* <button
          type='reset'
          className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400'
        >
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            Cancel
          </span>
        </button> */}
      </div>
    </form>
  )
}
