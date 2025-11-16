import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (error) return alert(error.message)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 shadow rounded">
      <h2 className="text-2xl mb-4">Log in</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 border" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded">Log in</button>
      </form>
    </div>
  )
}
