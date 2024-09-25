exports.findAll = (req, res) => {
  const routes = {
    '/admin': 'dashboard.html',
    '/admin/usuarios': 'users.html',
    '/admin/clientes': 'customers.html',
    '/admin/empresas': 'companies.html',
    '/admin/categorias-de-productos': 'product-categories.html',
    '/admin/productos': 'products.html'
  }

  res.status(200).send(routes)
}
