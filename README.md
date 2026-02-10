# netflix_clone

## 개요
React와 TypeScript를 활용하여 넷플릭스 서비스의 UI/UX 구조를 분석하고 클론 코딩하는 실습 프로젝트입니다. 실제 넷플릭스 화면을 참고하여 컴포넌트를 분석하고 재사용 가능한 UI 구조를 설계하여 구현했습니다.

## 프로젝트 목표

1. React 컴포넌트 기반 UI 설계 및 구현
2. TypeScript를 활용한 타입 안정성 확보
3. 재사용 가능한 컴포넌트 설계
4. Tailwind CSS를 통한 빠른 개발과 반응형 웹 구현
5. API 통신 로직 설계와 비동기 데이터 처리
6. ESLint, prettier를 활용한 코드 품질 관리

## 역할 분담

|담당 영역|세부작업|
|--|--|
|메인 페이지|헤더, 상단 영상, 랭킹리스트, 카테고리별 리스트, 호버 카드|
|검색 페이지|검색 결과, 추천 컨텐츠|
|상세 페이지|영화 상세 정보, 상세 페이지|
|영화 데이터 및 API|영화 데이터와 API, 타입 정의|

## 파일 구조
```
netflix_clone/
├── public/                       
├── src/                          
│   ├── api/                      
│   │   └── contentsApi.ts        # 콘텐츠 관련 API
│   │
│   ├── assets/                   
│   │
│   ├── components/               # 컴포넌트
│   │   ├── Header/               # 헤더 컴포넌트
│   │   ├── TopView/              # 메인 배너 영상 컴포넌트
│   │   ├── MovieList/            # 영화 리스트 관련 컴포넌트
│   │   ├── Search/               # 검색 결과 컴포넌트
│   │   └── ContentsDetail/       # 영화 상세 정보 컴포넌트
│   │
│   ├── data/                     # 데이터 파일
│   │   ├── dummy-data.json       # 영화 데이터
│   │   └── content.ts            # TypeScript 타입 정의
│   │
│   ├── hooks/                    # 커스텀 React Hooks
│   │
│   ├── pages/              
│   │   ├── MainPage.tsx          # 메인 페이지 
│   │   ├── SearchPage.tsx        # 검색 페이지 
│   │   └── DetailPage.tsx        # 상세 페이지 
│   │
│   ├── App.tsx                
│   ├── index.css              
│   └── main.tsx
```

## 사용 기술
- React: 19.2.0
- Vite: 7.2.4
- Tailwind CSS: 3.4.17
- TypeScript: 5.9.3
- ESLint: 9.39.1
- prettier: 3.8.1

## 결과물

<p align="center">
  <img width="687" height="791" alt="스크린샷 2026-02-10 오후 12 53 12" src="https://github.com/user-attachments/assets/09a7baee-76d8-4276-834a-349c7b37bab9" />  
</p>


<img width="1512" height="737" alt="contant-card" src="https://github.com/user-attachments/assets/8860ea55-4295-4813-86b4-f166b633634e" />

<img width="1512" height="844" alt="스크린샷 2026-02-09 오후 5 17 13" src="https://github.com/user-attachments/assets/c9dc20b3-3ca2-4693-9af1-bf53697acb77" />

<img width="1512" height="833" alt="스크린샷 2026-02-09 오후 5 17 32" src="https://github.com/user-attachments/assets/ea703d73-d768-450c-911a-cb5bcc88d47b" />

<img width="1512" height="842" alt="스크린샷 2026-02-09 오후 5 17 49" src="https://github.com/user-attachments/assets/2220c681-a01f-4482-98af-efaa030102e9" />

<img width="3024" height="1562" alt="localhost_5173_search_q=%EC%98%81%ED%99%94" src="https://github.com/user-attachments/assets/0de5e37e-28d4-41ce-ad82-38efc6f52605" />




