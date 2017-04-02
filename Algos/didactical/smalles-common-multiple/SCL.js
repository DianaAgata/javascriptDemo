
function smallestCommons(arr) {
  
  arrr=arr.sort();
  
   var a=arr[0];
   var b=arr[1];
   
  function calcDiv(n){
    var div=[];
    for(var i=0; i<=n; i++){
      if(n%i===0){
        div.push(i);
      }
    }
    return div;
  }
  
  var divA=calcDiv(a);
  var divB=calcDiv(b);
  //return divA;
  var common=[];
  var uniqueA=[];
  var uniqueB=[];
  
 for(var j=0; j<divA.length; j++){
   if((divB.indexOf(divA[j])!==-1) && (common.indexOf(divA[j])===-1)){
     common.push(divA[j]);
   }
 }
  
 // return divA;
  
  for(var k=0; k<divB.length; k++){
   if((divA.indexOf(divB[k])!==-1) && (common.indexOf(divB[k]))===-1){
     common.push(divB[k]);
   }
    
 }
  
  
  for(var l=0; l<divA.length; l++){
    if(divB.indexOf(divA[l])===-1){
      uniqueA.push(divA[l]);
    }
  }
  
  for(var m=0; m<divB.length; m++){
    if(divA.indexOf(divB[m])===-1){
      uniqueB.push(divB[m]);
    }
  }
  
  
  var SCL=common.concat(uniqueA).concat(uniqueB);
  
  

  return SCL;
  
}


smallestCommons([12,32]);
