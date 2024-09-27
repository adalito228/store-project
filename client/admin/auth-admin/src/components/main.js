class Main extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.structure = this.getAttribute('structure') || '1fr'
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        *{
          box-sizing: border-box;
        }
        main{
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center; 
          gap:1.5rem;
          width: 100%;
        }
      </style>

      <main>
        <slot></slot>
      </main>
      `
  }
}

customElements.define('main-component', Main)
