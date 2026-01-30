/** @type {import('prettier').Config} */
module.exports = {
  // 화살표 함수 매개변수에 항상 괄호 사용 (x) => x
  arrowParens: 'always',

  // JSX 닫는 태그의 '>'를 다음 줄에 배치
  bracketSameLine: false,

  // 객체 리터럴 중괄호 내부에 공백 추가 { a: 1 }
  bracketSpacing: true,

  // JSX 속성 값에 작은따옴표 사용 <div className='app' />
  jsxSingleQuote: true,

  // 한 줄 최대 길이 80자 (초과 시 자동 줄바꿈)
  printWidth: 80,

  // 모든 문장 끝에 세미콜론 사용
  semi: true,

  // 문자열에 작은따옴표 사용
  singleQuote: true,

  // 들여쓰기 공백 수 (2칸)
  tabWidth: 2,

  // 객체, 배열, 함수 인자 등 모든 곳에 후행 쉼표 허용
  trailingComma: 'all',

  // 탭 대신 스페이스 사용
  useTabs: false,

  // OS 환경에 맞게 줄바꿈 문자 자동 처리
  endOfLine: 'auto',
};
