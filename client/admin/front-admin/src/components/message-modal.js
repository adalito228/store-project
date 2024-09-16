class MessageModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
    document.addEventListener('message', this.handleMessage.bind(this))
  }

  async handleMessage (event) {
    this.shadow.querySelector('.message span').textContent = event.detail.message
    this.shadow.querySelector('.modal').classList.add('visible')

    setTimeout(() => {
      this.shadow.querySelector('.modal').classList.remove('visible')
    }, 2500)
  }

  async render () {
    this.shadow.innerHTML =
      /* html */`
    <style>
        .modal {
          display: flex;
          position: fixed;
          width: 100%;
          height: 100%;
          justify-content: end; 
          align-items: end;
          visibility: hidden;
          opacity: 0;
          z-index: 1000;
        }

        .modal.visible {
          opacity: 1;
          pointer-events: none;
          visibility: visible;
        }

        .message{
          display: grid;
          width:auto;
          padding: 1rem;
        }

        .message span{
          background-color: hsl(0, 0%, 100%);
          width:auto;
          height: auto;
          padding: 0.7rem;
          border-radius: 0.5rem;
          font-family: "Ubuntu", sans-serif;
        }


        


    </style>

    <div class="modal">
        <div class="message">
          <span></span>
        </div>
    </div>
      `
  }
}

customElements.define('message-modal-component', MessageModal)
