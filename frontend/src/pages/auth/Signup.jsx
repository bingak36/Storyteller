import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { signup as signupApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'

const Signup = () => {
    const navigate = useNavigate()
    const { isReady, isAuthed } = useAuth()
    const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirm: '', phone: '' })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name.trim()) { setError('이름을 입력해주세요'); return }
        if (!form.email.trim()) { setError('이메일을 입력해주세요'); return }
        if (!form.password.trim()) { setError('비밀번호를 입력해주세요'); return }
        if (!form.passwordConfirm.trim()) { setError('비밀번호 확인을 입력해주세요'); return }
        try {
            setIsLoading(true)
            setError('')
            await signupApi({
                name: form.name.trim(),
                email: form.email.trim(),
                password: form.password,
                passwordConfirm: form.passwordConfirm,
                phone: form.phone.trim()
            })
            navigate('/login')
        } catch (err) {
            setError(err.message || '회원가입을 실패했습니다.')
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
                        <h2>회원가입</h2>
                        <button onClick={() => navigate(-1)}>뒤로가기</button>
                    </nav>
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <Input name="name" value={form.name} onChange={handleChange} placeholder="이름을 입력하세요" />
                            <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="이메일을 입력하세요" />
                            <Input name="password" value={form.password} onChange={handleChange} type="password" placeholder="비밀번호를 입력하세요 (6자 이상)" />
                            <Input name="passwordConfirm" value={form.passwordConfirm} onChange={handleChange} type="password" placeholder="비밀번호를 다시 입력하세요" />
                            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="전화번호를 입력하세요 (선택)" />
                        </div>
                        <div className="auth-btn-wrap">
                            <Button text={isLoading ? '가입 중...' : '회원가입'} type="submit" className="primary" disabled={isLoading} />
                        </div>
                    </form>
                    {error && <p className='error-text'>{error}</p>}
                    <div className="auth-now">
                        <span>이미 계정이 있으신가요?</span>
                        <Link to="/login"><Button text="로그인하기" /></Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signup
