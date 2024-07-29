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
        main{
          display: grid;
          gap: 2rem;
          grid-template-columns: ${this.structure};
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
