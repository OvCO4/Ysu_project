document.addEventListener('DOMContentLoaded', () => {
  console.log('[DEBUG] DOMContentLoaded 시작');

  const saveBtn = document.getElementById('saveSettingsBtn');
  const cancelBtn = document.getElementById('cancelSettingsBtn');

  if (!saveBtn || !cancelBtn) {
    console.error('[ERROR] 저장 또는 취소 버튼이 HTML에 없습니다.');
    return;
  }

  console.log('[DEBUG] 버튼 이벤트 연결 완료');

  saveBtn.addEventListener('click', saveSettings);
  cancelBtn.addEventListener('click', loadSettings);

  loadSettings();
});

async function loadSettings() {
  try {
    console.log('[DEBUG] 설정 불러오기 시작');

    const res = await fetch('/api/settings/me',{
      method: 'GET',
      credentials: 'include'
    });
    if (!res.ok) throw new Error('설정 불러오기 실패: ' + res.status);

    const settings = await res.json();

    console.log('[DEBUG] 받아온 설정:', settings);

    document.getElementById('notificationToggle').checked = settings.notifications_enabled;
    document.getElementById('notifCategory-공지사항').checked = settings.category_notice;
    document.getElementById('notifCategory-커뮤니티').checked = settings.category_community;

  } catch (err) {
    console.error('[ERROR] 설정 불러오기 실패:', err);
    alert('설정을 불러오는 중 오류 발생: ' + err.message);
  }
}

async function saveSettings() {
  console.log('[DEBUG] 저장 버튼 클릭됨');

  const data = {
    notifications_enabled: document.getElementById('notificationToggle').checked,
    category_notice: document.getElementById('notifCategory-공지사항').checked,
    category_community: document.getElementById('notifCategory-커뮤니티').checked,
  };

  console.log('[DEBUG] 전송할 데이터:', data);

  try {
    const res = await fetch('/api/settings/me', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',  // ✅ 여기도 꼭 필요
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errData = await res.text();
      throw new Error(`설정 저장 실패: ${res.status} ${errData}`);
    }

    const result = await res.json();
    console.log('[DEBUG] 저장 응답:', result);

    alert('설정이 저장되었습니다!');
  } catch (err) {
    console.error('[ERROR] 설정 저장 중 실패:', err);
    alert('설정 저장 중 오류 발생: ' + err.message);
  }
}
