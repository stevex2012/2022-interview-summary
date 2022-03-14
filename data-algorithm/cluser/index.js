// for (var i = 0; i< 10; i++){
// 	setTimeout(() => {
// 		console.log(i);
//     }, 1000)
// }
// func1 test ok
// for (var i = 0; i< 10; i++){
//   (function(i){
//     setTimeout(() => {
//       console.log(i);
//       }, 1000)
//   })(i)

// }
// way2 pass test
// for (let i = 0; i< 10; i++){
// 	setTimeout(() => {
// 		console.log(i);
//     }, 1000)
// }
// way 3
// for (var i = 0; i< 10; i++){
//   let aaa = i;
// 	setTimeout(() => {
// 		console.log(aaa);
//     }, 1000)
// }
// way4 pass failed
// for (var i = 0; i< 10; i++){
// 	setTimeout((i) => {
// 		console.log(i);
//     }, 1000)
// }
// way5
for (var i = 0; i< 10; i++){
	setTimeout((function(i){
    
    return ()=>console.log(i)
  })(i), 1000)
}
