---
title: JavaScript学习一
subtitle: 
date: 2024-08-12 19:02:18
tags:
---

#### 2024-08-12

- typeof 检查结果返回字符串

- 反单引号 \` `表示模版字符串，模版字符串中使用 ${ } 可以嵌入变量

- 数据类型

  ```javascript
  整数 int
  大整数 bigint
  字符串 string
  
  布尔值 boolean  
  空值 null 
  	空值用来表示空对象
      空值只有一个 null
  	使用 typeof 检查一个空值会返回 "object"
  
  未定义 undefined
  	声明变量未赋值，它的值就是 undefined
  	undefined 类型的值只有一个就是 undefined
  	使用 typeof 检查时会返回 "undefined"
  
  符号 symbol
  	用来创建一个唯一的标识
      使用 typeof 检查符号时会返回 "symbol"
  ```

  

- 类型转换

  ```javascript
  "字符串"
  a = a.toString()   null 和 undefined 类型没有这个函数，调用会报错
  a = String(a)      null 和 undefined 调用转换为 "null" 和 "undefined"
  
  "数值"
  a = Number(a)
  1.字符串为合法数字则转
  	   不是合法数字转为 NaN	
  	   空串或全空格串转为 0	
  
  2. true 为 1，false 为 0
  3. null 为 0
  4. undefined 为 NaN
  
  "专门将字符串转为数值，不是字符串转成字符串再转成数值"
  a = parseInt(a)  //从左到右读取字符串的数字，遇到非数字或结束停止；可以拿来取整
  a = parseFloat(a) // 从左到右读取合法的小数
  
  Math.floor(5.1234) //向下取整 5
  Math.ceil(5.1234)	//向上取整 6
  Math.round(5.1234)	//四舍五入 5
  Math.abs(-1)		//取绝对值
  
  "布尔值"
  a = Boolean(a)
  //数字时 0 和 NaN 是 false，其他true
  //字符串时 空串false，其他true
  //null 和 undefined 都为 false
  //对象为 true
  //所有空的，没有的，错误的都转为false
  
   
  ```

  

- 算术运算

  ```javascript
  a = 10 - '5' 		// 10 - 5
  a = 10 + true 		// 10 + 1
  a = 10 + null 		// 10 + 0
  a = 10 - undefined  // 10 - NaN
  a = 1 + '2'  		// '12'
  a = true + "world"  // "trueworld"
  a = true + "" 		// "true"，可以实现数字转字符串
  a ??= 10 			//空赋值，a为 null 和 undefined 时才被赋值
  a = "123";a = +a 	// a=123类型转换
  a = 5;ans = a++ + ++a + a // 5+7+7
  ```

  

#### 2024-08-13

- 逻辑运算，等于和全等

  ```javascript
  对非布尔值取反，先转成bool值再取反
  两个字符串比较大小时才会比较字典序，其中一个为数值就都按数值比较
  
  a = 1 == "1"    		// true
  a = true == "1"    		//true
  a = null == undefined   //true
  a = NaN == NaN   		//false
  
  "===全等运算符和!==不全等运算符不进行类型转换"
  == (相等) 运算符进行类型转换后再比较值。 对于引用类型，如果引用相同（指向同一个对象），则返回 true；否则，即使对象的值相同，也返回 false。
  === (严格相等) 运算符不进行类型转换，比较值和类型，以及引用地址。 对于引用类型，如果引用相同，返回 true； 否则，返回 false，即使值和类型相同。
  
  a = 1 === "1"   	 		//false
  a = null === undefined 		//false
  ```

  

- var 声明的为全局变量，不具有块作用域（代码块中声明的变量无法在代码块外访问），但具有函数作用域，在函数中声明的还是局部变量，在 for(){} 的()中声明的是全局变量，{}中声明的是局部变量

- var 声明的变量可以重新定义，let 声明的不行；被let声明的变量不会作为全局对象window的属性，而被var声明的变量却可以

- 在局部作用域中，未使用var或let声明变量，则变量自动成为window对象的属性，也就是全局变量，${\textcolor{red}{非常不建议这样做}}$

- 某个数对1取模，余数不为0就是小数

