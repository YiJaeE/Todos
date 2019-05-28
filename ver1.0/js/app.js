// todos 배열
let todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];


const $todos = document.querySelector('.todos');
const $btn = document.querySelector('.btn');
const $inputTodo = document.querySelector('.input-todo');
const $completeAll = document.querySelector('#ck-complete-all');
const $clearLength = document.querySelector('.completed-todos');
const $activeTodo = document.querySelector('.active-todos');


// Clear completed 갯수
function clearLength() {
  $clearLength.innerHTML = todos.filter(todo => todo.completed).length;
}

// 총 todo 갯수
function activeTodo() {
  $activeTodo.innerHTML = todos.filter(() => todos).length;
}

// html 렌더링
function render() {
  let html = '';
  todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item"><input class="custom-checkbox" type="checkbox"${completed ? 'checked' : ''} id="ck-${id}"><label for="ck-${id}"> ${content} </label><i class="remove-todo far fa-times-circle"></i></li>`;
  });
  clearLength();
  activeTodo();
  $todos.innerHTML = html;
}

// 함수로 만든 id값 => 새로운 배열 추가하기
function generateId() {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}


// 엔터키 눌렀을 때 todo 추가
$inputTodo.onkeyup = function (e) {
  const content = $inputTodo.value.trim();
  if (content === '' || e.keyCode !== 13) return;

  // 나중에 추가한 todo가 가장 위에 오도록
  $inputTodo.value = '';
  todos = [{ id: generateId(), content, completed: false }, ...todos];
  render();
};

// 체인지 이벤트
$todos.onchange = function (e) {
  const id = +e.target.parentNode.id;
  todos = todos.map(todo => (todo.id === id ? Object.assign({}, todo, { completed: !todo.completed }) : todo));
  render();
};

// 클릭시 remove
$todos.onclick = function (e) {
  if (!e.target.classList.contains('remove-todo')) return;
  todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);
  // console.log(todos);
  render();
};

// 클릭시 전체 선택&해제
$completeAll.onchange = function (e) {
  if (e.target.checked) todos = todos.map(todo => Object.assign({}, todo, { completed: true }));
  else todos = todos.map(todo => Object.assign({}, todo, { completed: false }));
  render();
};

// 클릭시 체크된 todo 삭제
$btn.onclick = function () {
  todos = todos.filter(todo => todo.completed !== true);
  render();
};

render()