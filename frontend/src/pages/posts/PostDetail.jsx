import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { getPostById, deletePost } from '@/api/post.api'

const PostDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostById(id)
                setPost(data)
            } catch (err) {
                setError(err?.response?.data?.message || err.message || '게시글을 불러올 수 없습니다.')
            }
        }
        fetchPost()
    }, [id])

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return
        try {
            await deletePost(id)
            navigate('/app')
        } catch (err) {
            setError(err?.response?.data?.message || err.message || '삭제 실패')
        }
    }

    if (error) return (
        <section className='page post-section'>
            <div className="inner">
                <p className='error-text'>{error}</p>
                <button onClick={() => navigate(-1)}>뒤로가기</button>
            </div>
        </section>
    )

    if (!post) return <div>로딩 중...</div>

    return (
        <section className='page post-section'>
            <div className="inner">
                <header className='post-header'>
                    <h2>{post.title}</h2>
                    <div>
                        <Button text="수정" onClick={() => navigate(`/app/posts/${id}/edit`)} />
                        <Button text="삭제" className="danger" onClick={handleDelete} />
                        <button onClick={() => navigate(-1)}>뒤로가기</button>
                    </div>
                </header>
                <div className="post-meta">
                    <span>{post.category}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="post-body">
                    <p>{post.content}</p>
                </div>
            </div>
        </section>
    )
}

export default PostDetail
