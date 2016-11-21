var tetris={
	RN:20,CN:10,//总行数，总列数
	CSIZE:26,//每个格子的大小
	OFFSET:15,//上边和坐标修正的边距
	pg:null,//保存游戏容器div
	shape:null,//保存正在下落的主角图形
	timer:null,//保存定时器序号
	interval:1000,//保存下落的速度
	wall:null,//方块墙，用来保存所有停止下落的方块
	nextShape:null,//生成下一个图形
	lines:0,//删除的行数
	score:0,//保存得分
	SCORES:[0,10,30,60,100],//保存删除行数对应的得分
	state:1,//游戏状态
	RUNNING:1,//运行状态
	GAMEOVER:0,//游戏结束
	PAUSE:2,//暂停状态
	level:1,//游戏关卡
	start:function(){//启动游戏
		//将wall赋值为空数组
		//r从0开始到<RN结束
			//在wall中压入一个CN个空元素的数组
			//debugger;
		this.state=this.RUNNING;
		this.lines=0;
		this.score=0;//重置游戏分数
		this.wall=[];
		for (var r=0;r<this.RN ;r++ ){
			this.wall[r]=[];
			this.wall[r].length=this.CN;
		}
		//找到class为playground的div保存在pg属性中
		this.pg=document.getElementsByClassName("playground")[0];
		this.shape=this.randomShape();
		this.nextShape=this.randomShape();
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
		//为当前页面绑定键盘按下事件
		document.onkeydown=function(e){
			//判断键盘号
				//如果是37：调左移方法
				//如果是39：调右移方法
				//如果是40：调下落方法
				//如果是32：一落到底
			switch(e.keyCode){
				case 37:this.state==this.RUNNING&&
								this.moveLeft();break;
				case 39:this.state==this.RUNNING&&
								this.moveRight();break;
				case 40:this.state==this.RUNNING&&
								this.moveDown();break;
				case 32:this.state==this.RUNNING&&
								this.hardDrop();break;
				case 38:this.state==this.RUNNING&&
								this.rotateR();break;
				case 90:this.state==this.RUNNING&&
								this.rotateL();break;
				case 80:this.state==this.RUNNING&&
								this.pause();break;
				case 67:this.state==this.PAUSE&&
								this.myContinue();break;
				case 83:this.state==this.GAMEOVER&&
								this.start();break;
				case 81:this.state==this.PAUSE&&
								this.gameOver();break;
			}
		}.bind(this)
	},
	gameOver:function(){
		this.state=this.GAMEOVER;
		clearInterval(this.timer);
		timer=null;
		this.paint();
	},
	pause:function(){
		this.state=this.PAUSE;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	myContinue:function(){
		this.state=this.RUNNING;
		this.timer=setInterval(this.moveDown.bind(this),this.interval);
	},
	canRotate:function(){
		//遍历主角图形每个cell
			//如果r<0或r>=RN或c<0或c>=CN或wall中和cell相同位置有格
				//返回false
		//遍历结束
		//返回true
		for (var i=0;i<this.shape.cells.length ;i++ ){
			var cell=this.shape.cells[i];
			if (cell.r<0||cell.r>=this.RN
				||cell.c<0||cell.c>=this.CN
				||this.wall[cell.r][cell.c]!=undefined){
				return false;
			}
		}
		return true;
	},
	rotateR:function(){
		//debugger;
		this.shape.rotateR();
		if (!this.canRotate())
		{
			this.shape.rotateL();
		}
		else{this.paint();}
	},
	rotateL:function(){
		this.shape.rotateL();
		if (!this.canRotate())
		{
			this.shape.rotateR();
		}
		else{this.paint();}
	},
	hardDrop:function(){//一落到底
			while (this.canDown()){
				this.shape.moveDown();
			}
			this.paint();
	},
	canLeft:function(){//判断能否左移
		//遍历主角图形中每个cell
			//将当前cell临时保存在cell中
			//如果cell的c等于0或wall中cell左侧有格
		for (var i=0;i<this.shape.cells.length ;i++ ){
			var cell=this.shape.cells[i];
			if (cell.c==0||(this.wall[cell.r][cell.c-1]!=undefined)){
				return false;
			}
		}
		return true;
	},
	moveLeft:function(){//左移一次
		//如果可以左移
			//调用主角图形的moveLeft方法
			//重绘一切
		if (this.canLeft()){
			this.shape.moveLeft();
		}
		this.paint();
	},
	canRight:function(){//判断能否右移
		//遍历主角图形中每个cell
			//将当前cell临时保存在cell中
			//如果cell的c等于9或wall中cell右侧有格
		for (var i=0;i<this.shape.cells.length ;i++ ){
			var cell=this.shape.cells[i];
			if (cell.c==9||(this.wall[cell.r][cell.c+1]!=undefined)){
				return false;
			}
		}
		return true;
	},
	moveRight:function(){//右移一次
		//如果可以右移
			//调用主角图形的moveRight方法
			//重绘一切
		if (this.canRight()){
			this.shape.moveRight();
		}
		this.paint();
	},
	canDown:function(){//判断能否下落
		//遍历shape中每个cell
			//将当前cell临时保存在变量cell中
			//如果cell的r等于RN-1或wall中当前cell的下方位置有格
				//返回false
			//遍历结束
			//返回true
			//debugger;
		for (var i=0;i<this.shape.cells.length ;i++ ){
			var cell=this.shape.cells[i];
			if (cell.r==this.RN-1||(this.wall[cell.r+1][cell.c]!=undefined)){
				return false;
			}
		}
		return true;
	},
	moveDown:function(){//让主角图形下落
		//如果主角可以下落
			//调用主角图形的moveDown方法
			//debugger;
		if(this.canDown()){
			this.shape.moveDown();
		}
		//否则
			//落到墙中
		else{
			//debugger;
			this.landIntoWall();
			var ln=this.deleteRows();
			this.score+=this.SCORES[ln];
			this.lines+=ln;
			this.level=Math.floor(this.score/100+1);
			clearInterval(this.timer);
			this.timer=setInterval(this.moveDown.bind(this),1000/this.level);
			if (!this.isGameOver()){//如果游戏没有结束
				this.shape=this.nextShape;
				this.nextShape=this.randomShape();
			}
			//否则
				//修改游戏状态为GAMEOVER
				//停止定时器，清空timer
			else{
				this.state=this.GAMEOVER;
				clearInterval(this.timer);
				this.timer=null;
			}
		}
		this.paint();
	},
	isGameOver:function(){//检查游戏是否结束
		//遍历备胎图形中每个cell
			//如果墙中和cell相同位置有格
				//返回true
		//返回false
		//debugger;
		for (var i=0;i<this.nextShape.cells.length ;i++ ){
			var cell=this.nextShape.cells[i];
			if (this.wall[cell.r][cell.c]!=undefined){
				return true;
			}
		}
		return false;
	},
	paintState:function(){//根据游戏状态绘制
		//如果游戏状态为GAMEOVER
			//新建img元素
			//设置img的src为
			//将img追加到pg中
		//如果游戏状态为PAUSE
		if (this.state==this.GAMEOVER)
		{
			var img=new Image();
			img.src="img/game-over.png";
			this.pg.appendChild(img);
		}
		if (this.state==this.PAUSE)
		{
			var img=new Image();
			img.src="img/pause.png";
			this.pg.appendChild(img);
		}
	},
	deleteRow:function(r){//删除当前行
		//从r行开始，反向遍历wall中每一行
			//用r-1行，替换r行
			//将r-1行赋值为CN个空元素的数组
			//遍历wall中r行的每个格
				//如果当前格不是undefined
					//将当前格的r+1
			//遍历结束
			//如果r-2行为空行，就退出循环
			//debugger;
		for (;r>=0 ;r-- ){
			this.wall[r]=this.wall[r-1];
			this.wall[r-1]=new Array(this.CN);
			for (var c=0;c<this.CN ;c++ ){
				if (this.wall[r][c]!=undefined){
					this.wall[r][c].r++;
				}
			}
			if (this.wall[r-2].join("")==""){
				break;
			}
		}
	},
	deleteRows:function(){//检查并删除所有满格行
		//自底向上遍历wall中每一行
			//如果当前行是满格行，就删除当前行
		for (var r=this.RN-1,ln=0;r>=0 ;r-- ){
			//如果r行为空行或ln等于4
			if (this.wall[r].join("")==""||ln==4){
				break;
			}
			if(this.isFullRow(r)){
				this.deleteRow(r);
				r++;//让r留在原地
				ln++;
			}
		}
		return ln;
	},
	isFullRow:function(r){//用来判断当前行是否满格
		//如果wall中r行转为字符串后包含,,、 ,、, 
			//返回false
		//否则，返回true
		return (String(this.wall[r]).search(/,,|^,|,$/)==-1);
	},
	randomShape:function(){//随机生成一个新图形
		//在0~2之间生成一个随机整数r
		//判断r
			//0 O
			//1 T
			//2 I
			//3 S
			//4 Z
			//5 L
			//6 J
		var r=parseInt(Math.random()*7);
		switch (r)
		{
		case 0:return new O();break;
		case 1:return new T();break;
		case 2:return new I();break;
		case 3:return new S();break;
		case 4:return new Z();break;
		case 5:return new L();break;
		case 6:return new J();break;
		}
	},
	landIntoWall:function(){//将主角图形的格落到墙中
		//遍历shape中每个cell
			//将当前cell临时保存在变量cell中
			//设置wall中当前cell相同位置的元素值为cell
		for (var k=0;k<this.shape.cells.length ;k++ )
		{
			var cell=this.shape.cells[k];
			this.wall[cell.r][cell.c]=cell;
		}
	},
	paint:function(){//重绘一切
		//将pg的内容中所有img元素 替换为""
		this.pg.innerHTML=this.pg.innerHTML.replace(/<img[^>]+>/g,"");
		this.paintShape();
		this.paintWall();
		this.paintNext();
		this.paintScore();
		this.paintState();
		this.paintLevel();
	},
	paintLevel:function(){//重绘等级
		document.getElementById("level").innerHTML=this.level;
	},
	paintScore:function(){//重绘成绩
		document.getElementById("score").innerHTML=this.score;
		document.getElementById("lines").innerHTML=this.lines;
	},
	paintNext:function(){//绘制备胎图形
		//创建文档片段frag
		//遍历主角图形nextShape中cells数组中每个cell对象
			//将当前cell临时保存在遍历cell中
			//创建img元素
			//设置img的src为cell的src
			//设置img的宽为CSIZE
			//设置img的top为OFFSET+cell的r*CSIZE
			//设置img的left为OFFSET+cell的c*CSIZE
			//将img追加到frag中
		//遍历结束
		//将frag追加到pg中
		//debugger;
		var frag=document.createDocumentFragment();
		for (var i=0;i<this.nextShape.cells.length ;i++ ){
			var img=this.paintCell(this.nextShape.cells[i],frag);
			img.style.top=parseFloat(img.style.top)+this.CSIZE+"px";
			img.style.left=parseFloat(img.style.left)+this.CSIZE*10+"px";
		}
		this.pg.appendChild(frag);
	},
	paintCell:function(cell,frag){
		//创建img元素
		//设置img的src为cell的src
		//设置img的宽为CSIZE
		//设置img的top为OFFSET+cell的r*CSIZE
		//设置img的left为OFFSET+cell的c*CSIZE
		//将img追加到frag中
		var img=new Image();
		img.src=cell.src;
		img.style.width=this.CSIZE+"px";
		img.style.top=this.OFFSET+cell.r*this.CSIZE+"px";
		img.style.left=this.OFFSET+cell.c*this.CSIZE+"px";
		frag.appendChild(img);
		return img;
	},
	paintWall:function(){//重绘墙
		//创建文档片段frag
		//遍历主角图形shape中cells数组中每个cell对象
			//将当前cell临时保存在遍历cell中
		var frag=document.createDocumentFragment();
		for(var r=this.RN-1;r>=0 ;r--){
			if(this.wall[r].join("")!=""){
				for (var c=0;c<this.CN;c++){
					if(this.wall[r][c]){
						this.paintCell(this.wall[r][c],frag);
					}
				}
			}
		}
		this.pg.appendChild(frag);
	},
	paintShape:function(){//专门绘制主角图形
		//创建文档片段frag
		//遍历主角图形shape中cells数组中每个cell对象
			//将当前cell临时保存在遍历cell中
			//创建img元素
			//设置img的src为cell的src
			//设置img的宽为CSIZE
			//设置img的top为OFFSET+cell的r*CSIZE
			//设置img的left为OFFSET+cell的c*CSIZE
			//将img追加到frag中
		//遍历结束
		//将frag追加到pg中
		//debugger;
		var frag=document.createDocumentFragment();
		for (var i=0;i<this.shape.cells.length ;i++ ){
			var cell=this.shape.cells[i];
			this.paintCell(cell,frag);
		}
		this.pg.appendChild(frag);
	},
}
tetris.start();