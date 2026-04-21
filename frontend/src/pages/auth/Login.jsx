import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { login as loginApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'

const Login = () => {
    const navigate = useNavigate()
    const { login, isReady, isAuthed } = useAuth()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.email.trim()) { setError('이메일을 입력해주세요'); return }
        if (!form.password.trim()) { setError('비밀번호를 입력해주세요'); return }
        try {
            setIsLoading(true)
            setError('')
            const data = await loginApi({ email: form.email.trim(), password: form.password })
            login(data)
            navigate('/app')
        } catch (err) {
            setError(err.message || '로그인을 실패했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    if (isReady && isAuthed) return <Navigate to="/app" replace />

    return (
        <section className='auth'>
            <div className="inner">
                <div className="auth-box">
                    <nav>
                        <h2>로그인</h2>
                        <button onClick={() => navigate(-1)}>뒤로가기</button>
                    </nav>
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일을 입력하세요" />
                            <Input name="password" value={form.password} onChange={handleChange} type="password" placeholder="비밀번호를 입력하세요" />
                        </div>
                        <div className="auth-btn-wrap">
                            <Button text={isLoading ? '로그인 중...' : '로그인'} type="submit" className="primary" disabled={isLoading} />
                        </div>
                    </form>
                    {error && <p className='error-text'>{error}</p>}
                    <div className="auth-now">
                        <span>계정이 없으신가요?</span>
                        <Link to="/signup"><Button text="회원가입하기" /></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
