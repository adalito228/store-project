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
          color: hsl(0, 0%, 100%);
          font-size: 1.5rem; 
          display: flex;
          flex-direction: column;
          gap:2rem; 
          justify-content: center;
          align-items: center;  
          height: 100vh;
        }

        .page-title h1{
          font-family: "Ubuntu", sans-serif;
          margin: 0; 
            
        }
        .page-title a{
          color: hsl(0, 0%, 100%);;
          background-color: hsl(0, 0%, 0%);; 
          padding: 1rem;
          border-radius: 2rem;
          font-family: "Ubuntu", sans-serif;
          font-size: 1rem;
          margin: 0; 
          text-decoration: none;  
        }
        .page-title a:hover{
          color:green;
        }

        .page-title img{
          max-width: 30%; /* Se ajusta al ancho del contenedor */
          height: auto; 

        }
      </style>

      <div class="page-title">
        <h1>${this.title}</h1>
        <a href="http://dev-pedidos.com/admin/usuarios">Volver a la página de inicio</a>
        <img src=".//..//../public/404error.svg" alt="source not found">
      </div>
      `
  }
}

customElements.define('title-error-component', Title)
