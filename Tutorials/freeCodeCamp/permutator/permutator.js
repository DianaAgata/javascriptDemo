//freCodeCamp not-consecutive permutations counter

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

function isNotConsecutinve(a){
  for(var i=0; i<a.length-1; i++){
    if(a[i]===a[i+1]){
      return null;
    }
  }
  return a;
}

function removeConsecutives(arr){
    for(var i=0; i<arr.length; i++){
      arr[i]=isNotConsecutinve(arr[i]);
    }
    return arr;
}

function removeNull(val){
  if(val !== null){
    return true;
  }else{
    return false;
  }
}


function permAlone(str) {
 var arrFromStr=str.split('');
 var pemutations=permutator(arrFromStr);
console.log(pemutations);
var filtered=removeConsecutives(pemutations);
var solution=filtered.filter(removeNull);
console.log(solution);

return solution.length;

}

permAlone('aab');
