import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PostHeader from '@/components/posts/PostHeader'
import PostList from '@/components/posts/PostList'
import Input from '@/components/ui/Input'
import { getPosts } from '@/api/post.api'
import useFilteredPosts from '@/hooks/useFilteredPosts'

const PAGE_SIZE = 6

const PostAll = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [posts, setPosts] = useState([])
    const [fetchError, setFetchError] = useState('')
    const [page, setPage] = useState(1)
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
    const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE)
    const pagedPosts = filteredPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    return (
        <section className='page post-section'>
            <div className="inner">
                <PostHeader
                    onClick={() => navigate('/app/posts/new')}
                    title='전체 게시글'
                    showButton
                    buttonText="작성하기"
                    buttonClass="primary"
                />
                <div className="input-post">
                    <Input
                        placeholder="게시글 제목 또는 내용을 검색하세요"
                        value={searchKeyword}
                        onChange={(e) => { setSearchKeyword(e.target.value); setPage(1) }}
                    />
                </div>
                {fetchError && <p className='error-text'>{fetchError}</p>}
                <PostList posts={pagedPosts} />
                {totalPages > 1 && (
                    <div className="pagination">
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>이전</button>
                        <span>{page} / {totalPages}</span>
                        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>다음</button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default PostAll
