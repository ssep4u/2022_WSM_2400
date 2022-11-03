let dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
let gridItems = dateGridContainerDiv.getElementsByClassName("grid-item");

const handler = (event) => {
    // console.log(year);
    // console.log(month);
    let date = event.target.innerHTML;
    // console.log(date);
    //handler에서 year, month, date, 식사 로 url 만들어서 AJAX로 급식 정보 가져오자
    const KEY = "d1dc39d63a314f2387d2dbd1c732b392";
    const ATPT_OFCDC_SC_CODE = "B10";   //서울특별시교육청
    const SD_SCHUL_CODE = "7010569";    //미림여자정보과학고등학교
    let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date.padStart(2, "0")}`;  //YYYYMMDD
    // console.log(MLSV_YMD);
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`
        + `?KEY=${KEY}`
        + `&Type=json`
        + `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`
        + `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`
        + `&MLSV_YMD=${MLSV_YMD}`;
    // + `&MMEAL_SC_CODE=${MMEAL_SC_CODE}`;
    // console.log(url);
    urlToJSON(url);
}

const setCalendar = (year, month) => {
    // 오늘 년, 오늘 월, 1 날짜 객체 구하자
    let firstDate = new Date(year, month - 1, 1);
    // 그 객체 요일 구하자
    let firstDay = firstDate.getDay();
    console.log(`${year}-${month} ${firstDay}요일`) //2022-9 4요일
    // html 제어하자

    // 오늘 년, 오늘 월+1, 0 날짜 객체 구하자
    let lastDate = new Date(year, month, 0).getDate();
    console.log(`${lastDate}일`)    //30일

    //제목 표시하자
    //HTML id -> js 변수
    const yearSpan = document.getElementById("year");
    const monthSpan = document.getElementById("month");
    //js.innerHTML 설정하자
    yearSpan.innerHTML = year;
    monthSpan.innerHTML = month;

    //1~lastDate까지 반복하자
    const dateGridContainerDiv = document.getElementsByClassName("date-grid-container")[0];
    dateGridContainerDiv.innerHTML = '';    //초기화
    for (let i = 1; i <= lastDate; i++) {
        //<div class="grid-item">$</div> -> <div class="date-grid-container"> 하위
        //새로운 element 만들자
        let newElem = document.createElement("div");
        //그 element class="grid-item"
        newElem.classList.add("grid-item");
        //그 element 텍스트 = i
        newElem.innerHTML = i
        //.date-grid-container에 자식으로 붙이자
        dateGridContainerDiv.appendChild(newElem);
    }

    //1일: grid-column-start: 요일 + 1;
    let firstDateDiv = dateGridContainerDiv.getElementsByClassName("grid-item")[0];
    firstDateDiv.style.gridColumnStart = firstDay + 1;

    //event
    for (let gridItem of gridItems) {
        gridItem.onmouseover = handler;
        // gridItem.addEventListener("mouseover", handler);
    }
}
//prevMonth 함수
const prevMonth = () => {
    //이전 월 구하자
    month--;
    if (month == 0) {
        month = 12;
        year--;
    }
    //setCalendar(년, 구한 월);
    setCalendar(year, month);
}

//nextMonth 함수
const nextMonth = () => {
    //다음 월 구하자
    month++;
    if (month == 13) {
        month = 1;
        year++;
    }
    //setCalendar(년, 구한 월);
    setCalendar(year, month);
}

//prev버튼 누르면 prevMonth 함수 실행하자
prev_btn.onclick = prevMonth;   //() 쓰지마 승빈아. ()쓰면 함수 실행한 결과를 넣는거야. 근데 리턴값없으니 undefined야
//next버튼 누르면 nextMonth 함수 실행하자
next_btn.onclick = nextMonth;



// 오늘 구하자
let today = new Date();
// 오늘 년 구하자
let year = today.getFullYear();
// 오늘 월 구하자
let month = today.getMonth();   //0~11
month++;

setCalendar(year, month);


//https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17320190722180924242823&infSeq=2
//시도교육청코드: B10: 서울특별시교육청
//표준학교코드: 7010569: 미림여자정보과학고등학교
//식사코드: 2: 중식

