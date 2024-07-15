let cards = []

// let card = {
//   id,
//   name,
//   posterUrl,
//   complete, // true / false
//   format, // game / dlc
//   score,
//   releaseDate,
//   series,
//   toPlay,
// }

class Card {
  constructor(id = 0, name = '', posterUrl = './images/posters/placeholder.png', complete = false, format = 'game', score = 0, releaseDate = '', series = '', toPlay = false, platinum = false) {
    this.id = id
    this.name = name
    this.posterUrl = posterUrl
    this.complete = complete
    this.format = format
    this.score = score
    this.releaseDate = releaseDate
    this.series = series
    this.toPlay = toPlay
    this.platinum = platinum
  }
}

// Добавляет игру в массив games с новым id
function pushGameToArray(card) {
  card.id = cards.length
  cards.push(card)
}

// Создаёт DOM элемент - игру
function createCardElement(card) {
  let $card = document.createElement('li')
  $card.classList.add('cards__item')
  let $cardImageContainer = document.createElement('div')
  $cardImageContainer.classList.add('cards__item-image-container')
  let $cardImageMenu = document.createElement('div')
  $cardImageMenu.classList.add('cards__item-image-menu')
  let $cardImageButtonDelete = document.createElement('button')
  $cardImageButtonDelete.classList.add('cards__item-image-button', 'button', 'card-button-delete')
  $cardImageButtonDelete.type = 'button'
  $cardImageButtonDelete.textContent = 'Удалить'
  let $cardImageButtonEdit = document.createElement('button')
  $cardImageButtonEdit.classList.add('cards__item-image-button', 'button', 'card-button-edit')
  $cardImageButtonEdit.type = 'button'
  $cardImageButtonEdit.textContent = 'Редактировать'
  let $cardImage = document.createElement('img')
  $cardImage.classList.add('cards__item-image')
  $cardImage.alt = card.name + ' poster'
  $cardImage.src = card.posterUrl
  $cardImage.width = 225
  $cardImage.height = 300
  let $cardContent = document.createElement('div')
  $cardContent.classList.add('cards__content')
  let $cardTitle = document.createElement('h3')
  $cardTitle.classList.add('cards__item-title')
  $cardTitle.textContent = card.name
  let $cardSigns = document.createElement('div')
  $cardSigns.classList.add('cards__item-signs')
  let $cardSignToPlay = document.createElement('img')
  $cardSignToPlay.classList.add('cards__item-sign--toplay')
  if (!card.toPlay) {
    $cardSignToPlay.classList.add('hidden')
  }
  $cardSignToPlay.alt = ''
  $cardSignToPlay.src = './images/toplay.svg'
  let $cardSignDlc = document.createElement('img')
  $cardSignDlc.classList.add('cards__item-sign--dlc')
  if (card.format === 'game') {
    $cardSignDlc.classList.add('hidden')
  }
  $cardSignDlc.alt = ''
  $cardSignDlc.src = './images/dlc.svg'
  let $cardSignToScore = document.createElement('img')
  $cardSignToScore.classList.add('cards__item-sign--toscore')
  if (card.complete === 'completed') {
    $cardSignToScore.classList.add('hidden')
  }
  $cardSignToScore.alt = ''
  $cardSignToScore.src = './images/toscore.svg'
  let $cardSignScore = document.createElement('span')
  $cardSignScore.classList.add('cards__item-sign--score')
  if (card.score === '') {
    $cardSignScore.classList.add('hidden')
  }
  $cardSignScore.textContent = card.score ?? ''
  let $cardSignRelease = document.createElement('span')
  $cardSignRelease.classList.add('cards__item-sign--release')
  let date = new Date()
  let todayDate = `${date.getFullYear()}-${(("0" + (new Date().getMonth() + 1)).slice(-2))}-${date.getDate()}`
  if (card.releaseDate < todayDate) {
    $cardSignRelease.classList.add('hidden')
    
  } else {
    $cardSignToScore.classList.add('hidden')
  }
  $cardSignRelease.textContent = card.releaseDate ?? ''
  $card.appendChild($cardImageContainer)
  $cardImageContainer.appendChild($cardImageMenu)
  $cardImageMenu.appendChild($cardImageButtonDelete)
  $cardImageMenu.appendChild($cardImageButtonEdit)
  $cardImageContainer.appendChild($cardImage)
  $card.appendChild($cardContent)
  $cardContent.appendChild($cardTitle)
  $cardContent.appendChild($cardSigns)
  $cardSigns.appendChild($cardSignToPlay)
  $cardSigns.appendChild($cardSignDlc)
  $cardSigns.appendChild($cardSignToScore)
  $cardSigns.appendChild($cardSignScore)
  $cardSigns.appendChild($cardSignRelease)
  return $card
}

