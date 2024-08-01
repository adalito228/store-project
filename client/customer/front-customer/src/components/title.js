class Title extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
      /* html */`
      <style>
        .page-title{
          color: white;
          font-size: 1rem;
        }

        .page-title h1{
          font-family: "Ubuntu", sans-serif;
          margin: 0;
        }
      </style>

      <div class="page-title">
        <h1>${this.title}</h1>
      </div>
      `
  }
}

customElements.define('title-component', Title)
