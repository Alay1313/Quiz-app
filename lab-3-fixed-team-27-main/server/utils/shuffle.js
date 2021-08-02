/**
 * Welcome to the bonus round. 
 * We need our options to be shuffled before
 * we send it to our users. Create a function that
 * will take in an array and shuffle the order of that
 * array.
 */

/**
 * Shuffles an array
 * @param {Array} array original array 
 * @returns {Array} shuffled array
 */

function shuffleArray(array) { //A function that shuffles each questions answer list
  const arr = array.slice(0)
  // Implementation goes here
  for (let i = arr.length - 1; i > 0; i --){
    const newIndex = Math.floor(Math.random() * (i+1));
    const temp = arr[i];
    arr[i] = arr[newIndex];
    arr[newIndex] = temp;
  }
  return arr
}

module.exports = shuffleArray