- 对象

  ```javascript
  "创建对象"
  let obj = new Object()
  let obj = Object()
  let obj = {}		// 这种创建的时候可以添加属性
  
  "删除属性"
  delete obj.name
  
  "可以使用符号symbol作为属性名，通常是不希望被外界访问的属性"
  let mySymbol = Symbol()
  obj[mySymbol] = "111"  		// 不能使用 .mySymbol 
  console.log(obj[mySymbol])
  
  "使用 in 检查对象中是否有某个属性" // in 也会遍历原型上的属性
  console.log("name" in obj) 	//返回 true 和 false
  obj.hasOwnProperty(key)    //检查是不是自己的实例属性，是原型上的则返回false
  
  "遍历"
  for(let i in obj){
      console.log(i, obj[i]) 		//符号添加的属性不能被枚举
  }
  const keyArr = Object.keys(obj)	//只遍历实例属性上的key值
  
  两个对象进行相等或全相等比较时，比较的是内存地址
  原始值一旦创建不可更改，在内存中不会创建重复的原始值
  如果两个变量指向同一个对象，其中一个变量修改对象时，另一个变量也会受到影响
  修改对象时，所有指向该对象的变量都会受到影响
  
  let obj = {"name":"孙悟空"}
  let obj2 = obj
  obj2.name = "猪八戒"   // 会改变 obj.name 的值
  obj2 = null				// 这是改变对象 obj2 的指向，不会改变obj
  
  const obj = {"name":"孙悟空"}
  const obj2 = obj
  obj2 = {}  				  //报错，常量不能修改地址指向空对象
  obj2.name = "猪八戒"     //常量指向的对象属性可以修改
  ```



- 函数

  ```javascript
  "定义方式"
  	1.函数声明
       function fn(){
           语句。。。
       }
  	2.函数表达式
       const fn = function(){
           语句。。。
       }
      3.箭头函数  		//只有一个参数时可以省略括号
       const fn = () => {
           语句。。。
       }
       const fn = () => console.log("箭头函数")
       
  "返回值"
  function fn(){
      return ()=>alert(123)
  }
  let result = fn()   // result变为函数
  
  const sum = (a,b) =>a + b   		  //只有一行的返回值形式
  const sum = () => ({name:"孙悟空"})	//不加()，大括号会变成代码块的
  
  "作用域：全局作用域和局部作用域（块作用域）"
  全局作用域在网页运行时创建，在网页关闭时消耗
  script标签中的代码都在全局作用域中
  块作用域在代码块执行时创建，执行后销毁
  
  "作用域链"
  js解释器优先在当前作用域中寻找变量，找不到就往上一层作用域找，全局作用域找不到就 xxx id not defined
  
  "window对象"  //只能在浏览器环境中用，Node.js中用globalThis
  window.a 向window对象中添加的属性会自动成为全局变量
  var a = 10 // 相当于 window.a = 10,在全局中使用var声明的变量，都会作为window对象的属性保存，而let不会这样
  function fn(){} //使用function声明的函数，都会作为window的方法保存
  
  let a = 10
  window.a = 20
  console.log(a)  // 10,优先访问let
  ```



#### 2024-08-14

- 将主页副标题设置为随机诗词并修改内联公式渲染引擎为Mathjax。



#### 2024-08-15

- 提升

  ```javascript
  使用var声明的变量，它会在所有代码执行前被声明，可以在变量声明前访问变量
  console.log(a)    // undefined,说明a已存在，声明被提升，赋值未提升
  var a = 10
  
  使用函数声明创建（函数以function开头）的函数，会在其他代码执行前被创建，可以在函数声明前调用函数
  fn()
  function fn(){
      alert("123")
  }
  
  let 声明的变量也会提升，但是在赋值前解释器禁止对该变量的访问
  console.log(a)
  1. a=10      //  ReferenceError: a is not defined
  2. let a=10  //  ReferenceError: Cannot access 'a' before initialization 
  ```

  


- 立即执行函数(IIFE)

  ```javascript
  立即执行函数是一个匿名函数，并且它只会调用一次
  可以利用IIFE来创建一个一次性的函数作用域，避免变量冲突的问题
  
  (function (){
      let a = 10
      console.log(111)
  })();  //不加分号会跟下面的函数连在一起报错，
  		//(intermediate value)(intermediate value)(...) is not a function
  
  (function (){
      let a = 20
      console.log(222)
  }())
  ```

  

- this

  ```javascript
  函数执行时，js解释器每次会传进一个隐含的参数this
  this会指向一个对象，函数调用方式不同，this指向的对象不同
  	1.以函数形式调用，this指向的是 window
      	function fn(){
              console.log(this)	//window{...}
          }
  	2.以方法形式调用，this指向调用方法的对象
      	function fn(){
              console.log(this)
                 }
          const obj = {name:"孙悟空"}
          obj.test = fn
          obj.test()			//{ name: '孙悟空', test: [Function: fn] }
  
  ```

  

