class Login extends HTMLElement {
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
        .menu-button{
          cursor:pointer;
          height: 2rem;
          width: 2rem;
          position: relative;
        }

        .menu-button button{
          background-color: transparent;
          border: none;
          cursor:pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          outline: none;
          padding: 0;
        }

        .menu-button button:before, .menu-button button:after,
        .menu-button span:before, .menu-button span:after{
          background-color: hsl(0, 0%, 100%);
          content: "";
          display: block;
          height: 0.2rem;
          opacity: 1;
          position: absolute;
          transition: ease-in-out all 0.15s;
          width: 100%
        }

        span:before, span:after{
          top: 50%;
          transform: translateY(-50%);
        }

        .menu-button button:before{
          top: 0.5rem;
        }

        .menu-button button:after{
          bottom: 0.5rem;
        }

        .menu-button.active{
          z-index: 2001;
        }

        .menu-button.active button:before, .menu-button.active button:after{
          background-color: hsla(0, 0%, 100%, 0%);
        }

        .menu-button.active span:before{
          background-color: hsl(256, 85%, 21%);
          transform: rotate(45deg);
        }

        .menu-button.active span:after{
          background-color: hsl(256, 85%, 21%);
          transform: rotate(-45deg)
        }

        .menu{
          background-color: hsla(0, 0%, 100%, 0);
          height: 100vh;
          left: 0;
          position: fixed;
          top: 0;
          transition: ease-in-out all 0.3s;
          visibility: hidden;
          width: 100%;
          z-index: 2000;
        }

        .menu.active{
          background-color: hsla(0, 0%, 100%, 100);
          visibility: visible;
        }
      </style>

      <form action="" method="post">
        <div class="form-body">
          <div class="form-element">
            <div class="form-element-label">
              <label for="email">Email</label>
            </div>
            <div class="form-element-input">
              <input type="email" name="email" id="email" placeholder="ejemplo@gmail.com" required>
            </div>
          </div>
          <div class="form-element">
            <div class= "form-element-label">
              <label for="password">Password</label>
            </div>
            <div class="form-element-input">
              <input type="password" name="password" id="password" placeholder="Ej: Pa$$w0rd596" required>   
            </div>
          </div>
          <div class="form-element buttonSub">
            <div class="button">
              <input type="submit" value="Enviar">
            </div>
          </div>  
        </div>
        <div class="footer">
          <div class="bottom-message">
            <button></button>
            <a href="">Olvidé mi contraseña</a>
          </div>
        </div>
      </form>
      <div class="menu-button">
        <button>
            <span></span>
        </button>
      </div>

      <div class="menu">

      </div>
      `

    const menuButton = this.shadow.querySelector('.menu-button')
    const menu = this.shadow.querySelector('.menu')

    menuButton.addEventListener('click', () => {
      menuButton.classList.toggle('active')
      menu.classList.toggle('active')
    })
  }
}

customElements.define('menu-component', Login)
