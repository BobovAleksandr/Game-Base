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
  let $cardImageButtonEdit = document.createElement('button')
  $cardImageButtonEdit.classList.add('cards__item-image-button', 'button', 'card-button-edit')
  $cardImageButtonEdit.type = 'button'
  let $cardImageButtonToPlay = document.createElement('button')
  $cardImageButtonToPlay.classList.add('cards__item-image-button', 'button', 'card-button-toplay')
  $cardImageButtonToPlay.type = 'button'
  let $cardImage = document.createElement('img')
  $cardImage.classList.add('cards__item-image')
  $cardImage.alt = card.name + ' poster'
  $cardImage.src = card.posterUrl
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
  if (!card.complete) {
    $cardSignToScore.classList.add('hidden')
  }
  $cardSignToScore.alt = ''
  $cardSignToScore.src = './images/toscore.svg'
  let $cardSignScore = document.createElement('span')
  $cardSignScore.classList.add('cards__item-sign--score')
  if (card.score === 0) {
    $cardSignScore.classList.add('hidden')
  }
  $cardSignScore.textContent = card.score ?? ''
  let $cardSignRelease = document.createElement('span')
  $cardSignRelease.classList.add('cards__item-sign--release')
  if (card.releaseDate < Date()) {
    $cardSignRelease.classList.add('hidden')
  }
  $cardSignRelease.textContent = card.releaseDate ?? ''
  $card.appendChild($cardImageContainer)
  $cardImageContainer.appendChild($cardImageMenu)
  $cardImageMenu.appendChild($cardImageButtonDelete)
  $cardImageMenu.appendChild($cardImageButtonEdit)
  $cardImageMenu.appendChild($cardImageButtonToPlay)
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
  localStorage.setItem('cards', cards)
}


// Модальное окно
const modalAddGame = document.querySelector('.modal__add-game')
const addCardButton = document.querySelector('.header__add-game-button')
const cancelModal = document.querySelector('.modal__cancel')
addCardButton.addEventListener('click', () => modalAddGame.showModal())
cancelModal.addEventListener('click', () => modalAddGame.close())
const handleModalClick = (event) => {
  const modalRect = modalAddGame.getBoundingClientRect();

  if (
    event.clientX < modalRect.left ||
    event.clientX > modalRect.right ||
    event.clientY < modalRect.top ||
    event.clientY > modalRect.bottom
  ) {
    modalAddGame.close();
  }
};

modalAddGame.addEventListener("click", handleModalClick);



// addCardButton.addEventListener('click', () => createCard())