// Рендерит игру на страницу
function renderCard($card) {
  let $cardsList = document.querySelector('.cards__list')
  $cardsList.appendChild($card)
}

// Сохраняет массив cards в LocalStorage
function saveData() {
  localStorage.setItem('cards', JSON.stringify(cards))
  console.log('data saved')
}

// Загружает массив cards из LocalStorage
document.addEventListener('DOMContentLoaded', () => {
  loadData()
})

// Загружает массив cards из LocalStorage и рендерит игры на страницу
function loadData() {
  if (localStorage.getItem('cards')) {
    cards = JSON.parse(localStorage.getItem('cards'))
    cards.forEach(card => {
      renderCard(createCardElement(card))
    })
  }
}

// -------------------------------------------------------------------------
// ------------------------------------------------------------------------- МОДАЛЬНОЕ ОКНО / ДОБАВЛЕНИЕ ИГРЫ
// -------------------------------------------------------------------------
const $modalAddGame = document.querySelector('.modal__add-game')
const $formAddGame = document.querySelector('.modal__add-game .modal__form')
const $addCardButton = document.querySelector('.header__add-game-button')
const $cancelModal = document.querySelector('.modal__cancel')

// Открытие и закрытие
$addCardButton.addEventListener('click', () => $modalAddGame.showModal())
$cancelModal.addEventListener('click', () => $modalAddGame.close())
const handleAddModalClick = (event) => {
  const modalRect = $modalAddGame.getBoundingClientRect();

  if (
    event.clientX < modalRect.left ||
    event.clientX > modalRect.right ||
    event.clientY < modalRect.top ||
    event.clientY > modalRect.bottom
  ) {
    $modalAddGame.close()
  }
}
$modalAddGame.addEventListener("click", handleAddModalClick)

// Создание игры
$formAddGame.addEventListener('submit', (event) => {
  // event.preventDefault()
  $modalAddGame.close()
  let id = 0
  let name = $modalAddGame.querySelector('.modal__name--input').value
  let posterUrl = $modalAddGame.querySelector('.modal__poster--input').value
  let format = $modalAddGame.querySelector('.modal__format--select').value
  let series = $modalAddGame.querySelector('.modal__series--input').value ?? false
  let complete = $modalAddGame.querySelector('.modal__complete--input').value
  let releaseDate = $modalAddGame.querySelector('.modal__release--input').value ?? false
  let score = $modalAddGame.querySelector('.modal__score--input').value ?? false
  let toPlay = $modalAddGame.querySelector('.modal__to-play--input').checked
  let platinum = $modalAddGame.querySelector('.modal__platinum--input').checked
  let newGame = new Card(id, name, posterUrl, complete, format, score, releaseDate, series, toPlay, platinum)
  pushGameToArray(newGame)
  renderCard(createCardElement(newGame))
  saveData()
})

// Управление полями модального окна при создании игры
$modalAddGame.addEventListener('change', (event) => {
  if (event.target.classList.contains('modal__input') || event.target.classList.contains('modal__checkbox')) {
    checkModalFields($formAddGame)
  }
})


// -------------------------------------------------------------------------
// ------------------------------------------------------------------------- МОДАЛЬНОЕ ОКНО / РЕДАКТИРОВАНИЕ ИГРЫ
// -------------------------------------------------------------------------
const $editModal = document.querySelector('.modal__edit-game')
const $formEditGame = document.querySelector('.modal__edit-game .modal__form')
const $editModalCancel = $editModal.querySelector('.modal__cancel')
const $editModalSubmit = $editModal.querySelector('.modal__submit')

// Управление полями модального окна при редактировании игры
$editModal.addEventListener('change', (event) => {
  if (event.target.classList.contains('modal__input') || event.target.classList.contains('modal__checkbox')) {
    checkModalFields($editModal)
  }
})

// Кнопка отменты
$editModalCancel.addEventListener('click', () => {
  $editModal.close()
})

const handleEditModalClick = (event) => {
  const modalRect = $editModal.getBoundingClientRect();
  if (
    event.clientX < modalRect.left ||
    event.clientX > modalRect.right ||
    event.clientY < modalRect.top ||
    event.clientY > modalRect.bottom
  ) {
    $editModal.close()
  }
}
$editModal.addEventListener("click", handleEditModalClick)

