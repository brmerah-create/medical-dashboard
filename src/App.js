import { useState } from "react";
import {
  patients as initialPatients,
  doctors as initialDoctors,
  appointments as initialAppointments,
} from "./data/FAKEDATA";

import PatientSection from "./components/PatientCard";
import AppointmentSection from "./components/AppointmentCard";
import DoctorSection from "./components/DoctorCard";

import "./App.css";

export default function App() {
  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);

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
