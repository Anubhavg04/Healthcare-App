import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function SlotPicker({ doctorId }){
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('doctor_slots')
        .select('*')
        .eq('doctor_id', doctorId)
        .eq('is_booked', false)
        .order('slot_start', { ascending: true })
      if (error) console.error(error)
      else setSlots(data)
      setLoading(false)
    }
    fetchSlots()
  }, [doctorId])

  if (loading) return <div>Loading slots...</div>
  if (!slots.length) return <div>No available slots</div>

  return (
    <div className="mt-2">
      <h4 className="text-sm font-medium">Available slots</h4>
      <ul className="space-y-2">
        {slots.map(s => (
          <li key={s.id} className="flex justify-between items-center">
            <div>
              <div>{new Date(s.slot_start).toLocaleString()}</div>
            </div>
            <button onClick={() => handleBook(s.id)} className="bg-blue-500 text-white px-3 py-1 rounded">Book</button>
          </li>
        ))}
      </ul>
    </div>
  )

  async function handleBook(slotId) {
    // create appointment and mark slot booked
    const user = supabase.auth.user()
    if (!user) return alert('Please login to book')
    // simple flow: insert appointment then set slot is_booked true
    // NOTE: better to use RPC to ensure atomicity; this is simple demo
    const { data: appt, error: apptErr } = await supabase
      .from('appointments')
      .insert([{ patient_id: user.id, doctor_id: doctorId, slot_id: slotId }])
      .select().single()
    if (apptErr) return alert(apptErr.message)
    const { error: slotErr } = await supabase
      .from('doctor_slots')
      .update({ is_booked: true })
      .eq('id', slotId)
    if (slotErr) {
      console.error(slotErr)
      alert('Booked appointment but failed to update slot. Contact admin.')
    } else {
      alert('Appointment booked!')
      // refresh slots
      setSlots(prev => prev.filter(x => x.id !== slotId))
    }
  }
}
