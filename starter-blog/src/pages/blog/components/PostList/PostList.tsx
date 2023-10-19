import { useGetPostsQuery } from 'service/blog.service'
import PostItem from '../PostItem'
import SkeletonPost from '../SkeletonPost'

function PostList() {
  const { data, isFetching } = useGetPostsQuery()
  console.log('🚀 ~ file: PostList.tsx:6 ~ PostList ~ data:', data, isFetching)

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Được Dev Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {isFetching
            ? Array(4)
                .fill(null)
                .map((item, index) => <SkeletonPost key={index} />)
            : data && data?.length > 0
            ? data?.map((item) => (
                <PostItem
                  key={item.id}
                  id={item.id}
                  description={item.description}
                  featuredImage={item.featuredImage}
                  publishDate={item.publishDate}
                  title={item.title}
                  published={item.published}
                />
              ))
            : 'No item'}
          {/* <PostItem />
          <PostItem />
          <PostItem />
          <PostItem /> */}
        </div>
      </div>
    </div>
  )
}

export default PostList
