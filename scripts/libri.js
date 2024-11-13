const libreria = document.getElementById('libreria')
const arrMemory = []
fetch('https://striveschool-api.herokuapp.com/books?')
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('errore nella response dal sito Epicode')
    }
  })
  .then((data) => {
    console.log(data)
    data.forEach((element, e) => {
      //   console.log(e)

      const newCard = document.createElement('div')
      newCard.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3')

      newCard.innerHTML = `
      <div class="d-flex justify-content-center bg-dark-subtle ">
      <button id="nascondi-${e}" class="btn btn-primary w-50">Hide</button>
      </div>
                    <div id="card-${e}" class="card ">
                      <img src="${element.img}" class="card-img-top " alt="foto" />
                      <div class="card-body d-flex flex-column justify-content-between ">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text fs-2">
                        Price ${element.price} $
                        </p>
                        <div class="d-flex justify-content-around ">
                        <a href="#"id="add-${e}" class="btn btn-primary">Add</a>
                        <a href="#"id="remove-${e}" class="btn btn-primary">Remove</a>
                        </div>
                      </div>
                    </div>
                  `

      libreria.appendChild(newCard)
      const buttonhide = () => {
        const hideButton = document.getElementById(`nascondi-${e}`)
        hideButton.addEventListener('click', () => {
          const selectedCol = document.getElementById(`card-${e}`)
          selectedCol.classList.toggle('d-none')
          selectedCol.classList.contains('d-none')
            ? (hideButton.innerText = 'Show')
            : (hideButton.innerText = 'Hide')
        })
      }
      buttonhide()

      const buttonAddCart = () => {
        const addButton = document.getElementById(`add-${e}`)
        addButton.addEventListener('click', () => {
          arrMemory.push(element)
          localStorage.setItem('lista della spesa', JSON.stringify(arrMemory))

          const newLi = document.createElement('li')
          newLi.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'align-items-start',
            `articolo-${e}`
          )
          const shoppingCart = document.getElementById(`carrello`)
          let quantità = 1
          //   console.log(shoppingCart)

          //   shoppingCart.appendChild(newLi)
          const cart = JSON.parse(localStorage.getItem('lista della spesa'))
          console.log(cart)

          newLi.innerHTML = `<div class="ms-2 me-auto">
                <div class="fw-bold">${element.title}</div>
                ${element.price}$
              </div>
              <span class="badge text-bg-primary rounded-pill">${quantità}</span>`
          shoppingCart.appendChild(newLi)
        })
      }

      buttonAddCart()
    })
  })
  .catch((error) => {
    console.log(error)
  })
function loadCart() {
  const shoppingCart = document.getElementById('carrello')
  const cartItems = JSON.parse(localStorage.getItem('lista della spesa'))

  cartItems.forEach((element, index) => {
    const newLi = document.createElement('li')
    newLi.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      `articolo-${index}`
    )

    newLi.innerHTML = `
        <div class="ms-2 me-auto">
          <div class="fw-bold">${element.title}</div>
          ${element.price}$
        </div>
        <span class="badge text-bg-primary rounded-pill">1</span>`

    shoppingCart.appendChild(newLi)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  loadCart()
})
