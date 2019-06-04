const $todos = document.querySelector('.todos');
const $btn = document.querySelector('.btn');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('#ck-complete-all');
const $clearLength = document.querySelector('.completed-todos');
const $activeTodo = document.querySelector('.active-todos');
const $nav = document.querySelector('.nav');

// todos 배열
let todos = [];

// todos 복사
// let _todos = [...todos];
// li의 id 값
let navState = 'all';

// html 렌더링
function render(todosFromServer) {
  todos = todosFromServer;
  // console.log('todosFromServer', todosFromServer);
  // console.log('todos', todos);
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
    // response 객체 내에서 todos 배열만 가져와서 렌더하기
    .then(res => res.json())
    .then(render)
    .catch(console.error);
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
function changeCheck(targetID) {
  todos.forEach((todo) => {
    if (todo.id === +targetID) {
      fetch(`/todos/${targetID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      }).then(res => res.json())
        .then(render)
        .catch(console.error);
    }
  });
}

// 체크박스 전체 선택
function changeAll(complete) {
  fetch('/todos', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: complete.checked })
  }).then(res => res.json())
    .then(render)
    .catch(console.error);
}

// x 클릭시 삭제
function removeTodo(targetID) {
  fetch(`/todos/${targetID}`, {
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


// 새로운 배열 추가
function generateId() {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

// 로딩
window.onload = () => { getTodos(); };

// 엔터키 눌렀을 때 todo 추가
$inputTodo.onkeyup = function (e) {
  const content = $inputTodo.value.trim();
  if (!content || e.keyCode !== 13) return;
  addTodo(content);
  // 나중에 추가한 todo가 가장 위에 오도록
  $inputTodo.value = '';
  // todos = [{ id: generateId(), content, completed: false }, ...todos];
  // render();
};

// $inputTodo.addEventListener('keyup', (e) => {
//   const content = $inputTodo.value.trim();
//   if (!content || e.keyCode !== 13) return;
//   addTodo(content);
//   $inputTodo.value = '';
// });

// 상태 변경
$todos.onchange = function (e) {
  // const id = +e.target.parentNode.id;
  changeCheck(e.target.parentNode.id);
  // todos = todos.map(todo => (todo.id === id ? Object.assign({}, todo, { completed: !todo.completed }) : todo));
  // render();
};

// $todos.addEventListener('change', (e) => {
//   changeCheck(e.target.parentNode.id);
// });

// 카테고리 액티브 클래스
$nav.onclick = function (e) {
  [...$nav.children].forEach((navItem) => {
    if (navItem.id === e.target) navItem.classList.add('active');
    navItem.classList.remove('active');
  });
  e.target.classList.add('active');
  // 각 카테고리 id 값 할당
  navState = e.target.id;
  render(todos);
};

// 클릭시 remove
$todos.onclick = function (e) {
  if (!e.target.classList.contains('remove-todo')) return;
  // todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);
  removeTodo(e.target.parentNode.id);
};

// $todos.addEventListener('click', (e) => {
//   if (!e.target.classList.contains('remove-todo')) return;
//   removeTodo(e.target.parentNode.id);
// });

// 클릭시 전체 선택&해제
$completeAll.onchange = function (e) {
  // if (e.target.checked) todos = todos.map(todo => Object.assign({}, todo, { completed: true }));
  // else todos = todos.map(todo => Object.assign({}, todo, { completed: false }));
  changeAll(e.target);
};

// $completeAll.addEventListener('change', (e) => {
//   changeAll(e.target);
// });

// 클릭시 체크된 todo 삭제
$btn.onclick = function () {
  // todos = todos.filter(todo => todo.completed !== true);
  clearAll();
};

// $btn.addEventListener('click', (e) => {
//   clearAll(e.target);
// });

// render(todos);