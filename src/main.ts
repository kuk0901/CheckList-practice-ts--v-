const rootEl: HTMLElement | null = document.getElementById("root");
const container = document.createElement("div");
const date: Date = new Date();
const month: number = date.getMonth();
const day: number = date.getDay();

// 월 반환 함수
function getMonthKo(month: number) {
  switch (month) {
    case 0:
      return "1";
    case 1:
      return "2";
    case 2:
      return "3";
    case 3:
      return "4";
    case 4:
      return "5";
    case 5:
      return "6";
    case 6:
      return "7";
    case 7:
      return "8";
    case 8:
      return "9";
    case 9:
      return "10";
    case 10:
      return "11";
    case 11:
      return "12";
  }
}
// 요일 반환 함수
function getDayKo(day: number) {
  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
  }
}

// header 구조
if (rootEl) {
  rootEl.innerHTML = /* html */ `
  <header>
    <div class="date">
    ${date.getFullYear()}년 ${getMonthKo(
    month
  )}월 ${date.getDate()}일 ${getDayKo(day)}요일
    </div>
    <div class="total-title"><span>하루의 일정</span>을 정리해보세요!</div>
    <button class="btn-reset">RESET</button>
  </header>
`;

  const btnEl: HTMLElement | null = rootEl!.querySelector(".btn-reset");

  if (btnEl) {
    btnEl.addEventListener("click", () => {
      location.reload();
    });
  }
}

// Check List 기본 구조
const template = /* html */ `
  <div class="head">
    <div class="number"></div>
    <div class="title">Check List</div>
    <div class="check check-yes">O</div>
    <div class="check check-no">X</div>
  </div>
  {{__Check_List__}}
`;

const contentList: string[] = [];

// 반복문으로 Check List 상세 구조 create
for (let i = 1; i <= 10; i++) {
  contentList.push(/* html */ `
    <div class="content">
      <div class="number-text">${i}</div>
      <input type="text" placeholder="내용을 작성하세요." class="text-content"/>
      <label class="checkbox">
        <input type="radio" name="ox ox${i}" class="yes"/>
        <input type="radio" name="ox ox${i}" class="no" checked/>
      </label>
    </div>
  `);
}

const content: string = contentList.join("");
const totalTemplate: string = template.replace(`{{__Check_List__}}`, content);
container.innerHTML = totalTemplate;

rootEl!.append(container);

// O/X button click시 text-content(작성한 일정) css 변화
const yesBtnEls: NodeListOf<Element> = document.querySelectorAll(".yes");
const noBtnEls: NodeListOf<Element> = document.querySelectorAll(".no");

yesBtnEls.forEach((yesBtnEl: Element) => {
  yesBtnEl.addEventListener("click", () => {
    const checkboxEl: HTMLElement | null = yesBtnEl.parentElement;
    if (checkboxEl) {
      const contentEl = checkboxEl.previousElementSibling;
      contentEl!.classList.add("remove");
    }
  });
});

noBtnEls.forEach((noBtnEl: Element) => {
  noBtnEl.addEventListener("click", () => {
    yesBtnEls.forEach((yesBtnEl) => {
      const checkboxEl: HTMLElement | null = yesBtnEl.parentElement;
      if (checkboxEl) {
        const contentEl = checkboxEl.previousElementSibling;
        contentEl!.classList.remove("remove");
      }
    });
  });
});
