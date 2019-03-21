const path = require('path');
const Pool = require('pg').Pool;
const pool = new Pool({
  user: '', //add username
  host: 'localhost',
  database: 'permis_theorique',
  password: '', //add password
  port: 5432,
});

const list_all_parent_categories = (request, response) => {
  pool.query('SELECT c.* FROM api.categories c WHERE c.parent_category IS NULL ORDER BY c.category_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const list_all_subcategories = (request, response) => {
  pool.query('SELECT c.* FROM api.categories c WHERE c.parent_category IS NOT NULL ORDER BY c.category_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const list_all_categories = (request, response) => {
  pool.query('SELECT c.* FROM api.categories c WHERE c.parent_category IS NULL ORDER BY c.category_id ASC', (error, parentCategories) => {
    if (error) {
      throw error
    }
    pool.query('SELECT c.* FROM api.categories c WHERE c.parent_category IS NOT NULL ORDER BY c.category_id ASC', (error, subCategories) => {
      if (error) {
        throw error
      }
      for (let i = 0; i < parentCategories.rows.length; i++) {
        parentCategories.rows[i].data = [];
        for (let j = 0; j < subCategories.rows.length; j++) {
          if (subCategories.rows[j].parent_category === parentCategories.rows[i].category_id){
            parentCategories.rows[i].data.push(subCategories.rows[j]);
          }
        }
      }
      response.status(200).json(parentCategories.rows);
    })
  })
}


const read_a_category = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM api.categories WHERE category_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const list_chapters_categoryId = (request, response) => {
  const categoryId = parseInt(request.params.categoryId);
  pool.query('SELECT c.* FROM api.chapters c WHERE c.category_id = $1 ORDER BY c.chapter_id ASC', [categoryId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const list_all_chapters = (request, response) => {
  pool.query('SELECT c.* FROM api.chapters c ORDER BY c.chapter_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const list_all_questions = (request, response) => {
  pool.query('SELECT q.* FROM api.questions q', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const list_answers_questionId = (request, response) => {
  const questionId = parseInt(request.params.questionId);
  pool.query('SELECT a.* FROM api.answers a WHERE a.question_id = $1', [questionId], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const send_image_chapters = (request, response) => {
  const chapterId = parseInt(request.params.chapterId);
  response.sendFile(path.join(__dirname, '../../images/chapters/', chapterId+".jpg"));
}

const send_image_questions = (request, response) => {
  const questionId = parseInt(request.params.questionId);
  response.sendFile(path.join(__dirname, '../../images/questions/', questionId+".png"));
}



module.exports = {
  list_all_parent_categories,
  list_all_subcategories,
  list_all_categories,
  read_a_category,
  list_chapters_categoryId,
  list_all_chapters,
  list_all_questions,
  list_answers_questionId,
  send_image_chapters,
  send_image_questions
}
