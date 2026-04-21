import React from 'react'
import { useAuth } from '@/store/auth.store'

const Profile = () => {
    const { member } = useAuth()
    return (
        <section className='page'>
            <div className="inner">
                <h2>내 프로필</h2>
                {member && (
                    <div>
                        <p>이름: {member.name}</p>
                        <p>이메일: {member.email}</p>
                        <p>전화번호: {member.phone || '-'}</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Profile
