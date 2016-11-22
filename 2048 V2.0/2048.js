var game={
		RN:0,CN:0,//定义总行数总列数
		data:null,//保存游戏格子的二维数组
		score:0,//保存游戏得分
		state:1,//保存游戏状态
		GAMEOVER:0,//表示游戏结束状态
		RUNNING:1,//表示游戏运行中
		start:function(){//游戏启动
			//重置游戏状态为RUNNING
			//debugger;
			this.state=this.RUNNING;
			this.score=0;//将游戏分数重置为0
			//创建空数组保存在data属性中
			this.data=[];
			this.RN=parseInt(document.forms[0].elements["row"].value);//获得总行数总列数
			this.CN=parseInt(document.forms[0].elements["col"].value);
			//r从0开始，到<RN结束	
			for(var r=0;r<this.RN;r++){
				//创建一个空数组保存在data中r行
				this.data[r]=[];
				//c从0开始，到<CN结束
				for (var c=0;c<this.CN ;this.data[r][c]=0,c++ ){
					//设置data中r行c列的值为0
				}
			}
			//鼠标放到data上，4*4的二维数组
			//document.getElementsByTagName("form")[0].submit();//提交表单值
			this.createCell(this.RN,this.CN);//生成页面元素
			this.randomNum();//随机生成第一个数
			this.randomNum();//随机生成第二个数
			this.updataView();//更新页面
			//为页面绑定键盘按下事件
			document.onkeydown=function(e){
				//事件处理函数中，this默认指事件绑定的对象
				switch (e.keyCode){
				case 37:this.moveLeft();break;
				case 38:this.moveUp();break;
				case 39:this.moveRight();break;
				case 40:this.moveDown();break;
				}
			}.bind(/*start为方法的*/this);
			//移动端滑动事件
			//console.log(Zepto('#gridPanel'));
			Zepto('#gridPanel').swipeUp(function () {
				this.moveUp();
			}.bind(this));
			Zepto('#gridPanel').swipeDown(function () {
				this.moveDown();
			}.bind(this));
			Zepto('#gridPanel').swipeLeft(function () {
				this.moveLeft();
			}.bind(this));
			Zepto('#gridPanel').swipeRight(function () {
				this.moveRight();
			}.bind(this));
		},
		createCell:function(r,c){
			var gridPanel=document.getElementById("gridPanel");
			gridPanel.innerHTML=null;
			gridPanel.style.width=100*this.CN+16*(this.CN+1)+"px";
			gridPanel.style.height=100*this.RN+16*(this.RN+1)+"px";
				//debugger;
			var frag=document.createDocumentFragment();
			for (var i=0;i<r*c ;i++ ){
				var div=document.createElement("div");
				div.className="grid";
				frag.appendChild(div);
			}
			for (var j=0;j<r ;j++ ){
				for (var k=0;k<c ;k++ ){
					var div=document.createElement("div");
					div.id="c"+j+k; 
					div.className="cell";
					div.style.top=16+116*j+"px";
					div.style.left=16+116*k+"px";	
					frag.appendChild(div);
				}
			}
			gridPanel.appendChild(frag);
		},
		move:function(callback){
			var before=String(this.data);
			callback();
			var after=String(this.data);
			if (before!=after)
			{
				this.randomNum();//随机生成一个数
				//如果游戏结束
					//修改游戏状态为GAMEOVER
				this.isGameOver()&&(this.state=this.GAMEOVER);
				this.updataView();//更新页面
			}	
		},
		isGameOver:function(){
			for (var r=0;r<this.RN ;r++ ){
				for (var c=0;c<this.CN ;c++ ){
					if (this.data[r][c]==0){
						return false;
					}
					else if (r<this.RN-1&&this.data[r][c]==this.data[r+1][c]){
						return false;
					}
					else if (c<this.CN-1&&this.data[r][c]==this.data[r][c+1]){
						return false;
					}
				}
			}
			return true;
		},
		moveLeft:function(){//左移所有行
			//将data转为String，保存在before中
			//遍历data中每一行
			  //调用moveLeftInRow方法，传入r
			//将data转为String，保存在after中
			//如果before不等于after
			  //随机生成一个数
			  //更新页面
			  //debugger;
			this.move(function(){
				for (var r=0;r<this.RN ;r++ ){
				this.moveLeftInRow(r);}
			}.bind(this))
		},
		moveLeftInRow:function(r){//左移第r行
			//c从0开始，到<CN-1结束
			  //调用getNextInRow方法,传入参数r,c, 将返回值保存在变量nextc中
			  //如果nextc是-1,退出循环
			  //否则
				//如果r行c位置的值是0
				  //就将r行c位置的值替换为nextc位置的值
				  //将nextc位置的值置为0
				  //c留在原地
				//如果r行c位置的值等于r行nextc位置的值
				  //将r行c位置的值*2
				  //将nextc位置的值置为0
				  //debugger;
			for (var c=0;c<this.CN-1 ;c++ )
			{
				var nextc=this.getNextInRow(r,c);
				if(nextc==-1){
					break;
				}
				else{
					if (this.data[r][c]==0){
					this.data[r][c]=this.data[r][nextc];
					this.data[r][nextc]=0;
					c--;
					}
					else if(this.data[r][c]==this.data[r][nextc]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[r][nextc]=0;
					}
				}
			}
		},
		getNextInRow:function(r,c){
			//c+1
			//c<CN结束,c++ 
			  //如果r行c位置不是0
				//返回c
			//(遍历结束)
			//返回-1
			//debugger;
			for (c+=1;c<this.CN ;c++ ){
				if (this.data[r][c]!=0){
					return c;
				}
			}
			return -1;
		},
		moveRight:function(){//右移所有行
			//为data拍照保存在before
			//遍历data中每一行
			  //调用moveRightInRow右移第r行
			//(遍历后)
			//为data拍照保存在after
			//如果before!=after
			  //调用randomNum随机生成一个数
			  //更新页面
			this.move(function(){
				for (var r=0;r<this.RN ;r++ ){
				this.moveRightInRow(r);}
			}.bind(this))
		},
		moveRightInRow:function(r){//右移第r行
			//c从CN-1开始，到>0结束,c每次递减1
			  //调用getPrevInRow方法，查找r行c列前一个不为0的位置，保存在prevc中
			  //如果prevc等于-1，就退出循环
			  //否则
				//如果r行c位置的值为0
				  //将r行c位置的值替换为prevc位置的值
				  //将prevc位置的值置为0
				  //c留在原地
				//否则，如果r行c位置的值等于r行prevc位置的值
				  //将r行c位置的值*2
				  //将prevc位置的值置为0
			for (var c=this.CN-1;c>0 ;c--){
				var prevc=this.getPrevInRow(r,c);
				if(prevc==-1){
					break;
				}
				else{
					if (this.data[r][c]==0){
					this.data[r][c]=this.data[r][prevc];
					this.data[r][prevc]=0;
					c++;
					}
					else if(this.data[r][c]==this.data[r][prevc]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[r][prevc]=0;	
					}
				}
			}
		},
		getPrevInRow:function(r,c){
			//c-1
			//循环,c>=0,c每次递减1
			  //如果c位置的值不为0
				//返回c
			//(遍历结束)
			//返回-1
			for (c-=1;c>=0;c-- ){
				if (this.data[r][c]!=0){
					return c;
				}
			}
			return -1;
		},
		moveUp:function(){//上移所有行
		  //为data拍照保存在before中
		  //遍历data中每一列
			//调用moveUpInCol上移第c列
		  //为data拍照保存在after中
		  //如果before不等于after
			//随机生成数
			//更新页面
			this.move(function(){
				for (var c=0;c<this.CN ;c++ ){
				this.moveUpInCol(c);}
			}.bind(this))
		},
		moveUpInCol:function(c){//上移第c列
			//r从0开始,到r<RN-1结束，r每次递增1
			  //查找r行c列下方下一个不为0的位置nextr
			  //如果没找到,就退出循环
			  //否则  
				//如果r位置c列的值为0
				  //将nextr位置c列的值赋值给r位置
				  //将nextr位置c列置为0
				  //r留在原地
				//否则，如果r位置c列的值等于nextr位置的值          
			  //将r位置c列的值*2
				  //将nextr位置c列的值置为0
			for (var r=0;r<this.RN-1 ;r++ ){
				var nextr=this.getNextInCol(r,c);
				if(nextr==-1){
					break;
				}
				else{
					if (this.data[r][c]==0){
					this.data[r][c]=this.data[nextr][c];
					this.data[nextr][c]=0;
					r--;
					}
					else if(this.data[r][c]==this.data[nextr][c]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[nextr][c]=0;	
					}
				}
			}
		},
		getNextInCol:function(r,c){
			//r+1
			//循环，到<RN结束，r每次递增1
			  //如果r位置c列不等于0
				//返回r
			//(遍历结束)
			//返回-1
			for (r+=1;r<this.RN ;r++ ){
				if (this.data[r][c]!=0){
					return r;
				}
			}
			return -1;
		},
		moveDown:function(){//下移所有行
		  //为data拍照保存在before中
		  //遍历data中每一列
			//调用moveDownInCol下移第c列
		  //为data拍照保存在after中
		  //如果before不等于after
			//随机生成数
			//更新页面
			this.move(function(){
				for (var c=0;c<this.CN ;c++ ){
				this.moveDownInCol(c);}
			}.bind(this))
		},
		moveDownInCol:function(c){//下移第c列
			//r从RN-1开始，到r>0结束，r每次递减1
			  //查找r位置c列上方前一个不为0的位置prevr
			  //如果没找到,就退出循环
			  //否则  
				//如果r位置c列的值为0
				  //将prevr位置c列的值赋值给r位置
				  //将prevr位置c列置为0
				  //r留在原地
				//否则，如果r位置c列的值等于prevr位置的值
				  //将r位置c列的值*2
				  //将prevr位置c列置为0
			for (var r=this.RN-1;r>0 ;r-- ){
				var prevr=this.getPrevInCol(r,c);
				if(prevr==-1){
					break;
				}
				else{
					if (this.data[r][c]==0){
					this.data[r][c]=this.data[prevr][c];
					this.data[prevr][c]=0;
					r++;
					}
					else if(this.data[r][c]==this.data[prevr][c]){
					this.data[r][c]*=2;
					this.score+=this.data[r][c];
					this.data[prevr][c]=0;	
					}
				}
			}
		},
		getPrevInCol:function(r,c){
			//r-1
			//循环，r到>=0结束，每次递减1
			  //如果r位置c列不等于0
				//返回r
			//(遍历结束)
			//返回-1
			for (r-=1;r>=0;r--){
				if (this.data[r][c]!=0){
					return r;
				}
			}
			return -1;
		},
		updataView:function(){//刷新页面
			//遍历data中每个元素
				//找到页面中id为"c"+r+c的div
				//var div=document.getElementById("c"+r+c);

				//如果当前元素不是0
					//设置div的内容为当前元素值
					//设置div的className为"cell n"+当前元素值
				//否则
					//设置div内容为""
					//设置div的className为"cell"
			for (var r=0;r<this.RN ;r++ ){
				for (var c=0;c<this.CN ;c++ ){
					//debugger;
					var div=document.getElementById("c"+r+c);
					if (this.data[r][c]!="0"){
						div.innerHTML=this.data[r][c];
						div.className="cell n"+this.data[r][c];
					}
					else{
						div.innerHTML="";
						div.className="cell";
					}
				}
			}
			document.getElementById("score").innerHTML=this.score;
			//如果游戏状态为结束
			if(this.state==this.GAMEOVER){
				//找到id为gameover的元素，设置其显示
				document.getElementById("gameover")
								.style.display="block";
				//找到id为fscore的元素，设置其内容为score
				document.getElementById("fscore")
								.innerHTML=this.score;
			}else{
				//找到id为gameover的元素，设置其隐藏
				document.getElementById("gameover")
								.style.display="none";
			}
		},
		randomNum:function(){//产生随机数
			//反复
			//在0~RN-1之间生成一个随机数r
			//在0~CN-1之间生成一个随机数c
			//如果data中r行c列的值为0
				//设置data中r行c列的值为：
					//随机生成一个0~1的小数，如果<0.5就赋值为2，否则赋值为4
					//退出循环
				while (1){
					var r=parseInt(Math.random()*(this.RN));
					var c=parseInt(Math.random()*(this.CN));
					if (this.data[r][c]==0){
						this.data[r][c]=Math.random()<0.5?2:4;
						break;
					}
				}
		}
}
//game.start();
