module.exports = function (sequelize, DataTypes) {
  const UserCredential = sequelize.define('UserCredential',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
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
            msg: 'Por favor, rellena el campo "Contraseña" con 8 caracteres (letra mayúscula y un numero y un punto/guión).'
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
        type: DataTypes.STRING,
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
      tableName: 'user_credentials',
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
          name: 'user_credentials_userId_fk',
          using: 'BTREE',
          fields: [
            { name: 'userId' }
          ]
        }
      ]
    }
  )

  UserCredential.associate = function (models) {
    UserCredential.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
  }

  return UserCredential
}
