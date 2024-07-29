module.exports = function (sequelize, DataTypes) {
  const Contact = sequelize.define('Contact',//Define que va a haber un modelo 
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      fingerprintId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email : {
        type: DataTypes.STRING,
        allowNull: false
      },
      subject : {
        type: DataTypes.STRING,
        allowNull: false
      },
      message : {
        type: DataTypes.TEXT,
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
      tableName: 'contacts',
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
          name: 'contacts_fingerprintId_fk',
          using: 'BTREE',
          fields: [
            { name: 'fingerprintId' }
          ]
        }
      ]
    }
  )

  Contact.associate = function (models) {
    Contact.belongsTo(models.Fingerprint, { as: 'fingerprint', foreignKey: 'fingerprintId' })
  }

  return Contact
}