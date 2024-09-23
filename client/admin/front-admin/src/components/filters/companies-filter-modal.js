import { store } from '../../redux/store.js'
import { applyFilter } from '../../redux/crud-slice.js'
class CompaniesFilterModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
    document.addEventListener('showFilterModal', this.handleFilterModal.bind(this))
  }

  handleFilterModal (event) {
    this.shadow.querySelector('.filter-form').classList.add('visible')
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
        .filter-form {
          display: flex;
          position: fixed;
          width: 100%;
          height: 100%;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.5);
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s;
          z-index: 5000;
        }

        .filter-form.visible {
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        }

        form {
            display: grid;
            justify-content: center;
            background-color: hsl(0, 0%, 100%);
            padding: 1rem;
            border-radius: 0.5rem;      
            text-align: center;
        }

        .filter-buttons {
          display:flex;
          justify-content: center;
        }

        .filter-form-element{
          padding: 0.5rem;
        }

        .filter-button button{
            padding: 1rem;
            margin: 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
        }

        .filter-form-element-label label{
       
        }

        .find-btn button{
            background-color: hsl(0, 100%, 60%);
            color: hsl(0, 0%, 100%);
        }

        .cancel-btn button{
            background-color: hsl(0, 0%, 50%);
            color: hsl(0, 0%, 100%);
        }
    </style>

    <div class="filter-form">
      <form>
        <div class= "filters">
          <div class="filter-form-element">
            <div class="filter-form-element-label">
              <label>Nombre</label>
            </div>
          <div class="filter-form-element-input">
            <input type="text" name="name">
          </div>
          </div>
          <div class="filter-form-element">
            <div class="filter-form-element-label">
              <label>Email</label>
            </div>
            <div class="filter-form-element-input">
              <input type="text" name="email">
            </div>
          </div>
        </div>   
        <div class="filter-buttons">
            <div class="filter-button find-btn">
              <button class="filter-find-button">Filtrar</button>
            </div>
            <div class="filter-button cancel-btn">
              <button class="filter-cancel-button">Cancelar</button>
            </div>
        </div>
      </form>
    </div>
      `

    this.addEventListeners()
  }

  addEventListeners () {
    const filterFindButton = this.shadow.querySelector('.filter-find-button')
    const filterCancelButton = this.shadow.querySelector('.filter-cancel-button')

    filterFindButton.addEventListener('click', async event => {
      event.preventDefault()
      const form = this.shadow.querySelector('form')

      const formData = new FormData(form)
      const formDataJson = {}

      for (const [key, value] of formData.entries()) {
        formDataJson[key] = value !== '' ? value : null
      }

      const queryString = Object.entries(formDataJson).map(([key, value]) => {
        return `${key}=${value}`
      }).join('&')

      store.dispatch(applyFilter(queryString))

      this.shadow.querySelector('.filter-form').classList.remove('visible')
      form.reset()
    })

    filterCancelButton.addEventListener('click', (event) => {
      event.preventDefault()

      this.shadow.querySelector('.filter-form').classList.remove('visible')
    })
  }
}

customElements.define('companies-filter-modal-component', CompaniesFilterModal)
