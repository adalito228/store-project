class Form extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
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

      ul{
        list-style: none;
        margin: 0;
        padding: 0;
      }

      label, input, select, textarea, li{
        font-family: "Ubuntu", sans-serif;
      }

      button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
      }
      
      .form-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: white;
      }

      .tabs ul li{
        background-color: hsl(272, 40%, 35%);
        color: white;
        font-weight: bold;
        display: flex;
        font-size: 0.8rem;
        padding: 0.6rem;
      }

      .form-header-buttons{
        align-items: center;
        display: flex;
        gap: 0.5rem;
        padding: 0 0.5rem;
      }

      .form-header-button{
        height: 1.8rem;
      }

      .form-header-button svg{
        width: 1.8rem;
        height: 1.8rem;
        fill: hsl(239, 73%, 47%);
      }

      .form-header-button svg:hover{
        fill: hsl(272, 40%, 35%);
      }

      form{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
        gap: 1rem; 
      }

      .form-body{
        padding: 1rem 0;
      }

      .form-element{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .form-element-label label{
        color: white;
        font-size: .8rem;
        font-weight: 700;
      }

      .form-element-input input{
        background-color: hsl(239, 73%, 77%);
        border: none;
        outline: none;
        padding: 0.4rem 0.2rem;
        width: 100%;
      }
    </style>

    <section class="form">
      <div class="form-header">
        <div class="tabs">
          <ul>
            <li>General</li>
          </ul>
        </div>
        <div class="form-header-buttons">
          <div class="form-header-button clean-button">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" /></svg>
            </button>
          </div>
          <div class="form-header-button save-button">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z" /></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="form-body">
        <form>
          <div class="form-element">
            <div class="form-element-label">
              <label for="name">Nombre</label>
            </div>
            <div class="form-element-input">
              <input type="text" name="name" id="name">
            </div>
          </div>
          <div class="form-element">
            <div class="form-element-label">
              <label for="email">Email</label>
            </div>
            <div class="form-element-input">
              <input type="email" name="email" id="email">
            </div>
          </div>
        </form>
      </div>
    </section>
    `
  }
}

customElements.define('form-component', Form)
