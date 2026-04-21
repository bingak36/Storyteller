import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { logout as logoutApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'

const Header = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const menus = [
        { name: '내 게시글', link: '/app/posts/all' },
        { name: '내 프로필', link: '/app/profile' },
        { name: '설정', link: '/app/setting' }
    ]

    const handleLogout = async () => {
        try {
            await logoutApi()
            logout()
            navigate('/')
        } catch (error) {
            alert(error.message || '로그아웃 오류')
        }
    }

    return (
        <header>
            <div className="inner">
                <h1>
                    <Link to="/app">Storyteller</Link>
                </h1>
                <nav>
                    <ul>
                        {menus.map((menu, i) => (
                            <li key={i}>
                                <button onClick={() => navigate(menu.link)}>{menu.name}</button>
                            </li>
                        ))}
                    </ul>
                    <Button text="로그아웃" onClick={handleLogout} />
                </nav>
            </div>
        </header>
    )
}

export default Header
