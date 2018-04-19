'use strict';

function train(data){
  if(!(data instanceof Array) || data.length < 1) return;
  const classStats = {};
  const endPos = data[0].length - 1;
  const N = data.length;
  for(let i=0; i<N; i++){
    const v = data[i];
    const Class = v[endPos];
    if(!classStats[Class]) classStats[Class] = {};
    const classStat = classStats[Class];
    if(classStat.Nc)
      classStat.Nc++;
    else
      classStat.Nc = 1;
    if(!classStat['props']) classStat['props']={};
    const props = classStat['props'];
    for(let j=0; j<endPos;j++){
      const vj = v[j];
      if(!props[j]) props[j]={};
      const prop = props[j];
      if(prop[vj])
        prop[vj]++;
      else
        prop[vj] = 1;
    }
  }
  for(let Class in classStats){
    const classStat = classStats[Class];
    classStat.p = classStat.Nc/N;
    for(let k in classStat.props){
      const props = classStat.props[k];
      for(let j in props){
        props[j] = props[j]/classStat.Nc;
      }
    }
  }
  return classStats;
}

function predict(row, classStats){
  const probabilities = {};
  let total = 0;
  for(let Class in classStats){
    const classStat = classStats[Class];
    for(let k in classStat.props){
      const props = classStat.props[k];
      const prop = props[row[k]];
      if(probabilities[Class] === undefined) probabilities[Class]=classStat.p;
      probabilities[Class] *= prop;
    }
  }
  let maxProbability, finalClass;
  for(let Class in probabilities){
    const prob = probabilities[Class];
    if(maxProbability === undefined || prob > maxProbability){
      maxProbability = prob;
      finalClass = Class;
    }
  }
  return [finalClass, maxProbability];
}

module.exports = {
  train: train,
  predict: predict
};
