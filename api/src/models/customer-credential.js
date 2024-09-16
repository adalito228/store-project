module.exports = function (sequelize, DataTypes) {
  const CustomerCredential = sequelize.define('CustomerCredential',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Ya existe un usuario con ese correo electrónico.'
        },
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Email" con un email válido.'
          },
          isEmail: {
            msg: 'Por favor, rellena el campo "Email" con un email válido.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: ['^(?=.*[A-Z])(?=.*\d)(?=.*[.-])(?=[A-Za-z\d.-]{8,}$)[A-Za-z\d.-]+$'],
            msg: 'Por favor, introduce una contraseña correcta.'
          },
          notNull: {
            msg: 'Por favor, rellena el campo "Contraseña".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Contraseña" con una contraseña válida.'
          }
        }
      },
      lastPasswordChange: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'customer_credentials',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        },
        {
          name: 'customer_credentials_customerId_fk',
          using: 'BTREE',
          fields: [
            { name: 'customerId' }
          ]
        }
      ]
    }
  )

  CustomerCredential.associate = function (models) {
    CustomerCredential.belongsTo(models.Customer, { as: 'customer', foreignKey: 'customerId' })
  }

  return CustomerCredential
}
