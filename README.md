# 친구관리 CRUD Frontend Service

## Service Topic

지인·친구의 연락처와 기본 정보를 브라우저에서 관리하는 친구관리 프로그램입니다.  
별도 서버 없이 브라우저의 `localStorage`를 저장소로 사용하며,  
목록 조회 / 상세보기 / 추가 / 수정 / 삭제(CRUD) 기능을 제공합니다.

---

## Data Fields

| Field | 타입 | 필수 | 설명 |
|-------|------|------|------|
| `id` | Number | - | 각 친구를 구분하는 고유 식별자. 자동 생성 (최대 id + 1) |
| `name` | String | ✅ | 친구 이름. 2글자 이상 필수 입력 |
| `relation` | String | ✅ | 친구와의 관계 (친구 / 직장동료 / 선배 / 후배 / 가족 / 지인 / 기타) |
| `phone` | String | - | 전화번호. `010-1234-5678` 형식. 입력 시 형식 검사 적용 |
| `email` | String | - | 이메일 주소. `example@email.com` 형식. 입력 시 형식 검사 적용 |
| `address` | String | - | 거주 주소 |
| `birthday` | String | ✅ | 생년월일. `<input type="date">` 사용, `YYYY-MM-DD` 형식으로 저장 |

---

## List Page

`index.html` 목록 테이블에 표시되는 Field (총 5개):

| 열 | Field | 비고 |
|----|-------|------|
| 1 | 이름 (`name`) | - |
| 2 | 관계 (`relation`) | - |
| 3 | 전화번호 (`phone`) | 없으면 `-` 표시 |
| 4 | 이메일 (`email`) | 없으면 `-` 표시 |
| 5 | 생일 (`birthday`) | 없으면 `-` 표시 |
| 6 | 상세보기 | `view.html?id={id}` 링크 버튼 |

> `address`와 `id`는 목록에서 생략하고 상세보기(`view.html`)에서 확인할 수 있습니다.

---

## Validation

`add.html`과 `edit.html` 양쪽에 동일하게 적용한 Validation 조건 (총 6개):

| 번호 | 대상 Field | 조건 | 오류 메시지 |
|------|-----------|------|-------------|
| 1 | `name` | 빈 값 불가 (필수) | 이름은 필수 입력 항목입니다. |
| 2 | `name` | 2글자 이상 | 이름은 2글자 이상 입력해주세요. |
| 3 | `relation` | select에서 반드시 선택 | 관계를 선택해주세요. |
| 4 | `email` | 입력 시 `정규식` 형식 검사 (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) | 이메일 형식이 올바르지 않습니다. |
| 5 | `phone` | 입력 시 `정규식` 형식 검사 (`/^\d{2,3}-\d{3,4}-\d{4}$/`) | 전화번호 형식이 올바르지 않습니다. |
| 6 | `birthday` | 빈 값 불가 (필수) | 생일을 입력해주세요. |

> 모든 Validation은 폼 제출 전에 처리되며, 조건을 통과하지 못하면 오류 메시지를 표시합니다.

---

## RWD

Bootstrap 5의 Grid 시스템과 유틸리티 클래스를 주로 활용하고,  
`my.css`에서 Bootstrap이 처리하지 못하는 영역을 보완했습니다.

### Desktop (1025px 이상)
- `container`로 최대 너비를 제한해 콘텐츠가 너무 넓어지지 않도록 설정
- 폼 페이지(`add.html`, `edit.html`, `view.html`)는 `col-lg-6`으로 화면 중앙에 배치
- 목록 테이블은 전체 너비로 표시

### 태블릿 (769px ~ 1024px)
- `col-md-8`로 폼 너비 축소
- Bootstrap의 `navbar-expand-lg`로 메뉴는 가로 유지

### Mobile (768px 이하)
- `navbar-expand-lg` → 자동으로 햄버거 버튼(`navbar-toggler`) 전환
- `table-responsive`로 목록 테이블에 가로 스크롤 적용
- `col-12`로 폼이 전체 너비를 차지
- `d-flex gap-2`로 나란히 있던 버튼들이 좁은 화면에서도 자연스럽게 배치

### my.css 보완 사항
- `html, body { overflow-x: hidden }` — Bootstrap만으로는 완전히 차단되지 않는 가로 스크롤 방지
- `body { background-color: #f5f7fa }` — Bootstrap 기본 흰색 배경을 연한 회색으로 변경
- `@media (max-width: 400px)` — 초소형 화면(320px대)에서 카드 여백·버튼 폰트 크기 추가 조정

---

## Bootstrap

활용한 Bootstrap 5 Component 및 Class:

| 분류 | 사용한 Class / Component |
|------|--------------------------|
| Layout | `container`, `row`, `col-12`, `col-md-8`, `col-lg-6` |
| Navbar | `navbar`, `navbar-expand-lg`, `navbar-dark`, `bg-dark`, `navbar-brand`, `navbar-toggler`, `collapse navbar-collapse`, `nav-item`, `nav-link`, `active`, `ms-auto` |
| Card | `card`, `card-body`, `shadow-sm` |
| Table | `table`, `table-hover`, `table-striped`, `table-dark`, `table-bordered`, `table-light`, `table-responsive` |
| Form | `form-control`, `form-select`, `form-label`, `mb-3`, `fw-semibold` |
| Button | `btn`, `btn-primary`, `btn-success`, `btn-danger`, `btn-secondary`, `btn-sm`, `btn-close` |
| Alert | `alert`, `alert-danger`, `alert-success`, `alert-dismissible`, `fade show` |
| Utility | `d-flex`, `gap-2`, `justify-content-between`, `justify-content-center`, `align-items-center`, `mt-4`, `mt-5`, `mb-0`, `mb-4`, `pt-3`, `border-top`, `fw-bold`, `h3`, `text-danger`, `text-secondary`, `text-center`, `py-3` |

---

## Problem & Solution

### 문제 1. Bootstrap과 my.css 스타일 충돌
문제: Bootstrap CDN 로드 후 커스텀 CSS를 적용하면 일부 스타일(버튼 색상, 테이블 행 색상)이 덮어써지지 않았습니다.  
원인: Bootstrap의 specificity가 높거나, 로드 순서가 잘못되어 있었습니다.  
해결: `<head>` 안에서 Bootstrap CDN → `my.css` 순서로 로드하고, 충돌하는 스타일은 my.css에서 제거해 Bootstrap 기본 스타일을 그대로 활용했습니다.

---

## Reflection

### 새롭게 알게 된 점

- Bootstrap의 `navbar-expand-{breakpoint}` 하나만으로 직접 CSS로 구현하면 훨씬 복잡했던 것이 데스크톱/모바일 메뉴 전환이 자동으로 처리된다는 점을 새롭게 알게 되었습니다. 
- `table-responsive` 클래스 하나로 모바일 테이블 가로 스크롤 문제가 해결될 수 있다는 것을 새롭게 알게 되었습니다.

### 궁금한 점

- Bootstrap의 `col-md-8`처럼 Grid 시스템이 내부적으로 어떤 CSS(`flex`, `width` 계산 등)로 동작하는지 더 깊이 이해하고 싶습니다.
