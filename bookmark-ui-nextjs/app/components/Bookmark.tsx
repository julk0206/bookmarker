import React from 'react'
// 컴포넌트 이름과 타입 이름이 같다면 import 시 conflict 발생
// import 에서 type을 지정하면 import 타입 정의된다
import type { Bookmark } from '../types/bookmark'
import Link from 'next/link'

// 전달받은 props 타입 정의
interface BookmarkProps{
    bookmark: Bookmark,
}

const Bookmark = ({ bookmark } : BookmarkProps) => {
  return (
    <div>
        <div className='alert alert-primary' role='alert'>
            <h5>
                <Link href={bookmark.url}>{bookmark.title}</Link>
            </h5>
        </div>
    </div>
  )
}

export default Bookmark