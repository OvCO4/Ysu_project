function setupDepartmentSearch() {
    const departmentInput = document.getElementById('departmentInput');
    const dropdown = document.getElementById('departmentDropdown');
    const options = dropdown.querySelectorAll('.department-option');
    const selectedDepartment = document.getElementById('selectedDepartment');

    // 🔍 검색어 입력 시
    departmentInput.addEventListener('input', () => {
        const term = departmentInput.value.toLowerCase();
        if (term) {
            dropdown.style.display = 'block';
            dropdown.querySelectorAll('.department-category').forEach(cat => cat.style.display = 'none');

            options.forEach(opt => {
                const match = opt.textContent.toLowerCase().includes(term);
                opt.style.display = match ? 'block' : 'none';

                // 카테고리 보이기
                if (match) {
                    let prev = opt.previousElementSibling;
                    while (prev) {
                        if (prev.classList.contains('department-category')) {
                            prev.style.display = 'block';
                            break;
                        }
                        prev = prev.previousElementSibling;
                    }
                }
            });
        } else {
            dropdown.style.display = 'none';
        }
    });

    // 🔍 클릭 시 드롭다운 열기
    departmentInput.addEventListener('focus', () => {
        if (!departmentInput.value) dropdown.style.display = 'block';
    });

    // 🔽 옵션 클릭 시 선택
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            departmentInput.value = opt.textContent;
            selectedDepartment.value = opt.dataset.id;
            dropdown.style.display = 'none';
            if (typeof clearError === 'function') clearError('department');
        });
    });

    // 🔒 외부 클릭 시 닫기
    document.addEventListener('click', e => {
        if (!e.target.closest('.department-container')) dropdown.style.display = 'none';
    });
}

// ✅ DOM 준비 후 실행
document.addEventListener('DOMContentLoaded', () => {
    setupDepartmentSearch();
});

opt.addEventListener('click', () => {
  departmentInput.value = opt.textContent;              // 사용자 눈에 보이는 이름
  selectedDepartment.value = opt.dataset.id;            // 숨겨진 필드에는 숫자 ID
});
