module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Nombre".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Nombre" con un nombre válido.'
          }
        }
      },
      email: {
        type: DataTypes.STRING(255),
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
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      }
    }, {
      sequelize,
      tableName: 'users',
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
        }
      ]
    }
  )

  User.associate = function (models) {
    User.hasMany(models.UserCredential, { as: 'userCredentials', foreignKey: 'userId' })
    User.hasMany(models.UserResetPasswordToken, { as: 'userResetPasswordTokens', foreignKey: 'userId' })
    User.hasMany(models.UserActivationToken, { as: 'userActivationTokens', foreignKey: 'userId' })
    User.hasMany(models.SentEmail, { as: 'sentEmails', foreignKey: 'userId' })
  }

  return User
}
