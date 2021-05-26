// 슬라이드들 선택자
const $slides = document.querySelectorAll(".swiper-slide");

// 공공데이터포털에서 발급받은 오픈 API의 일반 인증키
const SERVICE_KEY = "서비스 인증 키";

// XMLHttpRequest 객체 생성
const request = new XMLHttpRequest();

// HTTP 요청 초기화
request.open(
  "GET",
  `http://apis.data.go.kr/1262000/CountryCovid19SafetyServiceNew/getCountrySafetyNewsListNew?serviceKey=${SERVICE_KEY}&returnType=JSON&numOfRows=10&pageNo=1`
);

// HTTP 요청 전송
request.send();

// HTTP 요청이 성공적으로 완료된 경우 load 이벤트 발생
request.onload = () => {
  // status 프로퍼티 값이 200인 경우,
  // 즉 정상적으로 응답된 상태라면,
  if (request.status === 200) {
    // response 프로퍼티에 서버의 응답 결과가 담겨 있다
    let response = JSON.parse(request.response);
    let covidNews = response.data;

    covidNews.map((el, newsIdx) => {
      // 대륙명
      let continentName = el.continent_nm;
      // 뉴스 제목
      let newsTitle = el.title;

      // 뉴스 제목을 담을 p 요소 생성
      let newsTitleNode = document.createElement("p");
      // class 이름을 newsTitle로 설정
      newsTitleNode.setAttribute("class", "newsTitle");
      newsTitleNode.innerHTML = newsTitle;

      // 대륙명을 담을 p 요소 생성
      let continentNameNode = document.createElement("p");
      // class 이름을 continentName로 설정
      continentNameNode.setAttribute("class", "continentName");
      continentNameNode.innerHTML = continentName;

      // 슬라이드 번호별로 뉴스 하나씩 담기도록 한다
      $slides.forEach((slide, slideIdx) => {
        if (newsIdx === slideIdx) {
          // slide에 newsTitle과 continentName 요소 추가
          slide.appendChild(continentNameNode);
          slide.appendChild(newsTitleNode);
        }
      });
    });
  } else {
    console.error("Error", request.status, request.statusText);
  }
};

// new Swiper("선택자", 옵션)
let swiper = new Swiper(".mySwiper", {
  direction: "vertical", // 슬라이드 방향은 수직
  autoplay: {
    delay: 3000, // 자동 슬라이드 시간차
    pauseOnMouseEnter: true, // 마우스를 얹으면 일시정지
  },
});
