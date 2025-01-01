---
title: JavaScript学习二
date: 2024-08-18 18:28:51
tags:
---

#### 2024-08-18

- 数组的不破坏性方法

  ```javascript
  const arr = new Array()
  const arr2 = []
  // 往数组最后添加元素
  arr[arr.length] = 423
  // 数组长度可以修改，未赋值的数据都是undefined
  arr.length = 5
  // 读取到不存在的元素会返回undefined
  console.log(arr[9])
  
  /*----------------------------------------------------*/
  
  class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }
  }
  
  const personArray = [
      new Person('张三', 18),
      new Person('李四', 19),
      new Person('王五', 20)
  ]
  for (let i = 0; i < personArray.length; i++) {
      console.log(personArray[i])
  }
  
  /*----------------------------------------------------*/
  
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let val of arr){
      // 遍历值
      console.log(val);
  }
  for(let index in arr){
      // 遍历下标
      console.log(index)
  }
  
  /*----------------------------------------------------*/
  
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // 检查一个对象是否是数组
  console.log(Array.isArray([1,2,3]))
  // at()接收负索引 -n = arr.length - n
  console.log(arr.at(-1))
  //concat() 合并数组,返回新数组
  arr2 = arr.concat([11,12,13],['111','222'])
  console.log(arr2)
  
  /*----------------------------------------------------*/
  
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  //indexOf(element,(起始位置)) 获取元素在数组中第一次出现的位置
  // 返回值：如果元素存在，返回元素在数组中的位置，否则返回-1
  //
  let result = arr.indexOf(5)
  console.log(result)
  
  // lastIndexOf(element,(起始位置)) 获取元素在数组中最后一次出现的位置
  // 返回值：如果元素存在，返回元素在数组中的位置，否则返回-1
  let result1 = arr.lastIndexOf(5)
  console.log(result1)
  
  // includes(element,(起始位置)) 判断数组中是否包含某个元素
  // 返回值：如果元素存在，返回true，否则返回false
  let result2 = arr.includes(5,8)
  console.log(result2)
  
  // join(separator) 将数组中的元素连接成一个字符串，返回值：连接后的字符串
  // 参数：separator：连接符，默认为","
  let result3 = arr.join("@")
  console.log(arr)
  console.log(result3)
  
  // slice(start,end) 截取数组中的元素,左闭右开，返回值：截取后的数组
  //  索引可以为负数，参数：start：开始位置，  end：结束位置，默认为数组长度
  // 两个参数都不写，返回整个数组
  let result4 = arr.slice(2,5)
  console.log(result4)
  ```



- 复制（深拷贝与浅拷贝）

  ```javascript
  const arr = [1, 2, 3, 4, 5]
  const arr2 = arr // 浅拷贝,只拷贝一层,未产生新对象
  const arr3 = arr.slice() // 它层次低，碰巧这样成了深拷贝。原始值是不会被复制，修改的。
  console.log(arr1 == arr) // true
  console.log(arr2 == arr) // false
  console.log(arr1 === arr) // true
  console.log(arr2 === arr) // false    
  arr[0] = 100
  console.log(arr)    // [ 100, 2, 3, 4, 5 ]
  console.log(arr2)   // [ 100, 2, 3, 4, 5 ]
  console.log(arr3)   // [ 1, 2, 3, 4, 5 ]
  console.log(arr === arr2) //true
  
  /*---------------------------------------------------------------------*/
  
  const arr = [{name:'小明'}, {name:'小红'}]
  const arr2 = arr.slice() //浅拷贝
  const arr3 =structuredClone(arr)    //专门用来深拷贝的方法
  
  console.log(arr === arr2)             // false；浅拷贝只会拷贝引用地址，第一层拷过来了，所以两人的不一样
  console.log(arr[0] === arr2[0])     // true； 后面的没拷过来，两人的还是一样的
  console.log(arr3 === arr2)           // false；
  console.log(arr3[0] === arr2[0])   // false；只有最后指向的原始值一样，中间两个人都是用的自己的地址
  arr2[0].name = '小花'
  console.log(arr)        // [{ name: '小花' }, { name: '小红' }]
  console.log(arr2)       // [{ name: '小花' }, { name: '小红' }]
  console.log(arr3)       // [{ name: '小明' }, { name: '小红' }]
  
  /*------------------------------------------------------------------*/
  
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  // ...（展开运算符），将一个数组中的元素展开到另一个数组中或者作为函数的参数传递
  // 也可以对数组进行浅复制
  const arr2 = [...arr]
  
  const obj = {name:'孙悟空',age:18}
  const obj2 = Object.assign({},obj)  // 浅拷贝;将后面对象的属性复制到前面的对象里，并返回前面的对象
  const obj3 = {...obj} // 将obj的属性在新对象中展开
  const obj4 = {address:'高老庄',...obj,name:'猪八戒',age: 100}  // 后面的属性会覆盖前面的属性
  console.log(obj4)       // {address: '高老庄', name: '猪八戒', age: 100}
  ```
  
  