// Кнопка "Готово"
$formEditGame.addEventListener('submit', (event) => {
  event.preventDefault()
  $editModal.close()
  let currentCardObject = cards.find(card => card.name === $editModal.querySelector('.modal__name--input').value)
  editCard(currentCardObject)
})

// Открытие окна редактирования игры
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('card-button-edit')) {
    $editModal.showModal()
    let $currentCard = event.target.closest('.cards__item')
    let cardObject = cards.find(card => card.name === $currentCard.querySelector('.cards__item-title').textContent)
    $editModal.querySelector('.modal__name--input').value = cardObject.name
    $editModal.querySelector('.modal__poster--input').value = cardObject.posterUrl
    $editModal.querySelector('.modal__format--select').value = cardObject.format
    $editModal.querySelector('.modal__series--input').value = cardObject.series
    $editModal.querySelector('.modal__complete--input').value = cardObject.complete
    $editModal.querySelector('.modal__release--input').value = cardObject.releaseDate
    $editModal.querySelector('.modal__score--input').value = cardObject.score
    $editModal.querySelector('.modal__platinum--input').checked = cardObject.platinum
    $editModal.querySelector('.modal__to-play--input').checked = cardObject.toPlay
    checkModalFields($editModal)
  }
})

// Редактирование игры
function editCard(cardObject) {
  cardObject.name = $editModal.querySelector('.modal__name--input').value
  cardObject.posterUrl = $editModal.querySelector('.modal__poster--input').value
  cardObject.format = $editModal.querySelector('.modal__format--select').value
  cardObject.series = $editModal.querySelector('.modal__series--input').value
  cardObject.complete = $editModal.querySelector('.modal__complete--input').value
  cardObject.releaseDate = $editModal.querySelector('.modal__release--input').value
  cardObject.score = $editModal.querySelector('.modal__score--input').value
  cardObject.platinum = $editModal.querySelector('.modal__platinum--input').checked
  cardObject.toPlay = $editModal.querySelector('.modal__to-play--input').checked
  saveData()
}

// Управление полями модальных окон
function checkModalFields($modal) {
  console.log('checkCardInputFields')
  let $name = $modal.querySelector('.modal__name--input')
  let $posterUrl = $modal.querySelector('.modal__poster--input')
  let $format = $modal.querySelector('.modal__format--select')
  let $series = $modal.querySelector('.modal__series--input')
  let $complete = $modal.querySelector('.modal__complete--input')
  let $releaseDate = $modal.querySelector('.modal__release--input')
  let $score = $modal.querySelector('.modal__score--input')
  let $platinum = $modal.querySelector('.modal__platinum--input')
  let $toPlay = $modal.querySelector('.modal__to-play--input')
  if ($complete.value === 'not-begin') {
    $releaseDate.closest('.modal__container').classList.remove('hidden')
    $toPlay.closest('.modal__container').classList.remove('hidden')
    $score.closest('.modal__container').classList.add('hidden')
    $score.value = ''
    $platinum.closest('.modal__container').classList.add('hidden')
    $platinum.checked = false
  } else if ($complete.value === 'in-progress') {
    $toPlay.closest('.modal__container').classList.remove('hidden')
    $releaseDate.closest('.modal__container').classList.add('hidden')
    $releaseDate.value = ''
    $score.closest('.modal__container').classList.add('hidden')
    $score.value = ''
    $platinum.closest('.modal__container').classList.add('hidden')
    $platinum.checked = false
  } else if ($complete.value === 'completed') {
    $score.closest('.modal__container').classList.remove('hidden')
    $platinum.closest('.modal__container').classList.remove('hidden')
    $releaseDate.closest('.modal__container').classList.add('hidden')
    $releaseDate.value = ''
    $toPlay.closest('.modal__container').classList.add('hidden')
    $toPlay.checked = false
  }
}

// -------------------------------------------------------------------------
// ------------------------------------------------------------------------- УДАЛЕНИЕ ИГРЫ
// -------------------------------------------------------------------------

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('card-button-delete')) {
    let $currentCard = event.target.closest('.cards__item')
    $currentCard.remove()
    let cardObject = cards.find(card => card.name === $currentCard.querySelector('.cards__item-title').textContent)
    deleteCard(cardObject)
  }
})
function deleteCard(cardObject) {
  cards = cards.filter(card => card.name !== cardObject.name)
  cards.forEach((card, index) => {
    card.id = index
  })
  saveData()
}
