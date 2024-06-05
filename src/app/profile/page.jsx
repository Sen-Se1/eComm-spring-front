import Profile from '@/components/profile/profile'
import React from 'react'

const ProfilePage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-5 py-10">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
      <Profile />
    </div>
  </section>)
}

export default ProfilePage