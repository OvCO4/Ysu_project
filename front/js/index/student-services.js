// ─────────── 외부 페이지 이동 함수들 (현재 창에서 이동) ───────────
function openTimetablePage() {
  console.log('내 시간표 페이지로 이동');
  closeAllDropdowns();
  
  // 현재 창에서 이동
  window.location.href = EXTERNAL_PAGES.timetable;
}

function openCalendarPage() {
  console.log('학사일정 페이지로 이동');
  closeAllDropdowns();
  
  // 현재 창에서 이동
  window.location.href = EXTERNAL_PAGES.calendar;
}

function openShuttlePage() {
  console.log('셔틀버스 페이지로 이동');
  closeAllDropdowns();
  
  // 현재 창에서 이동
  window.location.href = EXTERNAL_PAGES.shuttle;
}

// ─────────── 기존 내부 네비게이션 함수들 (하위 호환성을 위해 유지) ───────────
function navigateToTimetable() { 
  console.log('내부 시간표 네비게이션 - 외부 페이지로 리디렉션');
  openTimetablePage();
}

function navigateToShuttle() { 
  console.log('내부 셔틀버스 네비게이션 - 외부 페이지로 리디렉션');
  openShuttlePage();
}

function navigateToCalendar() { 
  console.log('내부 학사일정 네비게이션 - 외부 페이지로 리디렉션');
  openCalendarPage();
}