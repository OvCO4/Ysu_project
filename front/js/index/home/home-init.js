document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('homeContent')) {
    loadRecentNotices();  // ← 이거 추가
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const homeContent = document.getElementById('homeContent');
  if (homeContent && homeContent.style.display !== 'none') {
    initNaverMap();
  } else {
    console.warn('[홈] homeContent가 아직 표시되지 않음 → setTimeout으로 재시도');
    setTimeout(() => {
      const again = document.getElementById('homeContent');
      if (again) {
        initNaverMap();
      } else {
        console.error('homeContent 여전히 없음. 초기화 실패.');
      }
    }, 500); // 0.5초 후 재시도
  }
});