- 开发中应尽量使用严格模式，类的代码块默认就是严格模式

- 面对对象

  ```javascript
  用 （子 instanceof 父）检查对象是不是由某个类创建的
  class Person{}
  class Dog{}
  const p = new Person()
  const d = new Dog()
  console.log(p instanceof Person) //true
  console.log(d instanceof Person) //false
  
  "两种属性"
  class Person {
      // 实例属性只能通过实例访问 p.name,p.age
      name = "111"
      age = 11
      
      // 静态属性只能通过类去访问 Person.test,Person.hh
      static test = "静态属性"
      static hh = "45345"
      
      //实例方法和静态静态方法同上    
  }
  
  
  class Person {
      #address = "花果山"  //使用 # 开头的为私有属性，必须先声明才能调用
      #salary 
      
      //构造函数
      constructor(name, age, gender, salary){
          this.name = name
          this.age = age
          this.gender = gender 
          this.#salary = salary
      }
      getAddress(){
          return this.#address
      }
      get salary(){   //get + 属性名, p.salary可以访问私有属性
          return this.#salary
      }
      set salary(salary){  //set + 属性名， p.salary = 1000 可以修改私有属性
          // 可以加入数据合法验证
          this.#salary = salary
      }
  }
  
  "多态"
  js不会检查参数类型，任何数据都可以作为参数传递
  要调用某个函数，无需指定的类型，只要对象满足某些条件即可
  
  
  "继承"
  OCP开闭原则，不能修改，可以扩展
  class Animal {
      constructor(name){
          this.name = name
      }
      
      sayHello(){
          console.log("动物在叫")
      }
  }
  class Dog extends Animal {
      
  }
  class Cat extends Animal {
      
      //重写构造函数
      constructor(name, age){
          //重写构造函数第一行必须为 super()
          super(name)  //选择要继承的父类的构造函数，不继承可以空着
          this.age = age	//值如果固定可以不传参
      }
  
      sayHello(){
          super.sayHello()	//继承父类的方法
          console.log("喵喵喵")
      }
  }
  const dog = new Dog("旺财")
  dog.sayHello()  //动物在叫
  
  const cat = new Cat("小花", 2)
  cat.sayHello()  //动物在叫 喵喵喵
  ```
  
  

#### 2024-08-16

- 对象的结构

  ```javascript
  "对象中存储属性的区域实际有两个："
      1.对象自身
          直接通过对象所添加的属性，位于对象自身中
          在类中通过x=y的形式添加的属性，位于对象自身中
  
      2.原型对象(prototype)
          对象中还有一些内容，会存储到其他的对象里（原型对象）
          在对象中会有一个属性用来存储原型对象，这个属性叫做__proto__
          原型对象也负责为对象存储属性，
              1.当我们访问对象中的属性时，会优先访问对象自身的属性
              2.对象自身不包含该属性时，才会去原型对象中寻找
          会添加到原型对象中的情况：
              1.在类中通过xxx（）{}方式添加的方法，位于原型中；通过xxx=(){} 添加的方法位于对象自身当中
              2.主动向原型中添加的属性或方法
  /*---------------------------------------------------------------------*/
  1.原型："函数"才有 "prototype" 属性，称之为原型，也称为原型对象
         1.原型可以放一些属性和方法，共享给实例对象使用
         2.原型可以做继承
  2.原型链："对象(包括函数(类本质上也是函数))"都有 __proto__ 属性，这个属性指向它的"构造函数"的原型对象，原型对象也是对象，也有__proto__属性，指向原型对象的原型对象，这样一层一层形成的链式结构称为原型链，最顶层找不到则返回 null     
              
  访问一个对象的原型对象
      对象.__proto__
      Object.getPrototypeOf(对象) 
  
  原型对象中的数据：
  	1.对象中的数据（属性、方法等）
  	2.constructor(对象的构造函数) 
  
  注意：
  	原型对象也有原型，这样就构成了一条原型链，根据对象的复杂程度不同，原型链的长度也不同
      	 class Animal {
               
           }
  	     class Cat extends Animal {
               
           }
  	     Cat -> Animal实例 -> object -> Object原型 -> null
              无父类的p对象的原型链：p对象--> object --> Object原型 -->null
              object对象的原型链：object-->Object原型-->null
              
         原型链：
  		读取对象属性时，会优先对象自身属性，
  		如果对象中有，则使用，没有则去对象的原型中寻找如果原型中有，则使用，没有则去原型的原型中寻找
  		直到找到Object对象的原型（Object的原型没有原型（为 null））
  		如果依然没有找到，则返回 undefined 。// 原型找不到返回 null；属性找不到返回 undefined
  
  		作用域链，是找变量的链，找不到会报错
  		原型链，是找属性的链，找不到会返回 undefined
          
        
  "原型的作用"
  	所有的同类型对象它们的原型对象都是同一个，也就意味着，同类型对象的原型链是一样的
         原型的作用：
  		原型就相当于是一个公共的区域，可以被所有该类实例访问，
  		    可以将该类实例中，所有的公共属性（方法）统一存储到原型中这样我们只需要创建一个属性，
          	   即可被所有实例访问
  
  		JS中继承就是通过原型来实现的，当继承时，子类的原型就是一个父类的实例
  
  在对象中有些值是对象独有的，像属性（name，age，gender）每个对象都应该有自己值，
  但是有些值对于每个对象来说都是一样的，像各种方法，对于一样的值没必要重复的创建
  ```
  
  

