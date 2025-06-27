// js/index/home/recent-notices.js

async function loadRecentNotices() {
  const container = document.getElementById('recentNotices');
  if (!container) {
    console.warn('[최근 공지사항] 컨테이너가 없습니다');
    return;
  }

  try {
    const res = await fetch('/api/notifications');
    if (!res.ok) throw new Error('공지사항 요청 실패');

    const notices = await res.json();

    if (notices.length === 0) {
      container.innerHTML = '<p>최근 공지사항이 없습니다.</p>';
      return;
    }

    container.innerHTML = notices.slice(0, 5).map(n => `
      <div class="notice-item" onclick="showContent('notices')">
        <div class="notice-title">${n.title}</div>
        <div class="notice-date">${n.display_date}</div>
      </div>
    `).join('');
  } catch (err) {
    console.error('[최근 공지사항 오류]', err);
    container.innerHTML = '<p>공지사항을 불러오는 데 실패했습니다.</p>';
  }
}