#### 2024-08-19

- 数组的破坏性方法
  ```javascript
  const arr = [1, 2, 3, 4, 5];
  let result = arr.push(6, 7);  // 向数组末尾添加一个或多个元素，并返回新长度
  console.log(result)                 // 7
  
  let result1 = arr.pop();    // 删除数组最后一个元素，并返回删除的元素
  console.log(result1)                // 7
  
  let result2 = arr.shift();  // 删除数组第一个元素，并返回删除的元素
  console.log(result2)                // 1
  
  let result3 = arr.unshift(0);   // 向数组开头添加一个或多个元素，并返回新长度
  console.log(result3)                        // 6
  
  "删除"
  const arr1 = [1, 2, 3, 4, 5];
  let result4 = arr1.splice(0, 3); // 从0开始删除3个元素，并返回删除的元素
  console.log(result4)                            // [1, 2, 3]
  console.log(arr1)                               // [4, 5]
  
  "替换"
  const arr2 = [1, 2, 3, 4, 5];
  let result5 = arr2.splice(0, 2, 6, 6, 6);         // 从0开始替换2个元素为6,6,6，并返回删除的元素
  console.log(result5)    // [1, 2]
  console.log(arr2)       // [6, 6, 6, 3, 4, 5]
  
  "插入"
  const arr3 = [1, 2, 3, 4, 5];
  let result6 = arr3.splice(0, 0, 6, 6, 6);       // 从0开始插入6,6,6，并返回删除的元素
  console.log(result6)    // []
  console.log(arr3)       // [6, 6, 6, 1, 2, 3, 4, 5]
  
  const arr4 = [1, 2, 3, 4, 5];
  arr4.reverse();
  console.log(arr4)   // [5, 4, 3, 2, 1]
  ```




- 如果某个函数作为参数传递，这个函数就是回调函数（callback）；回调函数可以对另一个函数动态传递代码

- 如果一个函数的的参数或返回值是函数，则这个函数就是高阶函数
  ```javascript
  /*希望在someFn（）函数执行时，以记录一条日志
   在不修改原函数的基础上，为其增加记录日志的功能
   可以通过高阶函数，来动态的生成一个新函数
  */
  function someFn() {
      return "hello"
  }
  function outer(cb) {
      return () => {
          console.log("记录日志~~~~~")
          const result = cb()
          return result
      }
  }
  let result = outer(someFn)
  result()                    // 记录日志~~~~~
  console.log(result())       // 记录日志~~~~~ hello
  
  ```




- 闭包
  ```javascript
  闭包：
  	闭包就是能访问到外部函数作用域中变量的函数
  什么时候使用：
  	当我们需要隐藏一些不希望被别人访问的内容时就可以使用闭包
  构成闭包的条件：
      1.函数的嵌套
      2.内部函数要引用外部函数中的变量
      3.内部函数要作为返回值返回
  function outer(){
      let num = 0     //位于函数作用域中
      return ()=> {
          num++
          console.log(num)
      }
  }
  const newFn = outer()
  newFn()         // 1
  newFn()         // 2
  newFn()         // 3
  
  /*------------------------------------------------------*/
  name = "The Window";
  const object = {
    name: "My Object",
  
    getNameFunc: function () {
      return function () {
        return this.name;
      };
    }
  };
  console.log(object.getNameFunc()());  // The Window
  
  
  name = "The Window";
  const object = {
      name: "My Object",
  
      getNameFunc: function () {
          var that = this;
          return function () {
              return that.name;
          };
      }
  };
  console.log(object.getNameFunc()());    // My Object
  /*------------------------------------------------------*/
  
  
  let a = "全局变量a"
  // 函数的作用域在函数创建时就已确定（词法作用域），和调用位置无关
  function fn() {
      console.log(a)
  }
  function fn2() {
      let a = "fn2中的a"
      fn()
  }
  fn2()   // 全局变量a
  
  /*------闭包的生命周期-------*/
  闭包的生命周期：
      1.闭包在外部函数调用时产生，外部函数每次调用都会产生一个全新的闭包
      2.在内部函数丢失时销毁（内部函数被垃圾回收了，闭包才会消失）
  
  注意事项：
      1.闭包主要用来隐藏一些不希望被外部访问的内容，这就意味着闭包需要占用一定的内存空间
      2.相较于类来说，闭包比较浪费内存空间（类可以使用原型而闭包不能）
          需要执行次数较少时，使用闭包
          需要大量创建实例时，使用类
  function outer2(){
      let num = 0
      return ()=> {
          num++
          console.log(num)
      }
  }
  // 两个独立的闭包
  let fn1 = outer2()
  let fn2 = outer2()
  fn1()       // 1
  fn2()       // 1
  fn1 = null
  fn2 = null //没有对函数的引用了，上面那个箭头函数就会被垃圾回收
  
  
  ```
  



