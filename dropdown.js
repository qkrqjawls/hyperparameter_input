const boxes = document.querySelectorAll('.box');
const infoBoxes = document.querySelectorAll('.info-box');
const choiceButtons = document.querySelectorAll('.choice');
const submitButtons = document.querySelectorAll('.submit');
let currentBox = null;
let params = [];
// 모든 infobox 숨기기
function hideAllInfoBoxes() {
    infoBoxes.forEach(box => box.style.display = 'none');
}
// 모든 박스에 클릭 이벤트 추가
boxes.forEach(box => {
    box.addEventListener('click', function() {
        currentBox = this
        const boxNumber = this.getAttribute('data-box'); // 박스에 지정된 data-box 값 가져오기
        hideAllInfoBoxes(); // 다른 infobox 숨기기
        document.getElementById(`infoBox${boxNumber}`).style.display = 'block'; // 해당하는 infobox만 표시
    });
});
// 선택지 버튼 클릭 시, 박스에 내용 입력 및 설명창 숨기기
choiceButtons.forEach(button => {
    button.addEventListener('click', function() {
        const selectedValue = this.getAttribute('data-value');
        if (currentBox && selectedValue!="quit") {
            currentBox.textContent = selectedValue; // 선택한 박스에 선택한 값 표시
            console.log(currentBox.classList);
            currentBox.classList.add("choice");
            params[parseInt(currentBox.getAttribute('data-box'),10)+2] = selectedValue;
        }
        hideAllInfoBoxes(); // 설명창 다시 숨기기
    });
});
submitButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 폼 제출 방지

        // 버튼의 부모 폼(.inputForm)을 찾고, 그 폼 내의 input 값을 가져옴
        const form = event.target.closest('.inputForm');
        const input = form.querySelector('input'); // 해당 폼 안의 input 찾기
        const min = parseInt(input.min, 10);
        const max = parseInt(input.max, 10);
        const inputValue = parseInt(input.value, 10);

        if(min <= inputValue && inputValue <= max && currentBox) {
            currentBox.textContent = inputValue
            currentBox.classList.add("choice");
            params[parseInt(currentBox.getAttribute('data-box'),10)+2] = inputValue;
            hideAllInfoBoxes();
        }
    });
});
enterbuttons = document.querySelectorAll('.enter');
enterbuttons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault(); // 기본 폼 제출 방지
        // 버튼의 부모 폼(.inputForm)을 찾고, 그 폼 내의 input 값을 가져옴
        const form = event.target.closest('.inputForm');
        const input = form.querySelector('input'); // 해당 폼 안의 input 찾기
        const inputValue = input.value;

        params[parseInt(event.target.getAttribute('data-box'),10)+2] = inputValue;
    })
});

// 도움말 버튼과 모달 창 관련 요소 선택
const helpButtons = document.querySelectorAll('.help-button');
const closeModals = document.querySelectorAll('.closeModal');

// 도움말 버튼을 눌렀을 때 모달 창 표시
helpButtons.forEach(button => {button.addEventListener('click', function() {
    const idx = this.getAttribute('data-box');
    const modalOverlay = document.getElementById(`modalOverlay${idx}`);
    modalOverlay.classList.add('active');
});})

paramAlert = document.getElementById('paramAlert');
// 모달 창 닫기 버튼을 눌렀을 때 모달 창 숨기기
closeModals.forEach(button => {button.addEventListener('click', function() {
    modalOverlay = this.closest('.modal-overlay');
    if(modalOverlay.id=='preSubmit'){
        paramAlert.style.color = '#202020';
    }
    modalOverlay.classList.remove('active');
});})

function contain_empty(arr){
    for(i=0; i<=16; i++) if(!arr[i]) return true;
    return false;
}

function submitData(arr) {
    var data = {
        arr: arr,
    };
    fetch('https://script.google.com/macros/s/AKfycby2N3hAUvWpRi1dnCf0h7Ev-vw6JNl5lQm3tUFbcqm9y24F_d8KbPxHXf5RMv6lhKhX/exec', {
        method: 'POST',
        mode: 'no-cors',  // CORS 문제 해결을 위한 설정
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        console.log('Request sent.');
        alert('응답이 성공적으로 제출되었습니다!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
const global_submit = document.getElementById('global_submit');
const final_submit = document.getElementById('final_submit');

global_submit.addEventListener('click', () => {
    document.getElementById('preSubmit').classList.add('active');
});
final_submit.addEventListener('click', event => {
    params[0] = Date(Date.now());
    if(contain_empty(params)){
        paramAlert.style.color = 'red';
    }
    else{
        submitData(params);
        paramAlert.style.color = '#202020';
        event.target.closest('.modal-overlay').remove('active');
    }
});