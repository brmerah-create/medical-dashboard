import { useState } from "react";

const API_URL = "http://127.0.0.1:8000/api/appointments/";

export default function AppointmentCard({
  appointments,
  setAppointments,
  doctors,
  patients,
}) {
  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    appointment_date: "",
    start_time: "",
    end_time: "",
    reason: "",
    is_emergency: false,
    status: "SCHEDULED",
  });


  const addAppointment = () => {
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments([...appointments, data]);

        setForm({
          patient: "",
          doctor: "",
          appointment_date: "",
          start_time: "",
          end_time: "",
          reason: "",
          is_emergency: false,
          status: "SCHEDULED",
        });
      })
      .catch((err) => console.log("Add appointment error:", err));
  };


  const deleteAppointment = (id) => {
    fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    }).then(() => {
      setAppointments(appointments.filter((a) => a.id !== id));
    });
  };

  return (
    <div className="section">
      <h2>📅 Appointments</h2>

      {/* FORM */}
      <div className="form">

    
        <select
          value={form.patient}
          onChange={(e) => setForm({ ...form, patient: e.target.value })}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.user?.full_name || "Patient"}
            </option>
          ))}
        </select>


        <select
          value={form.doctor}
          onChange={(e) => setForm({ ...form, doctor: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              Dr. {d.user?.full_name}
            </option>
          ))}
        </select>

      
        <input
          type="date"
          value={form.appointment_date}
          onChange={(e) =>
            setForm({ ...form, appointment_date: e.target.value })
          }
        />

        <input
          type="time"
          value={form.start_time}
          onChange={(e) =>
            setForm({ ...form, start_time: e.target.value })
          }
        />

        <input
          type="time"
          value={form.end_time}
          onChange={(e) =>
            setForm({ ...form, end_time: e.target.value })
          }
        />

        
        <input
          placeholder="Reason"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
        />

      
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="SCHEDULED">Scheduled</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <button className="btn" onClick={addAppointment}>
          ➕ Add Appointment
        </button>
      </div>

      {/* LIST */}
      <div className="list">
        {appointments.map((a) => (
          <div className="card" key={a.id}>
            <h3>📅 Appointment</h3>

            <p> Patient ID: {a.patient}</p>
            <p> Doctor ID: {a.doctor}</p>

            <p> Date: {a.appointment_date}</p>
            <p> Time: {a.start_time} → {a.end_time}</p>

            <p> Status: {a.status}</p>
            <p> Reason: {a.reason}</p>

            <button className="delete" onClick={() => deleteAppointment(a.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
