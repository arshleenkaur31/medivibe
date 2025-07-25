
  if (!localStorage.getItem('mediVibeLoggedIn')) {
    window.location.href = 'front.html';
  }



    // On first load, seed demo credentials
    window.addEventListener('load', () => {
      if (!localStorage.getItem('mediVibeUser')) {
        const demoUser = {
          user: 'demoUser',
          email: 'demo@medivibe.com',
          pass: 'demoPass'
        };
        localStorage.setItem('mediVibeUser', JSON.stringify(demoUser));
        console.log('Demo account created: demoUser / demoPass');
      }
    });

    function showSignup() {
      document.getElementById('loginForm').classList.add('hidden');
      document.getElementById('signupForm').classList.remove('hidden');
    }

    function showLogin() {
      document.getElementById('signupForm').classList.add('hidden');
      document.getElementById('loginForm').classList.remove('hidden');
    }

    function handleSignup() {
      const user = document.getElementById('signupUsername').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const pass = document.getElementById('signupPassword').value.trim();

      if (!user || !email || !pass) {
        alert('Please fill in all fields.');
        return;
      }

      localStorage.setItem('mediVibeUser', JSON.stringify({ user, email, pass }));
      alert('Account created successfully! Please log in.');
      showLogin();
    }

    function handleLogin() {
      const enteredUser = document.getElementById('loginUsername').value.trim();
      const enteredPass = document.getElementById('loginPassword').value.trim();
      const stored = JSON.parse(localStorage.getItem('mediVibeUser'));

      if (!stored) {
        alert('No user found. Please sign up first.');
        showSignup();
        return;
      }

      if (enteredUser === stored.user && enteredPass === stored.pass) {
        localStorage.setItem('mediVibeLoggedIn', 'true');
        localStorage.setItem('mediVibeCurrentUser', stored.user);
        // Move to landing page
        window.location.href = 'index.html';
      } else {
        alert('Invalid username or password.');
      }
    }

    function handleForgotPassword() {
      const email = prompt('Enter your registered email to reset your password:');
      const stored = JSON.parse(localStorage.getItem('mediVibeUser'));
      if (stored && email === stored.email) {
        alert(`Password reset link sent to ${email}`);
      } else {
        alert('Email not found.');
      }
    }
  