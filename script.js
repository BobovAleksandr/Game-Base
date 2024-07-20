let games = []

// Конструктор игр
class Game {
  constructor(id = 0, name = '', posterUrl = './images/posters/placeholder.png', isCompleted = false, isDlc = false, score = 0, releaseDate = '', series = '', isToPlay = false, isPlatinum = false) {
    this.id = id
    this.name = name
    this.posterUrl = posterUrl
    this.isCompleted = isCompleted
    this.isDLc = isDlc
    this.score = Number(score).toFixed(1)
    this.releaseDate = releaseDate
    this.series = series
    this.isToPlay = isToPlay
    this.isPlatinum = isPlatinum
  }
}

// найти объект по имени
function findGameByName(gameName) {
  return games.find(game => game.name === gameName)
}

// Добавляет игру в массив games с новым id
function pushGameToArray(game) {
  game.id = games.length
  games.push(game)
}

// Создаёт DOM элемент - игру
function createGameElement(game) {
  let $game = document.createElement('li')
  $game.classList.add('games__list-item')
  $game.draggable="true"
  let $gameArticle = document.createElement('article')
  $gameArticle.classList.add('games__list-card', 'game')
  let $gamePosterCaintainer = document.createElement('div')
  $gamePosterCaintainer.classList.add('game__poster-container')
  let $gamePosterImage = document.createElement('img')
  $gamePosterImage.classList.add('game__poster-image')
  $gamePosterImage.loading = 'lazy'
  $gamePosterImage.alt = game.name + ' poster'
  $gamePosterImage.src = game.posterUrl
  let $gameContentCaintainer = document.createElement('div')
  $gameContentCaintainer.classList.add('game__content')
  let $gameTitle = document.createElement('h2')
  $gameTitle.classList.add('game__title')
  $gameTitle.textContent = game.name
  let $gameStatusDlc = document.createElement('span')
  $gameStatusDlc.classList.add('game__status', 'game__status--dlc')
  $gameStatusDlc.textContent = 'DLC'
  if (game.isDLc === false) {
    $gameStatusDlc.classList.add('hidden')
  }
  let $gameStatusToPlay = document.createElement('span')
  $gameStatusToPlay.classList.add('game__status', 'game__status--toplay')
  let $gameStatusToPlayImage = document.createElement('img')
  $gameStatusToPlayImage.classList.add('game__status-image')
  $gameStatusToPlayImage.src = './images/play.svg'
  $gameStatusToPlayImage.alt = ''
  if (game.isToPlay === false) {
    $gameStatusToPlay.classList.add('hidden')
  }
  if (game.isCompleted === true) {
    $gameStatusToPlay.classList.add('hidden')
  }
  let $gameStatusPlatinum = document.createElement('span')
  $gameStatusPlatinum.classList.add('game__status', 'game__status--platinum')
  $gameStatusPlatinum.textContent = '100%'
  if (game.isPlatinum === false) {
    $gameStatusPlatinum.classList.add('hidden')
  }
  let $gameStatusReleaseDate = document.createElement('span')
  $gameStatusReleaseDate.classList.add('game__status', 'game__status--release-date')
  if (game.releaseDate === '') {
    $gameStatusReleaseDate.classList.add('hidden')
  } else {
    $gameStatusReleaseDate.textContent = game.releaseDate.split('-').reverse().join('.')
  }
  let $gameStatusScore = document.createElement('span')
  $gameStatusScore.classList.add('game__status', 'game__status--score')
  if (game.score == 0) {
    $gameStatusScore.classList.add('hidden')
  } else {
    $gameStatusScore.textContent = game.score
  }

  let $gameButtonsContainer = document.createElement('div')
  $gameButtonsContainer.classList.add('game__poster-buttons')
  let $gameButtonDelete = document.createElement('button')
  $gameButtonDelete.classList.add('game__poster-button', 'game__poster-button--delete')
  $gameButtonDelete.type = 'button'
  $gameButtonDelete.textContent = 'Удалить'

  let $gameButtonEdit = document.createElement('button')
  $gameButtonEdit.classList.add('game__poster-button', 'game__poster-button--edit')
  $gameButtonEdit.type = 'button'
  $gameButtonEdit.textContent = 'Редактировать'

  $game.appendChild($gameArticle)
  $gameArticle.appendChild($gamePosterCaintainer)
  $gamePosterCaintainer.appendChild($gamePosterImage)
  $gamePosterCaintainer.appendChild($gameButtonsContainer)
  $gameButtonsContainer.appendChild($gameButtonDelete)
  $gameButtonsContainer.appendChild($gameButtonEdit)
  $gameArticle.appendChild($gameContentCaintainer)
  $gameContentCaintainer.appendChild($gameTitle)
  $gameContentCaintainer.appendChild($gameStatusDlc)
  $gameContentCaintainer.appendChild($gameStatusToPlay)
  $gameStatusToPlay.appendChild($gameStatusToPlayImage)
  $gameContentCaintainer.appendChild($gameStatusPlatinum)
  $gameContentCaintainer.appendChild($gameStatusReleaseDate)
  $gameContentCaintainer.appendChild($gameStatusScore)

  return $game  
}

