'use strict';
module.exports = function(app) {
  const db = require('../controllers/categoriesController');

  app.route('/api/parentcategories')
    .get(db.list_all_parent_categories);

  app.route('/api/subcategories')
    .get(db.list_all_subcategories);

  app.route('/api/categories')
    .get(db.list_all_categories);

  app.route('/api/categories/:id')
    .get(db.read_a_category);

  app.route('/api/chapters/:categoryId')
    .get(db.list_chapters_categoryId);

  app.route('/api/chapters')
    .get(db.list_all_chapters);

  app.route('/api/questions')
    .get(db.list_all_questions);

  app.route('/api/answers/:questionId')
    .get(db.list_answers_questionId);

  app.route('/api/images/chapters/:chapterId')
    .get(db.send_image_chapters);

  app.route('/api/images/questions/:questionId')
    .get(db.send_image_questions);

};
