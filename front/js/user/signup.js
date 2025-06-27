async function register() {
  console.log('[DEBUG] register 버튼 눌림');

  const position = document.querySelector('input[name="position"]:checked').value;
  const student_number = document.getElementById('studentId').value;
  const name = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const department_id = document.getElementById('selectedDepartment').value;
  const phoneRaw = document.getElementById('phone').value;
  const email = document.getElementById('verificationEmail').value;
  const agreeTerms = document.getElementById('agreeTerms').checked;
  const agreePrivacy = document.getElementById('agreePrivacy').checked;

  // 휴대폰 번호에서 하이픈 제거
  const phone = phoneRaw.replace(/[^0-9]/g, '');

  if (!student_number || !name || !password || !department_id || !phone || !email) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  if (!agreeTerms || !agreePrivacy) {
    alert('필수 약관에 동의해주세요.');
    return;
  }

  const data = {
    student_number,
    email,
    password,
    name,
    phone, // ✅ 숫자만 담긴 휴대폰 번호
    department_id,
    position
  };

  try {
    const res = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      alert('회원가입 성공!');
      location.href = '/pages/user/login.html';
    } else {
      alert('회원가입 실패: ' + result.error);
    }
  } catch (err) {
    console.error('[회원가입 에러]', err);
    alert('서버 오류가 발생했습니다.');
  }
}