#### 2024-08-20

- 数组的一些遍历函数
  ```javascript
  let arr = [2, 3, 1, 4, 9, 0, 5, 10, 7, 8]
  // sort 按照Unicode码排序，对数字排序会出错
  arr.sort()
  console.log(arr)    //[0, 1, 10, 2, 3,4, 5, 7, 8, 9]
  //传递回调函数指定排序规则
  arr.sort((a, b) => a - b)
  console.log(arr)    //[0, 1, 2, 3, 4, 5, 7, 8, 9, 10]
  
  /*-----------------------------------------------------*/ 
  
  forEach()
      -用来遍历数组
      -它需要一个回调函数作为参数，这个回调函数会被调用多次
          数组中有几个元素，回调函数就会调用几次
          每次调用，都会将数组中的数据作为参数传递
      
      -回调函数中有三个参数("以下函数也有这三个参数")：
          element 当前的元素 
          index 当前元素的索引
          array 被历的数组
  const arr2 = ["孙悟空", "猪八戒", "沙和尚", "唐僧"]
  arr2.forEach((item, index, arr) => {
      console.log(item, index, arr) //第一次： 孙悟空 0 [ '孙悟空', '猪八戒', '沙和尚', '唐僧' ]
  })        
  
  /*-----------------------------------------------------*/   
  
  filter()
      -将数组中符合条件的元素保存到一个新数组中返回
      -需要一个回调函数作为参数，会为每一个元素去调用回调函数，并根据返回值来决定是否将元素添加到新数组中
      -非破坏性方法，不会影响原数组
  
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const arr3 = arr.filter(ele => ele&1)
  console.log(arr3)   //[1, 3, 5, 7, 9]
  
  /*-----------------------------------------------------*/ 
  
  map()
      -根据当前数组生成一个新数组
      -需要一个回调函数作为参数，回调函数的返回值会成为新数组中的元素
      -非破坏性方法不会影响原数组
  
  const arr4 = arr2.map((item, index, arr) => {
      return item + "哈哈"
  })
  console.log(arr4)   //["孙悟空哈哈", "猪八戒哈哈", "沙和尚哈哈", "唐僧哈哈"]
  
  /*-----------------------------------------------------*/ 
  
  reduce()
      -可以用来将一个数组中的所有元素整合为一个值
      -参数：
          1.回调函数，通过回调函数来指定合并的规则
          2.可选参数，初始值
  
  const arr5 = arr.reduce((prev, curr, index, arr) => {
      return prev + curr
  }, 0)
  console.log(arr5) // 55
  
  ```

  

- 可变参数arguments
  ```javascript
  arguments
      -arguments是函数中又一个隐含参数
      -arguments是一个类数组对象（伪数组）
          和数组相似，可以通过索引来读取元素，也可以通过for遍历元素，但是它不是一个数组对象，"不能调用数组的方法"
      -arguments用来存储函数的实参，
          无论用户是否定义形参，实参都会存储到arguments对象中
          可以通过该对象直接访问实参
  function fn(){
      console.log(arguments)
  }
  fn(1,2,3,4) // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4 }
  console.log(Array.isArray(arguments))   // false
  
  /*---------------------------------------------------------*/
  
  可变参数，在定义函数时可以将参数指定为可变参数
      -可变参数可以接收任意数量实参，并将他们统一存储到一个数组中返回
      -可变参数的作用和arguments基本是一致，但是也具有一些不同点：
          1.可变参数的名字可以自己指定
          2.可变参数就是一个数组，可以直接使用数组的方法
          3.可变参数可以配合其他参数一起使用，但可变参数要放最后面
  function fn(a, b, ...arr) {
      console.log(arr);
  }
  
  fn(123, 456, "hello", true, "world")    // [ 'hello', true, 'world' ]
  
  ```

  

