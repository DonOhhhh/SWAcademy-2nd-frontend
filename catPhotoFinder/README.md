# 고양이 사진 검색기 만들기

## 요구사항

---
- 검색 키워드를 입력하면 추천 검색어 API를 이용해 추천 검색어를 보여준다. 검색어 입력 후엔 엔터키 등 별도의 추가 액션이 없어도 검색어 목록을 보여주어야 한다.
- 키보드 혹은 마우스로 추천 검색어를 선택할 수 있게 한다.
  - esc를 누르면 검색창이 닫힌다.
  - 키보드의 위, 아래를 누르면 추천 검색어 하이라이트가 옮겨지고 엔터를 누르면 하이라이트 처리된 검색어가 반영된다.
  - 마우스로 클릭한 검색어가 반영된다.
- 검색된 결과에 따라 고양이 사진이 화면에 렌더링 된다.

```
사용 API
https://mwu.roto-cat-search-api.programmers.co.kr

/api/cats/keywords?q={keyword} : : keyword에 해당하는 검색어를 조회한다.

/api/cats/search?q={keyword} : keyword에 해당하는 고양이 사진을 검색합니다.

https://cdn.roto.codes/css/cat-search.css : 기본 마크업 구조

```
