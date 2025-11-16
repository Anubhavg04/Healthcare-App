import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('patient')
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    const { user, session, error } = await supabase.auth.signUp({
      email, password
    })
    if (error) return alert(error.message)

    // create profile row in 'profiles' table using the newly created user id
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user.id, full_name: fullName, role }])
    if (profileError) {
      console.error(profileError)
      return alert('Profile creation failed')
    }
    alert('Signup successful. Check email to confirm (if enabled).')
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 shadow rounded">
      <h2 className="text-2xl mb-4">Sign up</h2>
      <form onSubmit={handleSignup} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
        <input className="w-full p-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border">
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
        <button className="w-full bg-blue-600 text-white p-2 rounded">Sign up</button>
      </form>
    </div>
  )
}
