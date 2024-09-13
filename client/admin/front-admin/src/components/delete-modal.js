class DeleteModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.ok = false
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
        .modal {
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
        }

        .modal.visible {
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        }

        .modal-content {
            display: grid;
            justify-content: center;
            background-color: hsl(0, 0%, 100%);
            padding: 1rem;
            border-radius: 0.5rem;      
            text-align: center;
        }

        .message{
            width:100%
        }
        .buttons{
          display:flex;
          justify-content: center;
        }

        .modal-button button{
            padding: 1rem;
            margin: 1rem;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
        }

        .accept-btn button{
            background-color: hsl(0, 100%, 60%);
            color: hsl(0, 0%, 100%);
        }

        .cancel-btn button{
            background-color: hsl(0, 0%, 50%);
            color: hsl(0, 0%, 100%);
        }
    </style>

    <div class="modal visible">
      <div class="modal-content">
        <div class="message">
          <p>¿Seguro que quiere eliminar el registro?</p>
        </div>
        <div class="buttons">
          <div class="modal-button accept-btn">
            <button class="delete-button">Eliminar</button>
          </div>
          <div class="modal-button cancel-btn">
            <button class="cancel-button">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
      `

    this.addEventListeners()
  }

  addEventListeners () {
    const deleteButton = this.shadow.querySelector('.delete-button')
    const cancelButton = this.shadow.querySelector('.cancel-button')

    deleteButton.addEventListener('click', () => {

    })

    cancelButton.addEventListener('click', () => {
      this.shadow.querySelector('.modal').classList.remove('visible')
    })
  }
}

customElements.define('delete-modal-component', DeleteModal)
