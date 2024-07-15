let games = []

// Конструктор игр
class Game {
  constructor(id = 0, name = '', posterUrl = './images/posters/placeholder.png', isCompleted = false, isDlc = false, score = '-', releaseDate = '', series = '', isToPlay = false, isPlatinum = false) {
    this.id = id
    this.name = name
    this.posterUrl = posterUrl
    this.isCompleted = isCompleted
    this.isDLc = isDlc
    this.score = score
    this.releaseDate = releaseDate
    this.series = series
    this.isToPlay = isToPlay
    this.isPlatinum = isPlatinum
  }
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
    $gameStatusDlc.classList.add('visually-hidden')
  }
  let $gameStatusToPlay = document.createElement('span')
  $gameStatusToPlay.classList.add('game__status', 'game__status--toplay')
  let $gameStatusToPlayImage = document.createElement('img')
  $gameStatusToPlayImage.classList.add('game__status-image')
  $gameStatusToPlayImage.src = './images/play.svg'
  $gameStatusToPlayImage.alt = ''
  if (game.isToPlay === false) {
    $gameStatusToPlay.classList.add('half-opacity')
  }
  if (game.isCompleted === true) {
    $gameStatusToPlay.classList.add('visually-hidden')
  }
  let $gameStatusPlatinum = document.createElement('span')
  $gameStatusPlatinum.classList.add('game__status', 'game__status--platinum')
  $gameStatusPlatinum.textContent = '100%'
  if (game.isPlatinum === false) {
    $gameStatusPlatinum.classList.add('visually-hidden')
  }
  let $gameStatusReleaseDate = document.createElement('span')
  $gameStatusReleaseDate.classList.add('game__status', 'game__status--release-date')
  if (game.releaseDate === '') {
    $gameStatusReleaseDate.classList.add('visually-hidden')
  } else {
    $gameStatusReleaseDate.textContent = game.releaseDate.split('-').reverse().join('.')
  }
  let $gameStatusScore = document.createElement('span')
  $gameStatusScore.classList.add('game__status', 'game__status--score')
  $gameStatusScore.textContent = '-'
  if (game.score === '') {
    $gameStatusScore.classList.add('half-opacity')
  } else {
    $gameStatusScore.textContent = game.score
  }
  $game.appendChild($gameArticle)
  $gameArticle.appendChild($gamePosterCaintainer)
  $gamePosterCaintainer.appendChild($gamePosterImage)
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
const $modalAddGameSubmitButton = document.querySelector('.modal__button--submit')
const $modalAddGameCancelButton = document.querySelector('.modal__button--cancel')

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
  } else {
    $isToPlay.closest('.modal__field-item').classList.remove('hidden')
    $isPlatinum.closest('.modal__field-item').classList.add('hidden')
    $score.closest('.modal__field-item').classList.add('hidden')
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