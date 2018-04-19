const trainData = [
      ['Rainny', 'Hot', 'High', 'False', 'No'],
      ['Rainny', 'Hot', 'High', 'True', 'No'],
      ['Overcast', 'Hot', 'High', 'False', 'Yes'],
      ['Sunny', 'Mild', 'High', 'False', 'Yes'],
      ['Sunny', 'Cool', 'Normal', 'False', 'Yes'],
      ['Sunny', 'Cool', 'Normal', 'True', 'No'],
      ['Overcast', 'Cool', 'Normal', 'True', 'Yes'],
      ['Rainny', 'Mild', 'High', 'False', 'No'],
      ['Rainny', 'Cool', 'Normal', 'False', 'Yes'],
      ['Sunny', 'Mild', 'Normal', 'False', 'Yes'],
      ['Rainny', 'Mild', 'Normal', 'True', 'Yes'],
      ['Overcast', 'Mild', 'High', 'True', 'Yes'],
      ['Overcast', 'Hot', 'Normal', 'False', 'Yes'],
      ['Sunny', 'Mild', 'High', 'True', 'No'],
    ];
NB_B = require('./naive_bayes_b');
const state = NB_B.train(trainData);

const test = ['Rainny', 'Cool', 'High', 'True'];
console.log(NB_B.predict(test, state));
