// TODO오늘 할 일 JS
const TDL = 'tdlist';
let todolistArr = [];

const $inputTodo = document.querySelector('.input_todo');
const $add = document.querySelector('.add_todo');
const $todos = document.querySelector('.todos');
export const saveTodo = content => {
  const obj = { text: content, id: todolistArr.length + 1 };
  todolistArr.push(obj);
  localStorage.setItem(TDL, JSON.stringify(todolistArr));
};
// TODOList생성
export function $addTodo(content) {
  const $li = document.createElement('li');
  const $WrapLabel = document.createElement('label');
  const $TeLabel = document.createElement('label');
  const $CkInput = document.createElement('input');
  const $TeInput = document.createElement('input');
  const $div = document.createElement('div');
  const $MoButton = document.createElement('button');
  const $DeButton = document.createElement('button');

  $CkInput.setAttribute('type', 'checkbox');

  $TeInput.setAttribute('type', 'text');
  $TeInput.classList.add('text_input');

  $WrapLabel.classList.add('wrap_label');
  $TeLabel.classList.add('text_label');

  $DeButton.classList.add('remove');
  $TeLabel.textContent = content;
  $DeButton.textContent = '삭제';

  $MoButton.classList.add('modify');
  $MoButton.textContent = '수정';
  $WrapLabel.appendChild($CkInput);
  $WrapLabel.appendChild($TeLabel);
  $WrapLabel.appendChild($TeInput);

  $div.appendChild($MoButton);
  $div.appendChild($DeButton);

  $li.appendChild($WrapLabel);
  $li.appendChild($div);
  $li.id = todolistArr.length + 1;

  $todos.appendChild($li, $todos.firstElementChild);
}
// todo목록 추가
$add.onclick = () => {
  $addTodo($inputTodo.value);
  $inputTodo.value = '';
  $inputTodo.focus();
};

// 수정, 삭제 버튼
$todos.onclick = e => {
  if (!e.target.matches('.todos>li>div>button')) return;
  const arr = e.target.parentNode.parentNode.id;
  console.log(arr, 'remove의 arr'); // 숫자임.

  const eItem = e.target.parentNode.parentNode;
  const editInput = eItem.querySelector('input[type=text]'); // input[type=text]
  const editLabel = eItem.querySelector('.text_label');

  const isContainsClass = eItem.classList.contains('edit_mode');
  const loadedList = localStorage.getItem(TDL);
  const parseList = JSON.parse(loadedList);
  const filtering = parseList.filter(t => t.id === Number(arr));
  const filterId = Number(filtering[0].id) - 1;
  // 수정
  if (editInput) {
    if (isContainsClass) {
      editLabel.textContent = editInput.value;
      parseList.splice(Number(filterId), 1, {
        text: editLabel.innerText,
        id: filterId + 1,
      });
      localStorage.setItem(TDL, JSON.stringify(parseList));
    } else {
      editInput.value = editLabel.textContent;
    }
    eItem.classList.toggle('edit_mode');
  }

  // 삭제
  if (e.target.matches('.remove')) {
    $todos.removeChild(e.target.parentNode.parentNode);
    todolistArr = todolistArr.filter(t => t.id !== Number(arr));
    localStorage.setItem(TDL, JSON.stringify(todolistArr));
  }
};
