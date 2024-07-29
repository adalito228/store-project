class Table extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.data = []
  }

  async connectedCallback () {
    try {
      await this.loadData()
      await this.render()
    } catch (error) {
      console.log(error)
    }
  }

  async loadData () {
    this.data = [
      {
        name: 'Blabla',
        email: 'blabla@gmail.com',
        created_at: '07/06/2024',
        updated_at: '10/07/2024'
      },
      {
        name: 'Bloblo',
        email: 'bloblo@gmail.com',
        created_at: '10/06/2024',
        updated_at: '12/07/2024'
      },
      {
        name: 'Blublu',
        email: 'blublu@gmail.com',
        created_at: '15/06/2024',
        updated_at: '17/07/2024'
      },
      {
        name: 'Blibli',
        email: 'blibli@gmail.com',
        created_at: '21/06/2024',
        updated_at: '23/07/2024'
      },
      {
        name: 'Bleble',
        email: 'bleble@gmail.com',
        created_at: '25/06/2024',
        updated_at: '27/07/2024'
      }
    ]
  }

  render () {
    this.shadow.innerHTML =
    /* html */`<style>
      ul{
        list-style: none;
        margin: 0;
        padding: 0;
      }

      li, span{
        font-family: "Ubuntu", sans-serif;
      }

      button{
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
      }
      
      .table{
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .table-header{
        align-items: center;
        background-color: white;
        display: flex;
        gap: 0.5rem;
        padding: 0.3rem 0.5rem;
      }

      .filter-button{
        height: 1.5rem;
      }

      .filter-button svg{
        width: 1.8rem;
        height: 1.8rem;
        fill: hsl(239, 73%, 47%);
      }

      .filter-button svg:hover{
        fill: hsl(272, 40%, 35%);
      }

      .table-records{
        align-items: center;
        display: flex;
        flex-direction: column; 
        gap: 1rem;
        height: 75vh;
        max-height: 75vh;
        overflow-y: auto;
      }

      .table-records::-webkit-scrollbar{
        background-color: hsl(272, 40%, 15%);
        width: 0.5rem;
      }

      .table-records::-webkit-scrollbar-thumb{
        background-color: hsl(272, 40%, 35%);
      }

      .table-record{
        width: 80%;
      }

      .table-record-header{
        background-color: white;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 0.2rem;
      }

      .table-record-header-button{
        cursor: pointer;
        fill: hsl(239, 73%, 47%);
        width: 1.8rem;
        height: 1.8rem;
      }

      .table-record-header-button:hover{
        fill: hsl(272, 40%, 35%);
      }

      .table-record-body ul{
        padding: 0.5rem;
        font-size: 0.9rem;
      }

      .table-record-body ul{
        color:white;
        background-color: black;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }

      .table-pagination {
        background-color: white;
        font-size: 1rem;
        padding: 0.5rem;
      }

      .table-pagination span {
        font-size: 0.8rem;
      }
    </style>

    <section class="table">
      <div class="table-header">
        <div class="filter-button">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" /></svg>
          </button>
        </div>
      </div>

      <div class="table-records"></div>

      <div class="table-pagination">
        <span>Un registro en total, mostrando 10 por página</span>
      </div>
    </section>
    `

    const tableRecords = this.shadow.querySelector('.table-records')

    this.data.forEach(element => {
      const tableRecord = document.createElement('div')
      tableRecord.classList.add('table-record')
      tableRecords.appendChild(tableRecord)

      const tableRecordHeader = document.createElement('div')
      tableRecordHeader.classList.add('table-record-header')
      tableRecord.appendChild(tableRecordHeader)

      const editButton = document.createElement('div')
      editButton.classList.add('table-record-header-button', 'edit-button')
      editButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>'
      tableRecordHeader.appendChild(editButton)

      const deleteButton = document.createElement('div')
      deleteButton.classList.add('table-record-header-button', 'delete-button')
      deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
      tableRecordHeader.appendChild(deleteButton)

      const tableRecordBody = document.createElement('div')
      tableRecordBody.classList.add('table-record-body')
      tableRecord.appendChild(tableRecordBody)

      const tableRecordBodyData = document.createElement('ul')
      tableRecordBody.appendChild(tableRecordBodyData)

      Object.entries(element).forEach(([key, value]) => {
        const listElement = document.createElement('li')
        listElement.textContent = `${key}: ${value}`
        tableRecordBodyData.appendChild(listElement)
      })
    })
  }
}

customElements.define('table-component', Table)
