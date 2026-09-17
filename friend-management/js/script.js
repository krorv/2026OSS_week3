// =======================================================
// script.js
// 역할: 모든 페이지에서 공통으로 사용하는 데이터와 함수를 모아둔 파일
//       localStorage에 친구 데이터를 저장하고 불러오는 기능을 담당한다.
// =======================================================


// -------------------------------------------------------
// [샘플 데이터]
// 처음 실행할 때 localStorage가 비어 있으면 이 데이터를 기본값으로 넣어준다.
// -------------------------------------------------------
var sampleFriends = [
  {
    id: 1,
    name: "김민준",
    relation: "친구",
    phone: "010-1234-5678",
    email: "minjun@example.com",
    address: "서울시 강남구 테헤란로 123",
    birthday: "1999-03-15"
  },
  {
    id: 2,
    name: "이서연",
    relation: "직장동료",
    phone: "010-2345-6789",
    email: "seoyeon@example.com",
    address: "경기도 수원시 팔달구 효원로 56",
    birthday: "1998-07-22"
  },
  {
    id: 3,
    name: "박지호",
    relation: "친구",
    phone: "010-3456-7890",
    email: "jiho@example.com",
    address: "부산시 해운대구 센텀중앙로 99",
    birthday: "2000-11-05"
  },
  {
    id: 4,
    name: "최예린",
    relation: "선배",
    phone: "010-4567-8901",
    email: "yerin@example.com",
    address: "서울시 마포구 홍익로 24",
    birthday: "1997-01-30"
  },
  {
    id: 5,
    name: "정다운",
    relation: "후배",
    phone: "010-5678-9012",
    email: "dawoon@example.com",
    address: "인천시 연수구 송도동 789",
    birthday: "2001-05-18"
  }
];


// -------------------------------------------------------
// [localStorage 관련 함수들]
//
// localStorage는 브라우저가 제공하는 저장 공간이다.
// 페이지를 닫아도 데이터가 사라지지 않는다.
// 단, 같은 브라우저, 같은 도메인(파일)에서만 접근 가능하다.
//
// localStorage는 문자열(string)만 저장할 수 있어서
// 배열/객체를 저장할 때는 JSON.stringify()로 문자열로 변환하고,
// 꺼낼 때는 JSON.parse()로 다시 배열/객체로 변환해야 한다.
// -------------------------------------------------------


// 친구 목록 전체를 localStorage에서 가져오는 함수
function getFriends() {
  // localStorage에 "friends" 키로 저장된 데이터를 가져온다.
  var stored = localStorage.getItem("friends");

  if (stored === null) {
    // 저장된 데이터가 없으면 (첫 실행) 샘플 데이터를 넣어준다.
    saveFriends(sampleFriends);
    return sampleFriends;
  }

  // JSON 문자열을 다시 배열로 변환해서 반환한다.
  return JSON.parse(stored);
}


// 친구 목록 전체를 localStorage에 저장하는 함수
function saveFriends(friendsList) {
  // 배열을 JSON 문자열로 변환해서 저장한다.
  localStorage.setItem("friends", JSON.stringify(friendsList));
}


// id로 특정 친구 한 명을 찾는 함수
// - id는 숫자이며, 각 친구를 구분하는 고유한 값이다.
function getFriendById(id) {
  var friends = getFriends();

  // 배열에서 id가 일치하는 친구를 찾아서 반환한다.
  // find()는 조건에 맞는 첫 번째 항목 하나를 반환한다.
  var found = friends.find(function(friend) {
    return friend.id === id;
  });

  return found; // 없으면 undefined 반환
}


// 새 친구를 추가하는 함수
// - newFriend: 추가할 친구 정보 객체 (id 없이 넘겨준다)
function addFriend(newFriend) {
  var friends = getFriends();

  // 새 id 생성: 현재 목록에서 가장 큰 id + 1
  // 목록이 비어있으면 id를 1로 시작한다.
  var maxId = 0;
  for (var i = 0; i < friends.length; i++) {
    if (friends[i].id > maxId) {
      maxId = friends[i].id;
    }
  }
  newFriend.id = maxId + 1;

  // 목록에 새 친구를 추가한다.
  friends.push(newFriend);

  // 변경된 목록을 다시 저장한다.
  saveFriends(friends);
}


// 특정 친구 정보를 수정하는 함수
// - updatedFriend: 수정된 친구 정보 객체 (id 포함)
function updateFriend(updatedFriend) {
  var friends = getFriends();

  // 배열에서 같은 id를 가진 항목의 위치(인덱스)를 찾는다.
  var index = -1;
  for (var i = 0; i < friends.length; i++) {
    if (friends[i].id === updatedFriend.id) {
      index = i;
      break;
    }
  }

  if (index !== -1) {
    // 해당 위치의 데이터를 새 데이터로 교체한다.
    friends[index] = updatedFriend;
    saveFriends(friends);
  }
}


// 특정 친구를 삭제하는 함수
// - id: 삭제할 친구의 id
function deleteFriend(id) {
  var friends = getFriends();

  // filter()는 조건이 true인 항목만 모아서 새 배열을 만든다.
  // 즉, 삭제할 id를 제외한 나머지만 남긴다.
  var newFriends = friends.filter(function(friend) {
    return friend.id !== id;
  });

  saveFriends(newFriends);
}


// -------------------------------------------------------
// [URL 파라미터 읽는 함수]
//
// 예: view.html?id=3 에서 "id"의 값 "3"을 가져올 때 사용한다.
// URL 파라미터는 페이지 간 데이터를 전달하는 간단한 방법이다.
// -------------------------------------------------------
function getParam(key) {
  // window.location.search는 URL에서 "?" 이후 부분을 가져온다.
  // 예: "?id=3" → URLSearchParams 객체로 파싱해서 key의 값을 반환한다.
  var params = new URLSearchParams(window.location.search);
  return params.get(key);
}
