import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { createPost } from '@/api/post.api'
import { CATEGORY_OPTIONS } from '@/constants/category'

const PostCreate = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ category: 'DAILY', title: '', content: '', image: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드할 수 있습니다')
            return
        }
        const reader = new FileReader()
        reader.onloadend = () => {
            setForm((prev) => ({ ...prev, image: reader.result }))
        }
        reader.readAsDataURL(file)
    }

    const handleImageRemove = (e) => {
        e.stopPropagation()
        setForm((prev) => ({ ...prev, image: '' }))
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.title.trim()) { setError('제목을 입력해주세요'); return }
        if (!form.content.trim()) { setError('내용을 입력해주세요'); return }
        try {
            setIsLoading(true)
            setError('')
            await createPost(form)
            navigate('/app')
        } catch (err) {
            setError(err?.response?.data?.message || err.message || '게시글 작성 실패')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='page post-section'>
            <div className="inner">
                <header className='post-header'>
                    <h2>게시글 작성</h2>
                    <button onClick={() => navigate(-1)}>뒤로가기</button>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <select name="category" value={form.category} onChange={handleChange}>
                            {CATEGORY_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <Input name="title" value={form.title} onChange={handleChange} placeholder="제목을 입력하세요" />
                        <div
                            className="image-upload"
                            onClick={handleImageClick}
                            style={{
                                border: '2px dashed #ccc',
                                borderRadius: '8px',
                                padding: form.image ? '0' : '40px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                minHeight: '160px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            {form.image ? (
                                <>
                                    <img src={form.image} alt="미리보기" style={{ maxWidth: '100%', maxHeight: '400px', display: 'block' }} />
                                    <button
                                        type="button"
                                        onClick={handleImageRemove}
                                        style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: 'rgba(0,0,0,0.6)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '4px 10px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        삭제
                                    </button>
                                </>
                            ) : (
                                <span style={{ color: '#888' }}>클릭하여 이미지를 선택하세요</span>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <textarea name="content" value={form.content} onChange={handleChange} placeholder="내용을 입력하세요" rows={8} />
                    </div>
                    {error && <p className='error-text'>{error}</p>}
                    <div className="btn-wrap">
                        <Button text={isLoading ? '저장 중...' : '저장'} type="submit" className="primary" disabled={isLoading} />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default PostCreate
