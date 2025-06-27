function toggleUserMenu() {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

async function checkLoginStatus() {
  try {
    const res = await fetch('/api/users/me');
    const result = await res.json();

    const userProfileEl = document.getElementById('user-profile');

    if (result.loggedIn) {
      // 로그인된 상태: 이름, 역할, 드롭다운(설정, 로그아웃)
      sessionStorage.setItem('userId', result.user.id);
      userProfileEl.innerHTML = `
        <div id="user-avatar">👤</div>
        <div id="user-dropdown" style="display: none;">
          <div id="dropdown-user-info">
            <div id="dropdown-user-name">${result.user.name}</div>
            <div id="dropdown-user-role">${getRoleText(result.user.position)}</div>
          </div>
          <button id="dropdown-item-settings" onclick="location.href='/pages/index/setting.html'">⚙️ 설정</button>
          <div id="dropdown-divider"></div>
          <button id="dropdown-item-logout" onclick="handleLogout()" style="color:#ef4444;">
            🚪 로그아웃
          </button>
        </div>
      `;
    } else {
      // ❌ 비로그인 상태: 로그인, 회원가입, 설정
      userProfileEl.innerHTML = `
        <div id="user-avatar">👤</div>
        <div id="user-info">
          <div id="user-name">게스트</div>
          <div id="user-role">방문자</div>
        </div>
        <div id="user-dropdown" style="display: none;">
          <button id="dropdown-item-login" onclick="location.href='/pages/user/login.html'">로그인</button>
          <button id="dropdown-item-signup" onclick="location.href='/pages/user/signup.html'">회원가입</button>
        </div>
      `;
    }
  } catch (err) {
    console.error('[로그인 상태 확인 실패]', err);
  }
}

function getRoleText(position) {
  switch (position) {
    case 1: return '학생';
    case 2: return '교수';
    case 3: return '교직원';
    default: return '사용자';
  }
}

// 로그아웃
async function handleLogout() {
  try {
    const res = await fetch('/api/users/logout', {
      method: 'POST'
    });

    const result = await res.json();

    if (res.ok) {
      alert('로그아웃 되었습니다.');
      location.reload(); // 세션 초기화 후 다시 로그인 여부 확인
    } else {
      alert('로그아웃 실패: ' + result.error);
    }
  } catch (err) {
    console.error('[로그아웃 실패]', err);
    alert('서버 오류로 로그아웃 실패');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await checkLoginStatus();
  document.getElementById('nav-home').click(); // 초기 페이지 로딩
});