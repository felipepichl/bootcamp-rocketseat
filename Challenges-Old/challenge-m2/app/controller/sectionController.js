const { Section, Project } = require('../models');

module.exports = {

  async store(req, res, next) {
    try {
      const { projectId } = req.params;
      const section = await Section.create({
        ...req.body,
        ProjectId: projectId,
      });

      req.flash('success', 'Sessão criada com sucesso');

      return res.redirect(`/app/projects/${projectId}/sections/${section.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { projectId, id } = req.params;

      const projects = await Project.findAll({
        UserId: req.session.user.id,
      });
      const project = await Project.findById(projectId);

      const sections = await Section.findAll({
        where: { ProjectId: projectId },
      });
      const section = await Section.findById(id);

      const user = req.session.user.name;

      return res.render('sections/show', {
        currentUser: user,
        currentProject: project,
        projects,
        currentSection: section,
        sections,
        activeProject: projectId,
        activeSection: id,
      });
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Section.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Sessão removida com sucesso!');
      return res.redirect(`/app/projects/${req.params.projectId}`);
    } catch (err) {
      return next(err);
    }
  },
};