#### 2024-08-21

- call和apply和bind
  ```javascript
  根据函数调用方式的不同，this的值也不同：
      1.以函数形式调用，this是window
      2.以方法形式调用，this是调用方法的对象
      3.构造函数中，this是新建的对象
      4.箭头函数无this和arguments，它的this由外层作用域决定，也无法使用call，apply，bind修改它的this
      5.通过call和apply调用的函数，它们的第一个参数就是函数的this
      6.通过bind返回的函数，this由bind第一个参数决定（无法修改）
  
  调用函数除了通过 函数() 这种形式外，还可以通过其他的方式来调用函数
  比如，我们可以通过调用函数的call（）和apply（）两个方法来调用函数
      fn.call()
      fn.apply()
      -call和 apply除了可以调用函数，还可以用来指定函数中的this
      -call和apply的第一个参数，将会成为函数的this
      -通过call方法调用函数，函数的实参直接在第一个参数后一个一个的列出来
      -通过apply方法调用函数，函数的实参需要通过一个数组传递
  
  function fn() {
      console.log("111", this)
  }
  const obj = {name: "孙悟空", fn}
  fn.call(obj)    // 111 { name: '孙悟空', fn: [Function: fn] }
  
  function fn2(a, b) {
      console.log(a, b, this)
  }
  fn2.call(obj,"hello",true)      // hello true { name: '孙悟空', fn: [Function: fn] }
  fn2.apply(obj,["hello",true])   // hello true { name: '孙悟空', fn: [Function: fn] }
  
  /*--------------------------------------------*/
  
  bind（）是函数的方法，可以用来创建一个新的函数
  	-bind可以为新函数绑定this
  	-bind可以为新函数绑定参数
  
  function fn(a,b,c){
      console.log("fn执行")
      console.log(a,b,c)
  }
  const obj = {name:"孙悟空"}
  const newFn = fn.bind(obj,1)
  newFn(2)        // fn执行 1 2 undefined
  newFn(66,77)    // fn执行 1 66 77
  
  ```

  

- 解构
  ```javascript
  "数组的解构"
  const arr = ["孙悟空", "猪八戒", "沙和尚"]
  let [a, b, c, d] = arr      //解构赋值
  console.log(a, b, c, d)     //孙悟空 猪八戒 沙和尚 undefined
  
  ;[a,b,c,d] = [1,2,3,4]      //加分号
  console.log(a,b,c,d)        //1 2 3 4
  
  let [, , c1=1, d1=10] = arr
  console.log(c1,d1)          //沙和尚 10
  
  let [n1,n2,...n3] = [1,2,3,4]
  console.log(n1,n2,n3)       //1 2 [ 3, 4 ]
  
  let a1=10,a2=20
  ;[a1,a2] = [a2,a1]
  console.log(a1,a2)  //20 10
  
  "对象的解构"
  const obj = {name: "孙悟空", age: 18, sex: "男"}
  let {name,age,sex:gender} = obj    // 对象用大括号,必须用与属性同名的变量接收,或者起别名
  console.log(name,age,gender)
  ```

  

- 对象的序列化
  ```javascript
  序列化指将对象转换为一个可以存储的格式
  在JS中对象的序列化通常是将一个对象转换为字符串（JSON字符串）
  序列化的用途（对象转换为字符串有什么用）：
      -对象转换为字符串后，可以将字符串在不同的语言之间进行传递
      -甚至人可以直接对字符串进行读写操作，使得JS对象可以不同的语言之间传递
      -用途：
  		1.作为数据交换的格式
         2.用来编写配置文件 
  如何进行序列化：
  	-在JS中有一个工具类JSON(JavaScript Object Notation) JS对象表示法 
  	-JS对象序列化后会换一个字符串，这个字符串我们称其为JSON字符串
  也可以手动的编写JSON字符串，在很多程序的配置文件就是使用JSON编写的
  编写JSON的注意事项：
     1.JSON字符串有两种类型：
          JSON对象{} 
          JSON数组[]
  
  	2.JSON字符串的属性名必须使用双引号引起来
  	3.JSON中可以使用的属性值（元素）
          -数字(Number)
          -字符串（String）"必须使用双引号"
          -布尔值(Boolean)
          -空值(Null) 
          -对象(Object{})
          -数组(Array[])
  
  	4.JSON的格式和JS对象的格式基本上一致的，
  
  注意：JSON字符串如果属性是最后一个，则不要再加逗号
  
  const obj = {
      name:"孙悟空",
      age: 18,
  }
  // 将obj转换为JSON字符串
  const str = JSON.stringify(obj) //JSON.stringify（） 可以将一个对象转换为JSON字符串
  const obj2 = JSON.parse(str) // JSON.parse（） 可以将一个JSON格式的字符串转换为JS对象
  console.log(str)    // {"name":"孙悟空","age":18}
  console.log(obj2)   // {name: '孙悟空', age: 18}
  console.log(obj)    // {name: '孙悟空', age: 18}
  
  "利用JSON进行深拷贝"
  const obj = {
      name:"孙悟空",
      friend: {
          name:"猪八戒"
      }
  }
  //对obj进行浅拷贝
  const obj2 = Object.assign({},obj)
  console.log(obj2 === obj)               //false
  console.log(obj2.friend === obj.friend) //true
  //对obj进行深拷贝
  const obj3 = structuredClone(obj)
  console.log(obj3 === obj)               //false
  console.log(obj3.friend === obj.friend) //false
  //利用json对象进行深拷贝
  const obj4 = JSON.parse(JSON.stringify(obj))
  ```
  
  

