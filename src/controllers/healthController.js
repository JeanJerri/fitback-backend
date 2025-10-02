module.exports = {
  check: (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando corretamente!' });
  }
};
