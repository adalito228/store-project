const sequelizeDb = require('../../models')
const Company = sequelizeDb.Company
const Op = sequelizeDb.Sequelize.Op
const moment = require('moment')
require('moment/locale/es')

exports.create = (req, res) => {
  console.log('entro')
  Company.create(req.body).then(async data => {
    res.status(200).send(data)
  }).catch(err => {
    if (err.errors) {
      res.status(422).send({
        message: err.errors
      })
    } else {
      res.status(500).send({
        message: 'Algún error ha surgido al insertar el dato.'
      })
    }
  })
}

exports.findAll = (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit
  const whereStatement = {}

  for (const key in req.query) {
    if (req.query[key] !== '' && req.query[key] !== 'null' && key !== 'page' && key !== 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  Company.findAndCountAll({
    where: condition,
    attributes: ['id', 'commercialAddress', 'fiscalAddress', 'commercialName', 'vatNumber', 'createdAt', 'updatedAt'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      /* const formattedResult = result.rows.map(company => {
        return {
          ...company.toJSON(),
          createdAt: moment(company.createdAt).locale('es').format('DD-MM-YYYY'),
          updatedAt: moment(company.updatedAt).locale('es').format('DD-MM-YYYY')
        }
      }) */
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page,
        size: limit
      }

      // res.status(200).send({ rows: formattedResult, meta: result.meta })
      res.status(200).send(result)
    }).catch(err => {
      res.status(500).send({
        message: err.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  Company.findByPk(id).then(data => {
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con la id=${id}.`
      })
    }
  }).catch(_ => {
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar la id=' + id
    })
  })
}

exports.update = (req, res) => {
  const id = req.params.id

  Company.update(req.body, {
    where: { id }
  }).then(([numberRowsAffected]) => {
    if (numberRowsAffected === 1) {
      res.status(200).send({
        message: 'El elemento ha sido actualizado correctamente.'
      })
    } else {
      res.status(404).send({
        message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
      })
    }
  }).catch(_ => {
    res.status(500).send({
      message: 'Algún error ha surgido al actualiazar la id=' + id
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id

  Company.destroy({
    where: { id }
  }).then((numberRowsAffected) => {
    if (numberRowsAffected === 1) {
      res.status(200).send({
        message: 'El elemento ha sido borrado correctamente'
      })
    } else {
      res.status(404).send({
        message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
      })
    }
  }).catch(_ => {
    res.status(500).send({
      message: 'Algún error ha surgido al borrar la id=' + id
    })
  })
}
