/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', async () => {
  return { hello: 'world' };
});

Route.group(() => {
  Route.post('/auth', 'AuthController.store');
  Route.post('/users', 'UsersController.store');

  Route.group(() => {
    Route.get('/profile', 'ProfileController.show');
    Route.put('/profile', 'ProfileController.update');

    Route.get('/quizzes', 'QuizzesController.index');
    Route.post('/quizzes/questions', 'QuizQuestionsController.store');
    Route.get('/quizzes/:quiz_id/questions', 'QuizQuestionsController.show');

    Route.get('/scores', 'ScoresController.index');
    Route.post('/scores', 'ScoresController.store');
  }).middleware('auth');
}).prefix('/v1');
