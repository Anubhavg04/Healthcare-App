import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import SlotPicker from '../components/SlotPicker'

export default function DoctorList(){
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true)
      let { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, specialty')
        .eq('role', 'doctor')
      if (error) { console.error(error); setDoctors([]) }
      else setDoctors(data)
      setLoading(false)
    }
    fetchDoctors()
  }, [])

  if (loading) return <div>Loading doctors...</div>
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4">
      {doctors.map(doc => (
        <div key={doc.id} className="p-4 border rounded">
          <h3 className="text-lg font-semibold">{doc.full_name}</h3>
          <p className="text-sm">{doc.specialty}</p>
          <SlotPicker doctorId={doc.id} />
        </div>
      ))}
    </div>
  )
}
