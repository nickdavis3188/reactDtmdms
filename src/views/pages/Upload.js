/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import baseUrl from '../../config/config'
const Upload = () => {
  const [file, setFile] = useState('')
  const [previewsourse, setPreviewSourc] = useState('')
  //
  const submitFile = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreviewSourc(reader.result)
      console.log(reader)
      uploadImg(reader.result)
    }
  }
  const uploadImg = async (e) => {
    const loadData = await fetch(`${baseUrl}/api/v1/member/fuploads`, {
      method: 'POST',
      body: JSON.stringify({ file: e }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await loadData.json()
    console.log('status', data.status)
    console.log('data', data.data)
  }
  return (
    <>
      <form onSubmit={(e) => submitFile(e)}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">upload</button>
      </form>
      {previewsourse && <img src={previewsourse} width="100px" alt="preview" />}
    </>
  )
}
export default Upload
