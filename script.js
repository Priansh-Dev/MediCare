// Sample Indian doctors data
const doctors = [
    {
        id: 1,
        name: "Dr. Rajesh Kumar",
        specialty: "Cardiologist",
        experience: "15 years",
        qualification: "MBBS, MD (Cardiology)",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "Dr. Priya Sharma",
        specialty: "Dermatologist",
        experience: "12 years",
        qualification: "MBBS, MD (Dermatology)",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "Dr. Amit Patel",
        specialty: "Pediatrician",
        experience: "10 years",
        qualification: "MBBS, MD (Pediatrics)",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 4,
        name: "Dr. Sunita Gupta",
        specialty: "Orthopedic",
        experience: "18 years",
        qualification: "MBBS, MS (Orthopedics)",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 5,
        name: "Dr. Vikram Singh",
        specialty: "Neurologist",
        experience: "14 years",
        qualification: "MBBS, DM (Neurology)",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face"
    },
    {
        id: 6,
        name: "Dr. Kavita Reddy",
        specialty: "General Physician",
        experience: "8 years",
        qualification: "MBBS, MD (General Medicine)",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face"
    }
];

// Global state
let currentUser = null;
let userType = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayDoctors();
    setMinDate();
    clearStorageData();
    checkUserSession();
    setupEventListeners();
});

// Clear all stored data
function clearStorageData() {
    localStorage.removeItem('patients');
    localStorage.removeItem('doctors');
    localStorage.removeItem('appointments');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
}