//신청주소: https://open.neis.go.kr/hub/mealServiceDietInfo
//KEY: 
//ATPT_OFCDC_SC_CODE: 시도교육청코드
//SD_SCHUL_CODE: 표준학교코드
//MMEAL_SC_CODE: 식사코드
//MLSV_YMD: 급식일자
//MLSV_FROM_YMD: 급식시작일자
//MLSV_TO_YMD: 급식종료일자
//https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010569&MMEAL_SC_CODE=2&MLSV_YMD=20220927&Type=json
// const KEY = "d1dc39d63a314f2387d2dbd1c732b392";
// const ATPT_OFCDC_SC_CODE = "B10";   //서울특별시교육청
// const SD_SCHUL_CODE = "7010569";    //미림여자정보과학고등학교
// let MMEAL_SC_CODE = 2;  //중식
// let MLSV_YMD = "20220927";  //YYYYMMDD
// let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?`
//         + `KEY=${KEY}`
//         + `ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`
//         + `SD_SCHUL_CODE=${SD_SCHUL_CODE}`
//         + `MLSV_YMD=${MLSV_YMD}`
//         + `MMEAL_SC_CODE=${MMEAL_SC_CODE}`;
// // console.log(url);
// 실시간으로 급식메뉴 가져오자
//.date-grid-container>.grid-item에 마우스 올려놓으면(mouseover), handler 함수 호출하자

const urlToJSON = (url) => {
    //XMLHttpRequest 객체 만들자
    let xhr = new XMLHttpRequest();

    //callback
    xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //success
            // console.log("성공" + xhr.response);
            showMenu(xhr.response);
        } else {
            //fail
            // console.log(xhr.status);
        }
    }

    //요청을 보낼 방식 정하자. true: 비동기
    xhr.open("GET", url, true);

    //요청하자
    xhr.send();

    //json 받아서 HTML 조식, 중식, 석식에 보여주자
    const showMenu = (jsonString) => {
        console.log(jsonString);
        //jsonString -> json
        let json = JSON.parse(jsonString);     //"{'key': 'value'}" -> {'key': 'value'}
        console.log(json);
        // console.log(json['mealServiceDietInfo'][1]['row'][0]['DDISH_NM']);  //조식 정보

        try {
            if (json['mealServiceDietInfo'][0]['head'][1]['RESULT']['CODE'] == 'INFO-000') {
                //응답이 제대로 왔으면
                //json -> HTML
                try {
                    let breakfastData = json['mealServiceDietInfo'][1]['row'][0]['DDISH_NM'];
                    //(5.13.) 삭제하자
                    breakfastData = breakfastData.replace(/\([0-9\.]*\)/g, "");  //정규표현식: (문자 숫자나 .문자 )문자
                    breakfastData = breakfastData.replace(/[0-9\.]*<br\/>/g, "<br/>");  //2022년 4월 이하는 괄호가 없음
                    breakfastData = breakfastData.replace(/[0-9\.]*$/g, "");
                    // (             \(
                    // 숫자 한글자    [0123456789]
                    // .             \.
                    // 0~n개         *
                    // )             \)
                    // 글로벌         g
                    breakfast.innerHTML = breakfastData;
                } catch {
                    breakfast.innerHTML = "없음";
                }
                try {
                    let lunchData = json['mealServiceDietInfo'][1]['row'][1]['DDISH_NM']
                    lunchData = lunchData.replace(/\([0-9\.]*\)/g, "");
                    lunchData = lunchData.replace(/[0-9\.]*<br\/>/g, "<br/>");  //2022년 4월 이하는 괄호가 없음
                    lunchData = lunchData.replace(/[0-9\.]*$/g, "");
                    lunch.innerHTML = lunchData;
                } catch {
                    lunch.innerHTML = "없음";
                }
                try {
                    let dinnerData = json['mealServiceDietInfo'][1]['row'][2]['DDISH_NM'];
                    dinnerData = dinnerData.replace(/\([0-9\.]*\)/g, "");
                    dinnerData = dinnerData.replace(/[0-9\.]*<br\/>/g, "<br/>");  //2022년 4월 이하는 괄호가 없음
                    dinnerData = dinnerData.replace(/[0-9\.]*$/g, "");
                    dinner.innerHTML = dinnerData;
                } catch {
                    dinner.innerHTML = "없음";
                }
            } else {
                //응답이 이상하면
                //없음 표시하자
                breakfast.innerHTML = "없음";
                lunch.innerHTML = "없음";
                dinner.innerHTML = "없음";
            }
        } catch {   //문제가 생기면 {'RESULT':}
            breakfast.innerHTML = "없음";
            lunch.innerHTML = "없음";
            dinner.innerHTML = "없음";
        }
    }

}

for (let gridItem of gridItems) {
    gridItem.onmouseover = handler;
    // gridItem.addEventListener("mouseover", handler);
}
//다 가져왔으면, 조식, 중식, 석식 표시하자