#### 2024-08-17

- 原型修改
  ```javascript
  大部分情况下，我们是不需要修改原型对象注意：
  	千万不要通过类的实例去修改原型
              1.通过一个对象影响所有同类对象，这么做不合适
              2.修改原型先得创建实例，麻烦
              3.危险 
              
  除了通过__proto__能访问对象的原型外,
  还可以通过类的prototype属性，来访问实例的原型
  修改原型时，最好通过类去修改
  	好处：
              1.一修改就是修改所有实例的原型
              2.无需创建实例即可完成对类的修改
  
          原则：
              1.原型尽量不要手动改
              2.要改也不要通过实例对象去改
              3.通过类.prototype 属性去修改 
  	     	 4.最好不要直接给prototype去赋值
  
  class Person {
      name = '孙悟空'
      age = 18
  
      sayHello() {
          console.log('hello，我是', this.name)
      }
  }
  class Dog {
      
  }
  
  const p = new Person()
  const p2 = new Person()
  
  //通过对象修改原型，向原型中添加方法，修改后所有同类实例都可以访问该方法
  //不要这么做
  p.__proto__.run = () => {
      console.log('run')
  }
  
  //p.__proto__ = new Dog()    直接为对象赋予了一个新的原型
  
  p.run()
  p2.run()
           
  /*----------------------------------------------------------------*/ 
  instanceof 用来检查一个对象是否是一个类的实例
  dog instanceof Animal  // true
  dog instanceof Object   // true
  dog.__proto__ === Dog.prototype  // true
  
  只要对象的原型链上有这个这个类，就返回 true
  Object 是所有对象的原型
  
  in
  	使用 in 运算符检查属性时，无论属性在对象自身还是在原型中，都会返回true
  
  	—用来检查一个对象的自身是否含有某个属性
  	       对象.hasOwnProperty(属性名)（不推荐使用）
  	       Object.hasOwn(对象，属性名)
  
  ```
  



+ 旧类
  ```javascript
  var Person = (function () {  //	代码过于分散，通常会被放在一个立即执行函数里
      // 一个函数如果通过 new 调用，那么这个函数就是一个构造函数
      function Person(name, age) {
          this.name = name
          this.age = age
          /*  应该向原型里添加
          this.sayHello = function(){
              console.log(this.name)
          }	*/
      }
      // 往原型里添加
      Person.prototype.sayHello = function () {
          console.log(this.name)
      }
      //静态属性
      Person.staticProperty = "xxx"
      //静态方法
      Person.staticMethod = function (){}
  
      return Person
  })()
  
  const p = new Person("孙悟空", 18)
  
  console.log(p)
  
  /*----------------------------------------------------*/
  "继承"
  var Animal = (function () {
      function Animal(){
          
      }
      
      return Animal
  })()
  
  var Cat = (function () {
      function Cat(){
          
      }
      // 继承Animal
      Cat.prototype = new Animal()
      
      return Cat
  })()
  
  var cat = new Cat()
  console.log(cat)     //打印对象时，控制台通常显示对象的构造函数的名称，所以打印 Cat
  				   //创建cat对象时，它继承了Animal的原型，所以IDE打印结果为Animal{}	
  ```

  



