// Рендерит игру на страницу
function renderGame($game) {
  let $gameList = document.querySelector('.games_list')
  $gameList.appendChild($game)
}

function saveData() {
  localStorage.setItem('games', JSON.stringify(games))
  console.log('data saved')
}

// Загружает массив cards из LocalStorage
document.addEventListener('DOMContentLoaded', () => {
  loadData()
})

// Загружает массив cards из LocalStorage и рендерит игры на страницу
function loadData() {
  if (localStorage.getItem('games')) {
    games = JSON.parse(localStorage.getItem('games'))
    games.forEach(game => {
      renderGame(createGameElement(game))
    })
  }
}

// -------------------------------------------------------------------------
// ------------------------------------------------------------------------- МОДАЛЬНОЕ ОКНО / ДОБАВЛЕНИЕ ИГРЫ
// -------------------------------------------------------------------------

const $addGameButton = document.querySelector('.header__button-add')
const $modalAddGame = document.querySelector('.modal--create')
const $modalAddGameForm = document.querySelector('.modal--create .modal__form')
const $modalAddGameSubmitButton = document.querySelector('.modal--create .modal__button--submit')
const $modalAddGameCancelButton = document.querySelector('.modal--create .modal__button--cancel')

// Открытие и закрытие
$addGameButton.addEventListener('click', () => $modalAddGame.showModal())

$modalAddGameCancelButton.addEventListener('click', () => {
  clearModalFields($modalAddGame)
  $modalAddGame.close()
})

const handleAddModalClick = (event) => {
  const modalRect = $modalAddGame.getBoundingClientRect();
  if (
    event.clientX < modalRect.left ||
    event.clientX > modalRect.right ||
    event.clientY < modalRect.top ||
    event.clientY > modalRect.bottom
  ) {
    $modalAddGame.close()
    clearModalFields($modalAddGame)
  }
}
$modalAddGame.addEventListener("click", handleAddModalClick)
$modalAddGame.addEventListener("cancel", () => {
  clearModalFields($modalAddGame)
})


// Создание игры
$modalAddGameForm.addEventListener('submit', (event) => {
  // event.preventDefault()
  $modalAddGame.close()
  let id = 0
  let name = $modalAddGame.querySelector('.modal__input--name').value
  let posterUrl = $modalAddGame.querySelector('.modal__input--poster').value
  let isDlc = $modalAddGame.querySelector('.modal__input--is-dlc').checked
  let series = $modalAddGame.querySelector('.modal__input--series').value ?? false
  let isCompleted = $modalAddGame.querySelector('.modal__input--is-completed').checked
  let releaseDate = $modalAddGame.querySelector('.modal__input--release-date').value ?? false
  let score = $modalAddGame.querySelector('.modal__input--score').value ?? false
  let isToPlay = $modalAddGame.querySelector('.modal__input--is-to-play').checked
  let isPlatinum = $modalAddGame.querySelector('.modal__input--is-platinum').checked
  let newGame = new Game(id, name, posterUrl, isCompleted, isDlc, score, releaseDate, series, isToPlay, isPlatinum)
  pushGameToArray(newGame)
  renderGame(createGameElement(newGame))
  saveData()
})

// Управление полями модального окна при создании игры
$modalAddGame.addEventListener('change', (event) => {
  if (event.target.classList.contains('modal__input')) {
    checkModalFields($modalAddGame)
  }
})

// Проферка и показ / скрытие полей модального окна
function checkModalFields($modal) {
  let $isCompleted = $modal.querySelector('.modal__input--is-completed')
  let $isToPlay = $modal.querySelector('.modal__input--is-to-play')
  let $isPlatinum = $modal.querySelector('.modal__input--is-platinum')
  let $score = $modal.querySelector('.modal__input--score')
  if ($isCompleted.checked) {
    $isToPlay.closest('.modal__field-item').classList.add('hidden')
    $isPlatinum.closest('.modal__field-item').classList.remove('hidden')
    $score.closest('.modal__field-item').classList.remove('hidden')
    $isToPlay.checked = false
  } else {
    $isToPlay.closest('.modal__field-item').classList.remove('hidden')
    $isPlatinum.closest('.modal__field-item').classList.add('hidden')
    $isPlatinum.checked = false
    $score.closest('.modal__field-item').classList.add('hidden')
    $score.value = ''
  }
}

// Очистка полей модального окна при закрытии
function clearModalFields($modal) {
  let $modalInputs = [...$modal.querySelectorAll('.modal__input')]
  for (let input of $modalInputs) {
    if (input.type === 'checkbox') {
      input.checked = false
    } else {
      input.value = ''
    }
  }
}

// Удаление игры
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('game__poster-button--delete')) {
    let $currentGame = event.target.closest('.games__list-item')
    $currentGame.remove()
    games = games.filter(game => game.name !== $currentGame.querySelector('.game__title').textContent)
    saveData()
  }
})


