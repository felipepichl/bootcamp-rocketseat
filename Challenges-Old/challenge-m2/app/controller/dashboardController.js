const { Project, Section } = require('../models');

module.exports = {
  async index(req, res, next) {
    try {
      const projects = await Project.findAll({
        include: [Section],
        where: {
          UserId: req.session.user.id,
        },
      });

      const user = req.session.user.name;

      return res.render('dashboard/index', { projects, currentUser: user });
    } catch (err) {
      return next(err);
    }
  },
};
