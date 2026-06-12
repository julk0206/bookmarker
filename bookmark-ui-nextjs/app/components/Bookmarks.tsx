import React from 'react'
import { BookmarksResponse } from '../types/bookmark'
import Bookmark from './Bookmark';

interface BookmarksProp {
    bookmarks: BookmarksResponse;
}

const Bookmarks = ({ bookmarks }: BookmarksProp) => {
  return (
    <div>
        {
          bookmarks.data.map(bookmark => <Bookmark key={bookmark.id} bookmark={bookmark}/>)
        }
    </div>
  )
}

export default Bookmarks