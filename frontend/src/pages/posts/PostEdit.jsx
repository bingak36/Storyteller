import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { getPostById, updatePost } from '@/api/post.api'
import { CATEGORY_OPTIONS } from '@/constants/category'

const PostEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({ category: 'DAILY', title: '', content: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id)
                setForm({ category: data.category, title: data.title, content: data.content })
            } catch (err) {
                setError(err?.response?.data?.message || err.message || '게시글을 불러올 수 없습니다.')
            }
        }
        fetchPost()
    }, [id])

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
            await updatePost(id, form)
            navigate(`/app/posts/${id}`)
        } catch (err) {
            setError(err?.response?.data?.message || err.message || '게시글 수정 실패')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='page post-section'>
            <div className="inner">
                <header className='post-header'>
                    <h2>게시글 수정</h2>
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
                        <Button text={isLoading ? '수정 중...' : '수정 완료'} type="submit" className="primary" disabled={isLoading} />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default PostEdit