// Check if user is already logged in
function checkUserSession() {
    const user = localStorage.getItem('currentUser');
    const type = localStorage.getItem('userType');
    
    if (user && type) {
        currentUser = JSON.parse(user);
        userType = type;
        showUserInterface();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
    
    // Booking form
    document.getElementById('bookingForm').addEventListener('submit', handleBooking);
}

// Display doctors
function displayDoctors() {
    const doctorsGrid = document.getElementById('doctorsGrid');
    const doctorSelect = document.getElementById('doctorSelect');
    
    doctorsGrid.innerHTML = '';
    doctorSelect.innerHTML = '<option value="">Choose a doctor</option>';
    
    doctors.forEach(doctor => {
        // Create doctor card
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        doctorCard.innerHTML = `
            <img src="${doctor.image}" alt="${doctor.name}">
            <h3>${doctor.name}</h3>
            <p class="specialty">${doctor.specialty}</p>
            <p class="qualification">${doctor.qualification}</p>
            <p class="experience">${doctor.experience} experience</p>
            <button class="book-btn" onclick="showBookingForm(${doctor.id})">Book Appointment</button>
        `;
        doctorsGrid.appendChild(doctorCard);
        
        // Add to select dropdown
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = `${doctor.name} - ${doctor.specialty}`;
        doctorSelect.appendChild(option);
    });
}

// Authentication functions
function showLogin(type) {
    userType = type;
    document.getElementById('loginTitle').textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Login`;
    document.getElementById('loginModal').style.display = 'block';
}

function switchToRegister() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerTitle').textContent = `${userType.charAt(0).toUpperCase() + userType.slice(1)} Registration`;
    
    if (userType === 'doctor') {
        document.getElementById('specialtyGroup').style.display = 'block';
        document.getElementById('registerSpecialty').required = true;
    } else {
        document.getElementById('specialtyGroup').style.display = 'none';
        document.getElementById('registerSpecialty').required = false;
    }
    
    document.getElementById('registerModal').style.display = 'block';
}

function switchToLogin() {
    document.getElementById('registerModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'block';
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simulate login (replace with actual API call)
    const users = JSON.parse(localStorage.getItem(`${userType}s`)) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userType', userType);
        
        closeModal('loginModal');
        showUserInterface();
        alert('Login successful!');
    } else {
        alert('Invalid credentials!');
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const userData = {
        id: Date.now(),
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value,
        phone: document.getElementById('registerPhone').value,
        password: document.getElementById('registerPassword').value,
        type: userType
    };
    
    if (userType === 'doctor') {
        userData.specialty = document.getElementById('registerSpecialty').value;
    }
    
    // Save user (replace with actual API call)
    const users = JSON.parse(localStorage.getItem(`${userType}s`)) || [];
    users.push(userData);
    localStorage.setItem(`${userType}s`, JSON.stringify(users));
    
    closeModal('registerModal');
    alert('Registration successful! Please login.');
    showLogin(userType);
}

function showUserInterface() {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userMenu').style.display = 'flex';
    document.getElementById('userName').textContent = `Welcome, ${currentUser.name}`;
    
    if (userType === 'patient') {
        document.getElementById('patientDashboard').style.display = 'block';
        loadPatientAppointments();
    } else {
        document.getElementById('doctorDashboard').style.display = 'block';
        loadDoctorAppointments();
    }
}

function logout() {
    currentUser = null;
    userType = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    
    document.getElementById('authButtons').style.display = 'flex';
    document.getElementById('userMenu').style.display = 'none';
    document.getElementById('patientDashboard').style.display = 'none';
    document.getElementById('doctorDashboard').style.display = 'none';
}

// Booking functions
function showBookingForm(doctorId = null) {
    if (!currentUser || userType !== 'patient') {
        alert('Please login as a patient to book appointments');
        showLogin('patient');
        return;
    }
    
    const modal = document.getElementById('bookingModal');
    const doctorSelect = document.getElementById('doctorSelect');
    
    if (doctorId) {
        doctorSelect.value = doctorId;
    }
    
    modal.style.display = 'block';
}

function handleBooking(e) {
    e.preventDefault();
    
    const formData = {
        id: Date.now(),
        patientId: currentUser.id,
        patientName: currentUser.name,
        patientEmail: currentUser.email,
        patientPhone: currentUser.phone,
        doctorId: document.getElementById('doctorSelect').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        reason: document.getElementById('reason').value,
        status: 'Scheduled'
    };
    
    // Get doctor details
    const doctor = doctors.find(d => d.id == formData.doctorId);
    formData.doctorName = doctor ? doctor.name : 'Unknown';
    formData.doctorSpecialty = doctor ? doctor.specialty : 'Unknown';
    
    // Save appointment
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(formData);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    
    closeModal('bookingModal');
    alert('Appointment booked successfully!');
    loadPatientAppointments();
}

function loadPatientAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const patientAppointments = appointments.filter(apt => apt.patientId === currentUser.id);
    
    const container = document.getElementById('patientAppointments');
    
    if (patientAppointments.length === 0) {
        container.innerHTML = '<p>No appointments scheduled</p>';
        return;
    }
    
    container.innerHTML = patientAppointments.map(apt => `
        <div class="appointment-item">
            <strong>${apt.doctorName}</strong><br>
            ${new Date(apt.date).toLocaleDateString()} at ${formatTime(apt.time)}<br>
            <span class="status">${apt.status}</span>
        </div>
    `).join('');
}

function loadDoctorAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const doctorAppointments = appointments.filter(apt => apt.doctorName === currentUser.name);
    
    const container = document.getElementById('doctorAppointments');
    
    if (doctorAppointments.length === 0) {
        container.innerHTML = '<p>No appointments today</p>';
        return;
    }
    
    container.innerHTML = doctorAppointments.map(apt => `
        <div class="appointment-item">
            <strong>${apt.patientName}</strong><br>
            ${new Date(apt.date).toLocaleDateString()} at ${formatTime(apt.time)}<br>
            <span class="reason">${apt.reason || 'General consultation'}</span>
        </div>
    `).join('');
}

// Modal functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Reset forms
    const forms = document.querySelectorAll(`#${modalId} form`);
    forms.forEach(form => form.reset());
}

// Set minimum date to today
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;
}

// Format time from 24-hour to 12-hour format
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = ['loginModal', 'registerModal', 'bookingModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            closeModal(modalId);
        }
    });
});