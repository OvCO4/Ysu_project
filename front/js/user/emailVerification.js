// 요소 참조
const positionRadios = document.querySelectorAll('input[name="position"]');
const emailSection = document.getElementById('emailVerificationSection');
const emailInput = document.getElementById('verificationEmail');
const sendBtn = document.getElementById('sendVerificationBtn');
const codeInput = document.getElementById('verificationCode');
const verifyBtn = document.getElementById('verifyCodeBtn');
const timerDisplay = document.getElementById('timerDisplay');
const successMsg = document.getElementById('verification-success');

let timerInterval;
let currentCode = '';

// 1. 이메일 인증코드 발송
async function sendVerificationEmail() {
  const email = emailInput.value.trim();
  if (!email.endsWith('@yeonsung.ac.kr')) {
    alert('연성대학교 이메일만 인증 가능합니다.');
    return;
  }

  currentCode = generateCode();

  try {
    const res = await fetch('/api/email/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: currentCode })
    });

    const result = await res.json();
    if (res.ok) {
      alert('이메일로 인증코드가 발송되었습니다.');
      startTimer(300);
      document.getElementById('verificationCodeGroup').style.display = 'block';
      verifyBtn.disabled = false;
    } else {
      alert('메일 발송 실패: ' + result.error);
    }
  } catch (err) {
    console.error('[메일 발송 오류]', err);
    alert('메일 발송 중 서버 오류가 발생했습니다.');
  }
}

// 2. 인증 확인
function verifyEmailCode() {
  const inputCode = codeInput.value.trim();
  if (inputCode === currentCode) {
    successMsg.style.display = 'block';
    clearInterval(timerInterval);
    verifyBtn.disabled = true;
  } else {
    document.getElementById('verification-code-error').style.display = 'block';
  }
}

// 3. 타이머
function startTimer(seconds) {
  clearInterval(timerInterval);
  let remaining = seconds;
  document.getElementById('verificationTimer').style.display = 'block';

  timerInterval = setInterval(() => {
    const min = String(Math.floor(remaining / 60)).padStart(2, '0');
    const sec = String(remaining % 60).padStart(2, '0');
    timerDisplay.textContent = `${min}:${sec}`;

    if (--remaining < 0) {
      clearInterval(timerInterval);
      alert('인증 시간이 초과되었습니다. 다시 시도해주세요.');
      location.reload();
    }
  }, 1000);
}

// 4. 인증코드 생성
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
