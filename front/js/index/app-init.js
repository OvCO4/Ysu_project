// app-init.js - 앱 초기화 및 이벤트 바인딩

import { showContent } from './menu.js';
import { setupAutoLogout } from './ui.js';
import { applyKeyboardShortcuts, applyUserShortcuts } from './shortcuts.js';
import { openTimetablePage, openCalendarPage, openShuttlePage } from './student-services.js';
import { checkUserStatus } from './profile.js';
import { updateTimetable } from './timetable.js';

export function initializeApp() {
  try {
    initNaverMap();
    checkUserStatus();
    updateTimetable();

    setInterval(() => {
      updateTimetable();
    }, 60000);
  } catch (error) {
    console.error('앱 초기화 오류:', error);
    showMessage('일부 기능을 불러오는 중 오류가 발생했습니다', 'error');
  }
}

export function setupNetworkListeners() {
  window.addEventListener('online', () => {
    showMessage('인터넷 연결이 복구되었습니다', 'success');
    initializeApp();
  });

  window.addEventListener('offline', () => {
    showMessage('인터넷 연결이 끊어졌습니다. 일부 기능이 제한될 수 있습니다', 'error');
  });
}

export function setupAppEventHandlers() {
  document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1);
    showContent(hash || 'home');
    initializeApp();
    setupNetworkListeners();
    setupAutoLogout();
    applyKeyboardShortcuts();
    applyUserShortcuts();

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeAllDropdowns();
      resetAutoLogoutTimer();
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleGlobalSearch();
      });
      searchInput.addEventListener('keydown', resetAutoLogoutTimer);
    }

    // 학생서비스 드롭다운 관련
    setupStudentServiceDropdown();

    // 전역 클릭 시 드롭다운 닫기 처리
    document.addEventListener('click', event => {
      const ntBtn = event.target.closest('#notification-btn');
      const upBtn = event.target.closest('#user-profile');
      const ssBtn = event.target.closest('#nav-student-services');

      if (!ntBtn) closeNotificationDropdown();
      if (!upBtn) closeUserDropdown();
      if (!ssBtn) closeStudentServiceDropdown();

      resetAutoLogoutTimer();
    });
  });
}

function setupStudentServiceDropdown() {
  const studentServices = document.getElementById('nav-student-services');
  if (!studentServices) return;

  let hoverTimeout;

  studentServices.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    showStudentServiceDropdown();
  });

  studentServices.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => closeStudentServiceDropdown(), 150);
  });

  const dropdown = studentServices.querySelector('.dropdown-menu');
  if (dropdown) {
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimeout);
      showStudentServiceDropdown();
    });

    dropdown.addEventListener('mouseleave', () => {
      hoverTimeout = setTimeout(() => closeStudentServiceDropdown(), 150);
    });
  }

  setTimeout(() => {
    const dropdownItems = document.querySelectorAll('#nav-student-services .dropdown-item');
    dropdownItems.forEach((item, index) => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        switch (index) {
          case 0: openTimetablePage(); break;
          case 1: openCalendarPage(); break;
          case 2: openShuttlePage(); break;
        }
      });
    });
  }, 100);
}

// 이 파일은 index.js의 대체로 사용되며, 핵심 초기화/이벤트 바인딩만 포함합니다.