- Map
  ```javascript
  Map
      -Map用来存储键值对结构的数据（key-value）
      -Object中存储的数据就可以认为是一种键值对结构
      -Map和Object的主要区别
          Object中的属性名只能是字符串或符号，如果传递了一个其他类型的属性名，JS解释器会自动将其转换为字符串
          Map中任何类型的值都可以称为数据的key
  const map = new Map()
  属性和方法
      map.size()获取map中键值对的数量
      map.set(key，value) 向map中添加键值对
      map.get(key) 根据key获取值
      map.delete(key）删除指定数据
      map.has(key) 检查map中是否包含指定键 true/false
      map.clear() 删除全部的键值对
      
   /*----------------------------------------------------*/   
  const map = new Map()
  map.set("name","孙悟空")
  map.set("age",18)
  map.set({},"呵呵")
  
  //将Map转为数组
  const arr1 = [...map]
  const arr2 = Array.from(map)
  console.log(arr1)       //[ [ 'name', '孙悟空' ], [ 'age', 18 ], [ {}, '呵呵' ] ]
  console.log(arr2)       //[ [ 'name', '孙悟空' ], [ 'age', 18 ], [ {}, '呵呵' ] ]
  
  const arr3 = new Map([["name","猪八戒"],["age",20],[{},()=>{}]])
  console.log(arr3)   //Map(3) { 'name' => '猪八戒', 'age' => 20, {} => [Function (anonymous)] }
  
  //遍历
  for(let [key,value] of map){
      console.log(key,value)      //name 孙悟空
  }
  for (let entry of map){
      const [key,value] = entry
      console.log(key,value)  //name 孙悟空
      console.log(entry)      //[ 'name', '孙悟空' ]
  }
  map.forEach((value,key,map)=>{
      console.log(key,value,map)  //name 孙悟空 Map(3) { 'name' => '孙悟空', 'age' => 18, {} => '呵呵' }
  
  })
  //获取所有的键,值,键值对
  console.log(map.keys())     //MapIterator { 'name', 'age', {} }
  console.log(map.values())   //MapIterator { '孙悟空', 18, '呵呵' }
  console.log(map.entries())  //MapIterator { [ 'name', '孙悟空' ], [ 'age', 18 ], [ {}, '呵呵' ] }
  ```

  

- Set
  ```javascript
  /*
   - new Set()
   - new Set([...])
  size
  add()
  has()
  delete()
   */
  
  const set = new Set()
  set.add(1)
  set.add("孙悟空")
  set.add(true)
  const arr = [...set]
  console.log(arr)    // [1, '孙悟空', true]
  console.log(set.size)   // 3
  ```

  

#### 2024-08-22

