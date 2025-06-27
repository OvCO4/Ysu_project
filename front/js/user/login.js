document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      student_number: form.student_number.value,  // ← email → student_number로 수정
      password: form.password.value
    };

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        alert('로그인 성공');
        location.href = '/';
      } else {
        alert('로그인 실패: ' + result.error);
      }
    } catch (err) {
      console.error(err);
      alert('서버 오류');
    }
  });
});
