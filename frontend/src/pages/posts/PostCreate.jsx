import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { createPost } from '@/api/post.api'
import { CATEGORY_OPTIONS } from '@/constants/category'

const PostCreate = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({ category: 'DAILY', title: '', content: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
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
