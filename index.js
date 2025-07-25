
  if (!localStorage.getItem('mediVibeLoggedIn')) {
    window.location.href = 'front.html';
  }



  function bookAppointment() {
    const date = document.getElementById('appointmentDate').value;
    const doctor = document.getElementById('doctor').value;

    if (!date || !doctor) {
      alert('Please select both a date and a doctor.');
      return;
    }

    const confirmationBox = document.getElementById('confirmation');
    confirmationBox.style.display = 'block';
    confirmationBox.innerHTML = `
       <strong>Appointment Confirmed!</strong><br>
      Doctor: ${doctor}<br>
      Date: ${date}
    `;
  }


 
  // Toggle profile dropdown
  document.getElementById('profileButton').addEventListener('click', function(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('profileDropdown');
    const button = document.getElementById('profileButton');
    if (!button.contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });

  function logout() {
    localStorage.removeItem('mediVibeLoggedIn');
    localStorage.removeItem('mediVibeUser');
    window.location.href = 'front.html';
  }


