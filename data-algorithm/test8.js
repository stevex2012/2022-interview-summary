var a={}, b='123', c=123;  
a[b]='b';// {'123': 'b'}
a[c]='c';  // {'123', 'c'}
console.log(a[b]); // 'c'

var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b'; //{}
a[c]='c';  
console.log(a[b]); // 'b'

var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b'; // {'[object Object]'}
a[c]='c';  
console.log(a[b]); // 'c'