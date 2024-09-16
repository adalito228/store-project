module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('Product',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      productCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
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
      reference: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Referencia".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Referencia" con un nombre válido.'
          }
        }
      },
      units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Unidades".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Unidades" con un número válido.'
          },
          isInt: {
            msg: 'Por favor, rellena el campo "Unidades" con un número válido.'
          }
        }
      },
      measurementUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Unidades de medida".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Unidades de medida".'
          },
          isAlpha: {
            msg: 'Por favor, rellena el campo "Unidades de medida" con una opción correcta.'
          }

        }
      },
      measurement: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Medida".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Medida".'
          },
          isInt: {
            msg: 'Por favor, introduce un número válido en el campo "Medida".'
          }
        }
      },
      visible: {
        type: DataTypes.BOOLEAN,
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
      tableName: 'products',
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
          name: 'products_productCategoryId_fk',
          using: 'BTREE',
          fields: [
            { name: 'productCategoryId' }
          ]
        }
      ]
    }
  )

  Product.associate = function (models) {
    Product.belongsTo(models.ProductCategory, { as: 'productCategory', foreignKey: 'productCategoryId' })
    Product.hasMany(models.Price, { as: 'prices', foreignKey: 'productId' })
    Product.hasMany(models.SaleDetail, { as: 'saleDetails', foreignKey: 'productId' })
  }

  return Product
}
