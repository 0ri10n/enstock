const authorizeRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
      return res
        .status(403)
        .json({ mensaje: 'Acceso denegado, privilegios insuficientes' });
    }
    next();
  };
};

module.exports = authorizeRoles;