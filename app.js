// 도움말 버튼과 모달 창 관련 요소 선택
const helpButton = document.getElementById('helpButton');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');

// 도움말 버튼을 눌렀을 때 모달 창 표시
helpButton.addEventListener('click', function() {
    console.log('1')
    modalOverlay.classList.add('active');
});

// 모달 창 닫기 버튼을 눌렀을 때 모달 창 숨기기
closeModal.addEventListener('click', function() {
    modalOverlay.classList.remove('active');
});
