'use client'
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import { useRouter } from 'next/navigation'
import { saveBookmark } from '@/services/api/fetchBookmarks'

const page = () => {

  const router = useRouter();

  // 서버에 전송할 값
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  // 서버에 오류 발생하면 출력할 값
  const [message, setMessage] = useState<String|null>(null);

  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 서버 호출
    if (!url) { // 값 존재 여부 판단
      alert("url이 필수값입니다");
      return;
    }

    const payload = {
      title,
      url
    }

    try {
      saveBookmark(payload)
      .then(response => {
        console.log("Save Bookmark 응답 :", response);
        setTitle("");
        setUrl("");
        // 저장 성공 메시지
        setMessage("새로운 Bookmark가 저장되었습니다");

        setTimeout(() => {
          router.push("/bookmarks");
        }, 1000);
      })

      .catch(error =>{
        setMessage(error.message || "새로운 Bookmark 저장에 실패하였습니다");
      })
    } catch(error) { // Promise에서 reject되었을 경우
      setMessage("새로운 Bookmark 저장에 실패하였습니다");
    }
  }

  return (
    <div>
        {message && <div className='alert alert-primary' role="alert">{message}</div>}
        <form onSubmit={e => handleSubmit(e)}>
          <fieldset>
            <legend>새로운 Bookmark 등록</legend>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>제목</label>
              <input type='text' id='title' className='form-control' placeholder='Title'
                value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className='mb-3'>
              <label htmlFor='url' className='form-label'>링크</label>
              <input type='text' id='url' className='form-control' placeholder='Url'
                value={url} onChange={e => setUrl(e.target.value)}/>
            </div>

            <div className='d-grid gap-2 col-6 mx-auto'>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
          </fieldset>
        </form>
    </div>
  )
}

export default page