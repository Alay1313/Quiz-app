/**
 * This is where you will create routes for our
 * questions API
 * Base url: /api/questions
 * We have imported express and router and
 * exported the router. 
 * 
 * Your task is to fill in the router with appropriate
 * routes and implement the functionality of getting
 * data from mongodb and return appropriate results
 */

const express = require('express');
const router = express.Router();

// Question Data
const Questions = require('../../models/questions-data.json')
// Hint: get a bonus task here
const shuffleArray = require('../../utils/shuffle');


const questionList = ([]);

for(let i = 0; i < Object.keys(Questions).length; i++){
  const quiz = {
    question: Questions[i].question,
    options: Questions[i].options,
    id: i.toString()
  }
  const key = Questions[i].answer
  questionList.push(quiz);
}

/**
 * Route details
 * api GET /api/questions
 * Description: Get all questions in the database
 * IMPORTANT: remove the answers from it's data
 * we don't want the client to know the answer.
 * 
 * Structure of the return JSON:
 * [
 *    {
 *      question: 'sample question',
 *      options: [
 *        'option1',
 *        'option2'
 *      ],
 *      id: '1234'
 *    }
 * ]
 * 
 */
router.get('/', (req, res) => {
  // Remove the lines below and write your implementation
  res.send(
    Questions.map((q, index) => {
      return {
        question: q.question,
        options: shuffleArray(q.options),
        id: index.toString()
      }
    })
  )
})

/**
 * Route details
 * api GET /api/questions/count
 * Description: This will get the count of the questions
 * from the database and return it 
 * Structure of the return JSON:
 * {
 *  count: 4
 * }
 */
router.get('/count', (req, res) => {
  // Remove the lines below and write your implementation
  const count = Object.keys(Questions).length;
  res.send({
    count
  })
})

/**
 * Route details
 * api GET /api/questions/:qId
 * Description: This will get one question given the question ID
 * Structure of the return JSON:
 * {
 *    question: 'sample question',
 *    options: [
 *      'option1',
 *      'option2'
 *    ],
 *    id: '1234'
 * }
 */
router.get('/:qId', (req, res) => {
  // Remove the lines below and write your implementation
  res.send(
    questionList[req.params.qId]
  )
})


/**
 * Route details
 * api POST /api/questions/result
 * Description: This will receive a body with user
 * entered answers and will return the results. 
 * Calculation of the result will happen here and you
 * would only send the results.
 * 
 * Structure of body JSON:
 * {
 *    'questionID': 'user-answer',
 *    'questionID': 'user-answer'
 * }
 * 
 * Structure of the return JSON:
 * {
 *    summary: 'passed OR failed',
 *    score: (how many answers were correct),
 *    total: (how many questions were there)
 * }
 */
router.post('/result', (req, res) => {
  // Initialize correctly answered questions and total number of questions
  let correct = 0;
  let total = Questions.length;

  // Add up the number of correctly answered questions
  for (let i = 0; i < Questions.length; i++)
  {
    // compare user answer to real answer
    if (req.body[i.toString()] == Questions[i].answer)
    {
      correct++;
    }
  }

  // Initialize the summary and calculate percentage
  let summary = "failed";
  let percent = correct/total;

  // Change summary to passed if 50% or more was answered correctly
  if (percent >= 0.5)
  {
    summary = "passed";
  }
  
  // Place the necessary information in JSON format and send
  const ques = {"summary": summary,
                "score": correct,
                "total": total};
  
  res.json(ques);

})


module.exports = router;
