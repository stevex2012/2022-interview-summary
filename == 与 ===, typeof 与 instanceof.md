== 值相等，两边类型不同，先转换（怎么转换）在比较

=== 类型，值都相等

typeof 判断基本类型 + ‘function'

typeof ===

undefined   'undefined'
null  'object'
boolean 'boolean'
1   'number'
'123'  'string'
Symbol(1) 'symbol'
function foo(){}  'function'
其他对象(组、正则、日期、对象) 'object'



instanceOf 判断变量是否存在在右边的原型练上
instanceof运算符可以用来判断某个构造函数的prototype属性是否存在于另外一个要检测对象的原型链上

Object.prototype.toString 

'[object xxxx]'

