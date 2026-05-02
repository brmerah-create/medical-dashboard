import { useState, useEffect } from "react";

import PatientSection from "./components/PatientCard";
import AppointmentSection from "./components/AppointmentCard";
import DoctorSection from "./components/DoctorCard";

import "./App.css";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  
  useEffect(() => {
    
    fetch("http://127.0.0.1:8000/api/patients/")
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error("Patients error:", err));

    
    fetch("http://127.0.0.1:8000/api/doctors/")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error("Doctors error:", err));

    
    fetch("http://127.0.0.1:8000/api/appointments/")
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error("Appointments error:", err));
  }, []);

  return (
    <div className="app">
      <h1>🏥 Medical Dashboard</h1>

      <PatientSection patients={patients} setPatients={setPatients} />

      <AppointmentSection
        doctors={doctors}
        appointments={appointments}
        setAppointments={setAppointments}
      />

      <DoctorSection doctors={doctors} setDoctors={setDoctors} />
    </div>
  );
}
