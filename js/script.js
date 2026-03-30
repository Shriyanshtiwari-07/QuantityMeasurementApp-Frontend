// ── Tab Switching ──
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');

  // Clear all errors
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

  // Reset password visibility
  document.querySelectorAll('.password-wrapper input').forEach(input => input.type = 'password');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
  } else {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
  }
}

// ── Password Toggle ──
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';

  // Swap icon between eye-off and eye
  btn.innerHTML = isHidden
    ? '<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
    : '<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
}

// ── Helpers ──
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

function showError(id, msg) {
  const el = document.getElementById(id + 'Error');
  const input = document.getElementById(id);
  el.textContent = msg;
  input.classList.add('input-error');
}

function clearErrors(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id + 'Error');
    const input = document.getElementById(id);
    if (el) el.textContent = '';
    if (input) input.classList.remove('input-error');
  });
}

// ── Signup Validation ──
function handleSignup(e) {
  e.preventDefault();
  const fields = ['fullName', 'signupEmail', 'signupPassword', 'mobile'];
  clearErrors(fields);

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const mobile = document.getElementById('mobile').value.trim();

  let valid = true;

  if (!fullName) { showError('fullName', 'Full name is required'); valid = false; }
  else if (fullName.length < 2) { showError('fullName', 'Name must be at least 2 characters'); valid = false; }

  if (!email) { showError('signupEmail', 'Email is required'); valid = false; }
  else if (!validateEmail(email)) { showError('signupEmail', 'Enter a valid email'); valid = false; }

  if (!password) { showError('signupPassword', 'Password is required'); valid = false; }
  else if (password.length < 6) { showError('signupPassword', 'Password must be at least 6 characters'); valid = false; }

  if (!mobile) { showError('mobile', 'Mobile number is required'); valid = false; }
  else if (!validatePhone(mobile)) { showError('mobile', 'Enter a valid 10-digit number'); valid = false; }

  if (valid) alert('Signup successful!');
}

// ── Login Validation ──
function handleLogin(e) {
  e.preventDefault();
  const fields = ['loginEmail', 'loginPassword'];
  clearErrors(fields);

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  let valid = true;

  if (!email) { showError('loginEmail', 'Email is required'); valid = false; }
  else if (!validateEmail(email)) { showError('loginEmail', 'Enter a valid email'); valid = false; }

  if (!password) { showError('loginPassword', 'Password is required'); valid = false; }

  if (valid) alert('Login successful!');
}

// signup - password and ConfirmPassword should be Same
function checkSamePassword(e){
  e.preventDefault();

  const password = document.getElementById()
}