- Math和Date
  ```javascript
  Math.floor()	//向下取整
  Math.ceil()		//向上取整
  Math.round()	//四舍五入取整
  Math.trunc()	//直接去除小数位
  
  Math.random()	//返回一个[0,1)之间的伪随机数
  
  
  Date
      -在JS中所有的和时间相关的数据都由Date对象来表示
      -对象的方法：
          getFullYear() 获取4位年份
          getMonth()    返回当前日期的月份（0—11）
          getDate()     返回当前是几日
          getDay()      返回当前日期是周几（0—6）0表示周日
          getTime()     返回当前日期对象的时间戳
          Date.now()	  获取当前的时间戳	
  
      时间戳：自1970年1月1日0时0分0秒到当前时间所经历的毫秒数
      计算机底层存储时间时，使用的都是时间戳
  
  let d = new Date(2024,7,22)     // 2024年8月22日,也可用字符串传参
  console.log(d.getFullYear())    // 2024
  console.log(d.getMonth())       // 7
  console.log(d.getDate())        // 22
  console.log(d.getDay())         // 4
  console.log(d.getTime())        // 1724256000000
  
  /*--------------------------------------------------*/
  
  const d = new Date()
  
  //将日期格式化为字符串
  let result = d.toLocaleDateString()
  console.log(result)     //2024/8/22
  
  //将时间格式化为字符串
  result = d.toLocaleTimeString()
  console.log(result)     //15:54:25
  
  //将日期和时间格式化为字符串
  result = d.toLocaleString()
  console.log(result)     //2024/8/22 15:54:25
  
  
  toLocaleString()
  可以将一个日期转换为本地时间格式的字符串
  -参数：
  
  1.描述语言和国家信息的字符串
      zh—CN 中文中国
      zh-HK中文香港
      en—US 英文美国
  2.需要一个对象作为参数，在对象中可以通过对象的属性来对日期的格式进行配置
      dateStyle日期的风格
      timeStyle时间的风格 
          full
          long 
          medium
          short
      hour12 是否采用12小时值 true/false
  	 weekday星期的显示方式
  
  result = d.toLocaleString('zh-CN',{dateStyle:'full',timeStyle:'full'})
  console.log(result)     //2024年8月22日星期四 中国标准时间 16:00:09
  ```

  

- 包装类
  ```javascript
  在JS中，除了直接创建原始值外，也可以创建原始值的对象
  通过 new String()可以创建String类型的对象 
  通过 new Number()可以创建Number类型的对象 
  通过 new Boolean()可以创建Boolean类型的对象
  "但是千万不要这么做"
  
  包装类：
  JS中一共有5个包装类
      String -->字符串包装为String对象 
      Number-->数值装为Number对 
      Boolean -->布尔值包装为Boolean对象 
      //下面这两个后加的，人不能调，JS可以调
      BigInt-->大整数包装为BigInt对象 
      Symbol-->符号包装为Symbol对象
  
  -通过包装类可以将一个原始值包装为一个对象，当我们对一个原始值调用方法或属性时，
  JS解释器会临时将原始值包装为对应的对象，然后调用这个对象的属性或方法
  //let str = new String("hello")
  //let num = new Number(11)
  //let bool = new Boolean(true)
  let num = 11
  num = num.toString()  //原始值调不了toString()方法，临时转成Number对象调用方法
  console.log(typeof num,num) // string 11
  //null.toString()  报错，null没有包装类
  let str = 'abcdefg'
  str.name = 'zhangsan'	//临时将str转变成对象赋属性值，赋完对象就没有了，str变回去
  console.log(str.name)   //undefined 第二次把str变成新的临时对象，没有name值
  ```

  

- 字符串方法
  ```javascript
  "字符串所有的方法都是非破坏性方法"
  
  str.charAt(） //根据索引获取字符
  str.concat(） //用来连接两个或多个字符串
  str.includes(char,[检查位置])
         用来检查字符串中是否包含某个内容
           有返回true
           没有返回false
  str.indexof()				 //查询某内容第一次出现的位置
  str.lastIndexof()			//查询某内容最后一次出现的位置
  str.startswith()			//检查一个字符串是否以指定内容开头
  str.endswith()				//检查一个字符串是否以指定内容结尾
  str.padStart(指定长度，添加内容)
  str.padEnd()
        通过在头/尾添加指定的内容，使字符串保持某个长度
  str.replace(旧，新)			  //使用一个新字符串替换一个指定内容
  str.replaceAll()				//使用一个新字符串替换所有指定内容
  str.slice(起始位置，结束位置) 	 //对字符串进行截取切片,左闭右开
  str.substring()					//截取字符串加强版，两个位置写反了会自动调整
  
  let str = "hello world"
  console.log(str.split())    // ["hello world"]
  console.log(str.split(""))  // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
  console.log(str.split(" ")) // ["hello", "world"]
  
  str.toLowerCase()	//转小写
  str.toUpperCase()	//转大写
  str.trim()			 //去除前后空格	
  str.trimStart()		//去除开始空格
  str.trimEnd()		//去除结束空格
  ```

  
