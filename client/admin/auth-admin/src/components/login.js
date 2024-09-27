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

      *{
        box-sizing: border-box;
      }
      

      .page-title{
        gap: 3rem;
      }

      .page-title h2{
        text-align: center;
        color: hsl(0, 0%, 100%);
        font-family: "Ubuntu", sans-serif;
      }

      form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem
      }

      .form-body {
        display: flex;
        flex-direction: column;
        gap: 1.5rem; 
        justify-content: center;
        align-items: center;
        width: 100%; 
      }

      .form-element {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        width: 100%;
      }

      .form-element-label label{
        color: hsl(0, 0%, 100%);
        width: 100%;
        font-family: "Ubuntu", sans-serif;
      }

      .form-element-input input{
        background-color:hsl(226, 63%, 45%);
        font-family: "Ubuntu", sans-serif;
        padding: 0.5rem;
        width: 100%;
        border: none;
      }

      .button input{
        background-color: hsl(272, 40%, 35%);
        border:none;
        border-radius: 0.4rem;
        color: hsl(0, 0%, 100%);
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 0.5rem;
      }

      .footer .bottom-message a{  
        margin:0;
        color: hsl(0, 0%, 100%);
        font-family: "Ubuntu", sans-serif;
        font-size: 0.8rem;
        text-decoration: none;
      }

      </style>
        <section class="login-form">
          <div class="page-title">
            <h2>Pedidos</h2>
          </div>
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
                <div class="button login-button">
                  <input type="submit" value="Enviar">
                </div>
              </div>  
            </div>
            <div class="footer">
              <div class="bottom-message">
                <a href="">Olvidé mi contraseña</a>
              </div>
            </div>
          </form>
        </section>
      `

    const loginform = this.shadow.querySelector('.login-form')

    loginform.addEventListener('click', async (event) => {
      event.preventDefault()

      if (event.target.closest('login-button')) {
        const form = this.shadow.querySelector('form')
        const formData = new FormData(form)
        const formDataJson = {}

        for (const [key, value] of formData.entries()) {
          formDataJson[key] = value !== '' ? value : null
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/user/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formDataJson)
        })

        const data = response.json()
      }
    })
  }
}

customElements.define('login-component', Login)
