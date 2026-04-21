import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostHeader from '@/components/posts/PostHeader'
import PostList from '@/components/posts/PostList'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { getPosts } from '@/api/post.api'
import useFilteredPosts from '@/hooks/useFilteredPosts'

const PostDashboard = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [posts, setPosts] = useState([])
    const [fetchError, setFetchError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setFetchError('')
        const fetchPosts = async () => {
            try {
                const response = await getPosts()
                const rawPosts = Array.isArray(response) ? response
                    : Array.isArray(response?.data) ? response.data : []
                setPosts(rawPosts)
            } catch (error) {
                setFetchError(error?.response?.data?.message || error.message || '게시글 조회 실패')
                setPosts([])
            }
        }
        fetchPosts()
    }, [])

    const filteredPosts = useFilteredPosts(posts, '전체', searchKeyword)

    return (
        <section className='page post-section'>
            <div className="inner">
                <PostHeader
                    onClick={() => navigate('/app/posts/new')}
                    title='내 게시글'
                    showButton
                    buttonText="작성하기"
                    buttonClass="primary"
                />
                <div className="input-post">
                    <Input
                        placeholder="게시글 제목 또는 내용을 검색하세요"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
                <div className="tags-wrapper">
                    <Button text="전체 게시글 보기" className="wh" onClick={() => navigate('/app/posts/all')} />
                </div>
                {fetchError && <p className='error-text'>{fetchError}</p>}
                <PostList posts={filteredPosts.slice(0, 3)} />
            </div>
        </section>
    )
}

export default PostDashboard
