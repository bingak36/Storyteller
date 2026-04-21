import { useMemo } from 'react'

const useFilteredPosts = (posts, selectedTag, searchKeyword) => {
    return useMemo(() => {
        const keyword = searchKeyword.toLowerCase().trim()
        const filteredByTag = selectedTag === '전체'
            ? posts
            : posts.filter((post) => post.tags && post.tags.includes(selectedTag))
        return filteredByTag.filter((post) => {
            if (!keyword) return true
            return (
                post.title.toLowerCase().includes(keyword) ||
                post.content.toLowerCase().includes(keyword)
            )
        })
    }, [posts, selectedTag, searchKeyword])
}

export default useFilteredPosts
