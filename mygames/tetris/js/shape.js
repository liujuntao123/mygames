//定义Cell类型描述每个格子的数据结构
//三个属性：r c src
function Cell(r,c,src){
	this.r=r;this.c=c;this.src=src;
}
//定义父类型Shape描述所有的图形类型的共同属性和方法
function Shape(cells,src,states,orgi){
	//一个属性cells	
	this.cells=cells;
	//遍历cells属性中每一个cell对象
	for(var i=0;i<this.cells.length;i++){
		this.cells[i].src=src;//设置当前cell的src为src
	}
	//将四个格子中的参照格单独存储
	this.orgCell=this.cells[orgi];
	this.states=states;
	this.statei=0;//保存每个图形对象所处的旋转状态
}
Shape.prototype={
	IMGS:{
		T:"img/T.png",
		O:"img/O.png",
		I:"img/I.png",
		S:"img/S.png",
		Z:"img/Z.png",
		L:"img/L.png",
		J:"img/J.png",
	},
	moveLeft:function(){
		//遍历当前图形中的每个cell
			//将当前cell的c-1
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].c--;
		}
	},
	moveRight:function(){
		//遍历当前图形中的每个cell
			//将当前cell的c+1
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].c++;
		}
	},
	moveDown:function(){
		//遍历当前图形中的每个cell
			//将当前cell的r+1
			//debugger;
		for(var i=0;i<this.cells.length;i++){
			this.cells[i].r++;
		}
	},
	rotateR:function(){//顺时针旋转
		//将当前对象的state+1
		//如果statei等于states的length，改回0
		//获得states中statei位置的状态对象state
		//遍历当前图形中每个cell
			//设置当前格的r等于orgCell的r+state的ri
			//设置当前格的c等于orgCell的c+state的ci
		this.statei++;
		this.statei==this.states.length&&(this.statei=0);
		this.rotate();
	},
	rotateL:function(){
		this.statei--;
		this.statei==-1&&(this.statei=this.states.length-1);
		this.rotate();
	},
	rotate:function(){//旋转
		//获得states中statei位置的状态对象state
		//遍历当前图形中每个cell(i=0,1,2,3)
			//设置当前格的r等于orgCell的r+state的ri
			//设置当前格的c等于orgCell的c+state的ci
		var state=this.states[this.statei];
		for (var i=0;i<this.cells.length ;i++ )
		{
			this.cells[i].r=this.orgCell.r+state["r"+i];
			this.cells[i].c=this.orgCell.c+state["c"+i];
		}
	}
}
function State(){//定义State类型来描述图形的一种旋转状态
	for (var i=0;i<4 ;i++ )
	{
		this["r"+i]=arguments[2*i];
		this["c"+i]=arguments[2*i+1];
	}
}
//定义T类型来描述T图形的数据结构
function T(){
	Shape.call(this,
		[new Cell(0,3),new Cell(0,4),	
		new Cell(0,5),new Cell(1,4)],
		this.IMGS.T,
		[//states
			new State( 0,-1,0,0, 0,+1,+1, 0),
			new State(-1, 0,0,0,+1, 0, 0,-1),
			new State( 0,+1,0,0, 0,-1,-1, 0),
			new State(+1, 0,0,0,-1, 0, 0,+1),
		],
		1
	);//借用Shape类型的构造函数
}
//让子类型原型继承父类型原型
Object.setPrototypeOf(T.prototype,Shape.prototype);
//定义O类型来描述O图形的数据结构
function O(){
	Shape.call(this,
		[new Cell(0,4),new Cell(0,5),	
		new Cell(1,4),new Cell(1,5)],
		this.IMGS.O,
		[new State( 0,-1,0,0,+1,-1,+1, 0)],
		1
	);//借用Shape类型的构造函数
}
//让子类型原型继承父类型原型
Object.setPrototypeOf(O.prototype,Shape.prototype);
//定义I类型来描述I图形的数据结构
function I(){
	Shape.call(this,
		[new Cell(0,3),new Cell(0,4),	
		 new Cell(0,5),new Cell(0,6)],
		this.IMGS.I,
		[new State( 0,-1,0,0, 0,+1, 0,+2),
		 new State(-1, 0,0,0,+1, 0,+2, 0)],
		1
	);//借用Shape类型的构造函数
}
//让子类型原型继承父类型原型
Object.setPrototypeOf(I.prototype,Shape.prototype);
function S(){
	Shape.call(this,
		[new Cell(0,4),new Cell(0,5),	
		 new Cell(1,3),new Cell(1,4)],
		this.IMGS.S,
		[new State(0,+1,+1,+1,-1,0, 0,0),
		 new State(+1,0,+1,-1,0,+1,0, 0)],
		3
	);//借用Shape类型的构造函数
}
//让子类型原型继承父类型原型
Object.setPrototypeOf(S.prototype,Shape.prototype);
function Z(){
	Shape.call(this,
		[new Cell(0,3),new Cell(0,4),	
		 new Cell(1,4),new Cell(1,5)],
		this.IMGS.Z,
		[new State(-1,+1,0,+1, 0,0, +1,0),
		 new State(+1,+1,+1,0,0, 0,0, -1)],
		2
	);//借用Shape类型的构造函数
}
//让子类型原型继承父类型原型
Object.setPrototypeOf(Z.prototype,Shape.prototype);
function L(){
	Shape.call(this,
		[new Cell(0,3),new Cell(0,4),	
		new Cell(0,5),new Cell(1,3)],
		this.IMGS.L,
		[//states
			new State(-1,0,0,0,+1,0,-1, -1),
			new State(0,+1,0,0,0,-1, -1,+1),
			new State(+1,0,0,0,-1,0,+1, +1),
			new State(0,-1,0,0,0,+1, +1,-1),
		],
		1
	);//借用Shape类型的构造函数
}
//让子类型原型继承父类型原型
Object.setPrototypeOf(L.prototype,Shape.prototype);
function J(){
	Shape.call(this,
		[new Cell(0,3),new Cell(0,4),	
		new Cell(0,5),new Cell(1,5)],
		this.IMGS.J,
		[//states
			new State(-1,0,0,0,+1,0,+1, -1),
			new State(0,+1,0,0,0,-1, -1,-1),
			new State( +1,0,0,0,-1,0,-1, +1),
			new State(0,-1,0,0,0,+1, +1,+1),
		],
		1
	);//借用Shape类型的构造函数
}
//让子类型原型继承父类型原型
Object.setPrototypeOf(J.prototype,Shape.prototype);
/*
S: 04 05 13 14 orgi:3 2个状态
Z: 03 04 14 15 orgi:2 2个状态
L: 03 04 05 13 orgi:1 4个状态
J: 03 04 05 15 orgi:1 4个状态
*/
/*var t=new T();
var o=new O();
var i=new I();
console.dir(t);
console.dir(o);
console.dir(i);*/