// Редактирование игры
const $modalEditGame = document.querySelector('.modal--edit')
const $modalEditGameCancelButton = document.querySelector('.modal--edit .modal__button--cancel') 
const $modalEditameSubmitButton = document.querySelector('.modal--edit .modal__button--submit')
const $modalEditGameForm = document.querySelector('.modal--edit .modal__form')

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('game__poster-button--edit')) {
    $modalEditGame.showModal()
    let currentCardObject = findGameByName(event.target.closest('.game').querySelector('.game__title').textContent)
    $modalEditGame.id = currentCardObject.id
    $modalEditGame.querySelector('.modal__input--name').value = currentCardObject.name
    $modalEditGame.querySelector('.modal__input--poster').value = currentCardObject.posterUrl
    $modalEditGame.querySelector('.modal__input--series').value = currentCardObject.series ?? ''
    $modalEditGame.querySelector('.modal__input--release-date').value = currentCardObject.releaseDate ?? ''
    $modalEditGame.querySelector('.modal__input--is-dlc').checked = currentCardObject.isDLc
    $modalEditGame.querySelector('.modal__input--is-completed').checked = currentCardObject.isCompleted
    $modalEditGame.querySelector('.modal__input--is-platinum').checked = currentCardObject.isPlatinum
    $modalEditGame.querySelector('.modal__input--is-to-play').checked = currentCardObject.isToPlay
    $modalEditGame.querySelector('.modal__input--score').value = currentCardObject.score ?? ''
    checkModalFields($modalEditGame)
  }
})

$modalEditGameCancelButton.addEventListener('click', () => {
  $modalEditGame.close()
  $modalEditGame.id = ''
  clearModalFields($modalEditGame)
})

const handleEditModalClick = (event) => {
  const modalRect = $modalEditGame.getBoundingClientRect();
  if (
    event.clientX < modalRect.left ||
    event.clientX > modalRect.right ||
    event.clientY < modalRect.top ||
    event.clientY > modalRect.bottom
  ) {
    $modalEditGame.close()
    $modalEditGame.id = ''
    clearModalFields($modalEditGame)
  }
}
$modalEditGame.addEventListener("click", handleEditModalClick)
$modalEditGame.addEventListener("cancel", () => {
  clearModalFields($modalEditGame)
})

$modalEditGame.addEventListener('change', (event) => {
  if (event.target.classList.contains('modal__input')) {
    checkModalFields($modalEditGame)
  }
})

$modalEditGameForm.addEventListener('submit', (event) => {
  // event.preventDefault()
  currentCardObject = games.find(game => game.id === Number($modalEditGameForm.closest('.modal--edit').id))
  editGame(currentCardObject)
  clearModalFields($modalEditGameForm)
  $modalEditGame.close()
  $modalEditGame.id = ''
})

function editGame(gameObject) {
  gameObject.name = $modalEditGame.querySelector('.modal__input--name').value
  gameObject.posterUrl = $modalEditGame.querySelector('.modal__input--poster').value ?? ''
  gameObject.series = $modalEditGame.querySelector('.modal__input--series').value ?? ''
  gameObject.releaseDate = $modalEditGame.querySelector('.modal__input--release-date').value ?? ''
  gameObject.isDLc = $modalEditGame.querySelector('.modal__input--is-dlc').checked
  gameObject.isCompleted = $modalEditGame.querySelector('.modal__input--is-completed').checked
  gameObject.isPlatinum = $modalEditGame.querySelector('.modal__input--is-platinum').checked
  gameObject.isToPlay = $modalEditGame.querySelector('.modal__input--is-to-play').checked
  gameObject.score = $modalEditGame.querySelector('.modal__input--score').value ?? ''
  saveData()
}


// Drag and drop
const $gamesList = document.querySelector('.games_list')
const $games = $gamesList.querySelectorAll('.games__list-item');

function getNextElement(cursorPosition, currentElement) {
  const currentElementCoord = currentElement.getBoundingClientRect();
  const currentElementCenter = currentElementCoord.x + currentElementCoord.width / 2;
  const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;
  return nextElement;
};

$gamesList.addEventListener('dragstart', (event) => {
  event.target.classList.add('moving');
})

$gamesList.addEventListener('dragend', (event) => {
  event.target.classList.remove('moving');
  saveData()
})

$gamesList.addEventListener('dragover', (event) => {
  event.preventDefault();
  const activeElement = $gamesList.querySelector('.moving');
  const currentElement = event.target.closest('.games__list-item');
  const isMoveable = activeElement !== currentElement && currentElement;
  if (!isMoveable) {
    return;
  }
  const nextElement = getNextElement(event.clientX, currentElement);
  if (nextElement && activeElement === nextElement.previousElementSibling || activeElement === nextElement) {
    return;
  }
  $gamesList.insertBefore(activeElement, nextElement)
  rewriteGamesId()
})


// Переназначение id после перетаскивания
function rewriteGamesId() {
  let $games = document.querySelectorAll('.game__title')
  $games.forEach(($game, index) => {
    let currenwGameObject = games.find(game => game.name === $game.textContent)
    currenwGameObject.id = index
    games = games.sort((a, b) => a.id - b.id)
  })
}








