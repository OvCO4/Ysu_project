// ───── 페이지별 로딩 플래그 변수 선언 ─────
let settingsLoaded = false;
let communityLoaded = false;
let lectureLoaded = false;
let noticesLoaded = false;
let buildingsLoaded = false;
let academicCalendarLoaded = false;

// ─────────── showContent: SPA 전환 ───────────
function showContent(type) {
  const panes = [
    'homeContent',
    'buildingsContent',
    'communityContent',
    'lecture-reviewContent',
    'noticesContent',
    'timetableContentPane',
    'shuttleContentPane',
    'calendarContentPane',
    'academic-calendarContentPane',
    'profileContentPane',
    'settingsContent'
  ];

  panes.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  if (type === 'settings' && !settingsLoaded) {
    const container = document.getElementById('settingsContent');
    fetch('settings.html')
      .then(res => {
        if (!res.ok) throw new Error('settings.html 을 불러오는 중 오류 발생');
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        settingsLoaded = true;
        if (window.initSettingsPage) window.initSettingsPage();
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = `<div class="error-fallback">
          <h3>⚠️ 오류 발생</h3>
          <p>설정 화면을 불러올 수 없습니다</p>
        </div>`;
      });
  }

  if (type === 'community' && !communityLoaded) {
    const container = document.getElementById('communityContent');
    fetch('../community.html')
      .then(res => {
        if (!res.ok) throw new Error('community.html 을 불러오는 중 오류 발생');
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        communityLoaded = true;
        if (window.initCommunityPage) window.initCommunityPage();
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = `<div class="error-fallback">
          <h3>⚠️ 오류 발생</h3>
          <p>커뮤니티 화면을 불러올 수 없습니다</p>
        </div>`;
      });
  }

  if (type === 'lecture-review' && !lectureLoaded) {
    const container = document.getElementById('lecture-reviewContent');
    fetch('pages/list/lecture-review.html')
      .then(res => {
        if (!res.ok) throw new Error('lecture-review.html 을 불러오는 중 오류 발생');
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        lectureLoaded = true;
        if (window.initLectureReviewPage) window.initLectureReviewPage();
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = `<div class="error-fallback">
          <h3>⚠️ 오류 발생</h3>
          <p>강의평가 화면을 불러올 수 없습니다</p>
        </div>`;
      });
  }

  if (type === 'notices' && !noticesLoaded) {
    const container = document.getElementById('noticesContent');
    fetch('notices.html')
      .then(res => {
        if (!res.ok) throw new Error('notices.html 을 불러오는 중 오류 발생');
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        noticesLoaded = true;
        if (window.initNoticesPage) window.initNoticesPage();
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = `<div class="error-fallback">
          <h3>⚠️ 오류 발생</h3>
          <p>공지사항 화면을 불러올 수 없습니다</p>
        </div>`;
      });
  }

  if (type === 'buildings' && !buildingsLoaded) {
    const container = document.getElementById('buildingsContent');
    fetch('../buildings.html')
      .then(res => {
        if (!res.ok) throw new Error('buildings.html 을 불러오는 중 오류 발생');
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        buildingsLoaded = true;
        if (window.initBuildingsPage) window.initBuildingsPage();
      })
      .catch(err => {
        console.error(err);
        container.innerHTML = `<div class="error-fallback">
          <h3>⚠️ 오류 발생</h3>
          <p>건물 페이지를 불러올 수 없습니다</p>
        </div>`;
      });
  }

  // academic-calendar 페이지 처리 (내부용 - 사용하지 않음)
  if (type === 'academic-calendar' && !academicCalendarLoaded) {
    const container = document.getElementById('academic-calendarContentPane');
    if (container) {
      fetch('academic-calendar.html')
        .then(res => {
          if (!res.ok) throw new Error('academic-calendar.html 을 불러오는 중 오류 발생');
          return res.text();
        })
        .then(html => {
          container.innerHTML = html;
          academicCalendarLoaded = true;
          if (window.initAcademicCalendarPage) window.initAcademicCalendarPage();
        })
        .catch(err => {
          console.error(err);
          container.innerHTML = `<div class="error-fallback">
            <h3>⚠️ 오류 발생</h3>
            <p>학사일정 화면을 불러올 수 없습니다</p>
          </div>`;
        });
    }
  }

  const targetMap = {
    home: 'homeContent',
    buildings: 'buildingsContent',
    community: 'communityContent',
    'lecture-review': 'lecture-reviewContent',
    notices: 'noticesContent',
    timetable: 'timetableContentPane',
    shuttle: 'shuttleContentPane',
    'academic-calendar': 'academic-calendarContentPane',
    calendar: 'calendarContentPane',
    profile: 'profileContentPane',
    settings: 'settingsContent'
  };

  const targetId = targetMap[type] || 'homeContent';
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.style.display = 'block';
    targetEl.classList.add('fade-in');
  }

  document.querySelectorAll('#main-menu .nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const navItem = document.getElementById('nav-' + type);
  if (navItem) navItem.classList.add('active');

  currentContent = type;
  window.location.hash = type;

  if ((type === 'buildings' || type === 'academic-calendar') && naverMap) {
    setTimeout(() => {
      if (naverMap.refresh) naverMap.refresh();
    }, 100);
  }
}
