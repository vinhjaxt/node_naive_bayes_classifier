'use strict';

function calculateClassProbabilities(row, summaries){
  const probabilities = {};
  for(let key in summaries) {
    const summary = summaries[key];
    probabilities[key] = 1;
    for(let rowKey in summary){
      const value = summary[rowKey];
      const variance2 = value[1]*2;
      if(variance2 == 0){
        // do nothing
        // need implementation here
      }else{
        const mean = value[0];
        probabilities[key] *= (1 / (Math.sqrt(Math.PI*variance2))) * Math.exp(-(Math.pow(row[rowKey]-mean,2)/variance2));
      }
    }
  }
  return probabilities;
}
function predict(row, summaries) {
  const result = calculateClassProbabilities(row, summaries);
  let max = undefined;
  let predictClass = undefined;
  for(let Class in result){
    if(max === undefined || max < result[Class]){
      max = result[Class];
      predictClass = Class;
    }
  }
  return [predictClass, max];
}

// Train funcs
function summarizeClassData(data) {
  const classes = separateClassAndMakeDataSet(data);
  const summaries = {};
  for(let key in classes) {
    const dataSets = classes[key];
    const summary = {};
    var lastKey;
    dataSets.forEach(function (dataSet, key){
      lastKey = key;
      summary[key] = calcMeanStdev(dataSet);
    });
    delete summary[lastKey];
    summaries[key] = summary;
  }
  return summaries;
}

function separateClassAndMakeDataSet(Data) {
  const Classes = {};
  if(!(Data instanceof Array) || Data.length < 1) return Classes;
  const endPos = Data[0].length - 1;
  Data.forEach(function (v){
    const Class = v[endPos];
    if(!(Classes[Class] instanceof Array)) Classes[Class] = [];
    const classData = Classes[Class];
    v.forEach(function (v, i){
      if(!classData[i]) classData[i] = [];
      const dataSet = classData[i];
      dataSet.push(v);
    });
  });
  return Classes;
}

function calcMeanStdev(row) {
  if(!(row instanceof Array)){
    throw new Error("calcMeanStdev(array) the first argument must be an array");
    return;
  }
  // mean
  const avg = row.reduce(function (a, b){ return a+b; }) / row.length;
  // stdev**2
  const variance = row.map(function (v) { return Math.pow(v-avg,2); }).reduce(function (a, b){ return a+b; })/(row.length - 1);
  return [avg,variance];
}

module.exports = {
  train: summarizeClassData,
  predict: predict
};
