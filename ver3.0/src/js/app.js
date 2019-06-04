const $todos = document.querySelector('.todos');
const $btn = document.querySelector('.btn');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('#ck-complete-all');
const $clearLength = document.querySelector('.completed-todos');
const $activeTodo = document.querySelector('.active-todos');
const $nav = document.querySelector('.nav');

let todos = [];
let navState = 'all';

// html 렌더링
function render(todosFromServer) {
  todos = todosFromServer;
  let html = '';

  function changeRender(changeTodos) {
    let _todos = '';
    changeTodos.forEach(({ id, content, completed }) => {
      _todos += `<li id="${id}" class="todo-item"><input class="custom-checkbox" type="checkbox"${completed ? 'checked' : ''} id="ck-${id}"><label for="ck-${id}"> ${content} </label><i class="remove-todo far fa-times-circle"></i></li>`;
    });
    return _todos;
  }

  if (navState === 'all') {
    html = changeRender(todos);
  } else if (navState === 'active') {
    html = changeRender(todos.filter(todo => !todo.completed));
  } else {
    html = changeRender(todos.filter(todo => todo.completed));
  }

  $todos.innerHTML = html;
  $clearLength.innerHTML = todos.filter(todo => todo.completed).length;
  $activeTodo.innerHTML = todos.filter(() => todos).length;
}

// Todo 가져오기
function getTodos() {
  fetch('/todos')
    .then(res => res.json())
    .then(render)
    .catch(console.error);
}

// 새로운 배열 추가
function generateId() {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

// Todo 추가하기
function addTodo(content) {
  fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: generateId(), content, completed: false })
  })
    .then(res => res.json())
    .then(render)
    .catch(console.error);
}

// 체크박스 상태 변경
function changeCheck(id, completed) {
  fetch(`/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  }).then(res => res.json())
    .then(render)
    .catch(console.error);
}

// 체크박스 전체 선택
function changeAll(completed) {
  fetch('/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: completed.checked })
  }).then(res => res.json())
    .then(render)
    .catch(console.error);
}

// x 클릭시 삭제
function removeTodo(id) {
  fetch(`/todos/${id}`, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(render)
    .catch(console.error);
}

// 전체 삭제
function clearAll() {
  fetch('/todos/completed', {
    method: 'DELETE'
  }).then(res => res.json())
    .then(render)
    .catch(console.error);
}

// 로딩
window.onload = () => { getTodos(); };

// 엔터키 눌렀을 때 todo 추가
$inputTodo.onkeyup = function (e) {
  const content = $inputTodo.value.trim();
  if (!content || e.keyCode !== 13) return;
  addTodo(content);
  $inputTodo.value = '';
};

// 상태 변경
$todos.onchange = function (e) {
  const id = +e.target.parentNode.id;
  changeCheck(id, e.target.checked);
};

// 카테고리 액티브 클래스
$nav.onclick = function (e) {
  [...$nav.children].forEach((navItem) => {
    if (navItem.id === e.target) navItem.classList.add('active');
    navItem.classList.remove('active');
  });
  e.target.classList.add('active');
  navState = e.target.id;
  render(todos);
};

// 클릭시 remove
$todos.onclick = function (e) {
  if (!e.target.classList.contains('remove-todo')) return;
  removeTodo(e.target.parentNode.id);
};

// 클릭시 전체 선택&해제
$completeAll.onchange = function (e) {
  changeAll(e.target);
};

// 클릭시 체크된 todo 삭제
$btn.onclick = function () {
  clearAll();
};