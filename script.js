let patients = [];
let doctors = [];
let appointments = [];

// Modal toggles
const patientModal = document.getElementById('patientModal');
const doctorModal = document.getElementById('doctorModal');
const appointmentModal = document.getElementById('appointmentModal');

const addPatientBtn = document.getElementById('addPatientBtn');
const addDoctorBtn = document.getElementById('addDoctorBtn');
const bookAppointmentBtn = document.getElementById('bookAppointmentBtn');
const viewPatientsBtn = document.getElementById('viewPatientsBtn');
const viewDoctorsBtn = document.getElementById('viewDoctorsBtn');

const closePatientModal = document.getElementById('closePatientModal');
const closeDoctorModal = document.getElementById('closeDoctorModal');
const closeAppointmentModal = document.getElementById('closeAppointmentModal');

// Form Elements
const patientForm = document.getElementById('patientForm');
const doctorForm = document.getElementById('doctorForm');
const appointmentForm = document.getElementById('appointmentForm');

// Table Elements
const patientTableBody = document.querySelector('#patientTable tbody');
const doctorTableBody = document.querySelector('#doctorTable tbody');
const appointmentTableBody = document.querySelector('#appointmentTable tbody');

// Show modal functions
addPatientBtn.addEventListener('click', () => {
    patientModal.style.display = 'flex';
});

addDoctorBtn.addEventListener('click', () => {
    doctorModal.style.display = 'flex';
});

bookAppointmentBtn.addEventListener('click', () => {
    appointmentModal.style.display = 'flex';
});

// Close modal functions
closePatientModal.addEventListener('click', () => {
    patientModal.style.display = 'none';
});

closeDoctorModal.addEventListener('click', () => {
    doctorModal.style.display = 'none';
});

closeAppointmentModal.addEventListener('click', () => {
    appointmentModal.style.display = 'none';
});

// Patient form submission
patientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const patient = {
        id: patients.length + 1,
        name: document.getElementById('patientName').value,
        age: document.getElementById('patientAge').value,
        Cause: document.getElementById('patientAilment').value
    };
    patients.push(patient);
    updatePatientTable();
    patientModal.style.display = 'none';
    patientForm.reset();
});

// Doctor form submission
doctorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const doctor = {
        id: doctors.length + 1,
        name: document.getElementById('doctorName').value,
        specialization: document.getElementById('doctorSpecialization').value
    };
    doctors.push(doctor);
    updateDoctorTable();
    doctorModal.style.display = 'none';
    doctorForm.reset();
});

// Appointment form submission
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const patientId = document.getElementById('appointmentPatientId').value;
    const doctorId = document.getElementById('appointmentDoctorId').value;
    const appointmentDate = document.getElementById('appointmentDate').value;

    // Validate the patientId and doctorId
    const patient = patients.find(p => p.id == patientId);
    const doctor = doctors.find(d => d.id == doctorId);

    if (!patient) {
        alert("Patient ID not found!");
        return;
    }
    if (!doctor) {
        alert("Doctor ID not found!");
        return;
    }

    const appointment = {
        patientId: patient.id,
        doctorId: doctor.id,
        date: appointmentDate,
        patientName: patient.name,
        doctorName: doctor.name
    };

    appointments.push(appointment);
    updateAppointmentTable();
    appointmentModal.style.display = 'none';
    appointmentForm.reset();
});

// Update patient table
function updatePatientTable() {
    patientTableBody.innerHTML = '';
    if (patients.length > 0) {
        patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${patient.id}</td><td>${patient.name}</td><td>${patient.age}</td><td>${patient.ailment}</td>`;
            patientTableBody.appendChild(row);
        });
    } else {
        patientTableBody.innerHTML = '<tr><td colspan="4">No patients available</td></tr>';
    }
}

// Update doctor table
function updateDoctorTable() {
    doctorTableBody.innerHTML = '';
    if (doctors.length > 0) {
        doctors.forEach(doctor => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${doctor.id}</td><td>${doctor.name}</td><td>${doctor.specialization}</td>`;
            doctorTableBody.appendChild(row);
        });
    } else {
        doctorTableBody.innerHTML = '<tr><td colspan="3">No doctors available</td></tr>';
    }
}

// Update appointment table
function updateAppointmentTable() {
    appointmentTableBody.innerHTML = '';
    if (appointments.length > 0) {
        appointments.forEach(appointment => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${appointment.patientName}</td><td>${appointment.doctorName}</td><td>${appointment.date}</td>`;
            appointmentTableBody.appendChild(row);
        });
    } else {
        appointmentTableBody.innerHTML = '<tr><td colspan="3">No appointments booked</td></tr>';
    }
}

// View Patients and Doctors
viewPatientsBtn.addEventListener('click', () => {
    updatePatientTable();
});

viewDoctorsBtn.addEventListener('click', () => {
    updateDoctorTable();
});
