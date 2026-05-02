import { useEffect, useState } from "react";
import PatientCard from "./components/PatientCard";
import DoctorCard from "./components/DoctorCard";
import AppointmentCard from "./components/AppointmentCard";

const API_PATIENTS = "http://127.0.0.1:8000/api/patients/";
const API_DOCTORS = "http://127.0.0.1:8000/api/doctors/";
const API_APPOINTMENTS = "http://127.0.0.1:8000/api/appointments/";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch(API_PATIENTS).then((res) => res.json()).then(setPatients);
    fetch(API_DOCTORS).then((res) => res.json()).then(setDoctors);
    fetch(API_APPOINTMENTS).then((res) => res.json()).then(setAppointments);
  }, []);

  return (
    <div className="app">
      <h1>🏥 Hospital Dashboard</h1>

      <PatientCard patients={patients} setPatients={setPatients} />

      <DoctorCard doctors={doctors} setDoctors={setDoctors} />

      <AppointmentCard
        appointments={appointments}
        setAppointments={setAppointments}
        doctors={doctors}
        patients={patients}
      />
    </div>
  );
}
