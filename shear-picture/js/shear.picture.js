function Picture(size,onOK,onCancel) {
	
	var _left,_top,_width,_height;
	
	var div = document.createElement("div");
	div.className = 'cj-mask';
	div.innerHTML = '<div class="show-img">' +
		'<img id="tulip" src="" alt="" width="300">' +
		'<canvas id="myCanvas"></canvas>' +
		'<div id="show-content"></div>'+
		'</div>' +
		'<div class="portrait-footer">' +
		'<div class="fbt-cancel">取消</div>' +
		'<div class="fbt-ok">确定</div>' +
		'</div>';
		
	document.body.appendChild(div);

	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var img = new Image();
	//取消
	document.querySelector('.fbt-cancel').onclick = function() {
		document.querySelector('.cj-mask').style.display = 'none';
		onCancel('cancel')
	}
	//确定
	document.querySelector('.fbt-ok').onclick = function() {
		document.querySelector('.cj-mask').style.display = 'none';
		
		//清空画布
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//填充画布
		ctx.drawImage(img, _left, _top, _width, _height);
		
		document.querySelector('.my-img').src = canvas.toDataURL("image/png");
		onOK(canvas.toDataURL("image/png"))
	}

	document.querySelector('.selImg').onchange = function(e) {
		var reader = new FileReader();
		// 调用readAsDataURL函数在后台开始读取文件的操作。当整个图片文件被全部加载完后，他们被转换成了一个被传递到onload回调函数的data:URL
		reader.readAsDataURL(this.files[0]);
		reader.onload = function(e) {
			var dataURL = reader.result;
			
			
			var dataLength=dataURL.length;
			var fileLength=parseInt(dataLength-(dataLength/8)*2);
			
			console.log(fileLength/1024/1024)
			if(fileLength/1024/1024>size){
				alert(`图片不得大于${size}M`);
				return false;
			}
			
			
			document.querySelector('#tulip').src = dataURL;
			document.querySelector('.cj-mask').style.display = 'block';

			document.querySelector('#tulip').onload = function() {
				
				var imgW = document.querySelector('#tulip').width;
				var imgH = document.querySelector('#tulip').height;
				
				var left, top;
				// 图片高>图片宽
				if (imgH > imgW) {
					// 画布宽高=图片宽
					canvas.width = imgW;
					canvas.height = imgW;
					document.querySelector('#show-content').style.width=`${imgW}px`;
					document.querySelector('#show-content').style.height=`${imgW}px`;
					left = 0;
					top = (imgH - imgW) / 2;
				} else {
					// 画布宽高=图片高
					canvas.width = imgH;
					canvas.height = imgH;
					document.querySelector('#show-content').style.width=`${imgH}px`;
					document.querySelector('#show-content').style.height=`${imgH}px`;
					left = (imgW - imgH) / 2;
					top = 0;
				}
				// document.querySelector('#myCanvas').style.left = left + 'px';
				// document.querySelector('#myCanvas').style.top = top + 'px';
				document.querySelector('#show-content').style.left = `${left}px`;
				document.querySelector('#show-content').style.top = `${top}px`;
				
				document.querySelector('#show-content').style.background=`url(${dataURL})`;
				
				document.querySelector('#show-content').style.backgroundSize=`${imgW}px`;
				
				document.querySelector('#show-content').style.backgroundPosition=`-${left}px -${top}px`;
				
				_left=-left;
				_top=-top;
				_width=imgW;
				_height=imgH;
				
				img.src = dataURL;
				
// 				img.onload = function() {
// 					ctx.drawImage(img, -left, -top, imgW, imgH);
// 				}
			}

		}
	}

	var _x_start, _y_start, _x_move, _y_move, _x_end, _y_end, left_start, top_start;

	if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
		//按下
		document.getElementById("show-content").addEventListener("touchstart", function(e) {
			_x_start = e.touches[0].pageX; //起始点击位置
			_y_start = e.touches[0].pageY; //起始点击位置
			left_start = document.querySelector('#show-content').style.left; //元素左边距
			top_start = document.querySelector('#show-content').style.top; //元素上边距
		});
		//移动
		document.getElementById("show-content").addEventListener("touchmove", function(e) {
			e.preventDefault(); //取消事件的默认动作。
			_x_move = e.touches[0].pageX; //当前屏幕上所有触摸点的集合列表
			_y_move = e.touches[0].pageY; //当前屏幕上所有触摸点的集合列表
			
			var left = (parseFloat(_x_move) - parseFloat(_x_start) + parseFloat(left_start)) < 0 ? 0 : (parseFloat(_x_move) -
				parseFloat(_x_start) + parseFloat(left_start));
			var top = (parseFloat(_y_move) - parseFloat(_y_start) + parseFloat(top_start)) < 0 ? 0 : (parseFloat(_y_move) -
				parseFloat(_y_start) + parseFloat(top_start));
			var imgW = document.querySelector('#tulip').width; //图片宽
			var imgH = document.querySelector('#tulip').height; //图片高
			var canvasW = parseFloat(document.querySelector('#show-content').style.width); //画布宽
			var canvasH = parseFloat(document.querySelector('#show-content').style.height);//画布高
			// 当选择区超出右边
			if (left > imgW - canvasW) {
				left = imgW - canvasW;
			}
			// 当选择区超出下边
			if (top > imgH - canvasH) {
				top = imgH - canvasH;
			}
			document.getElementById("show-content").style.left = left + "px";
			document.getElementById("show-content").style.top = top + "px";
			document.querySelector('#show-content').style.backgroundPosition=`-${left}px -${top}px`;
			_left=-left;
			_top=-top;
			_width=imgW;
			_height=imgH;

			//清空画布
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
			//填充画布
			// ctx.drawImage(img, -left, -top, imgW, imgH);
		});
	} else {
		//按下
		document.getElementById("show-content").addEventListener("mousedown", function(e) {
			_x_start = e.clientX; //起始点击位置
			_y_start = e.clientY; //起始点击位置
			left_start = document.querySelector('#show-content').style.left; //元素左边距
			top_start = document.querySelector('#show-content').style.top; //元素上边距
			
			//移动
			// document.getElementById("myCanvas").addEventListener("mousemove ", function(e) {
				document.onmousemove= function(e){
					e.preventDefault(); //取消事件的默认动作。
					_x_move = e.clientX; //当前屏幕上所有触摸点的集合列表
					_y_move = e.clientY; //当前屏幕上所有触摸点的集合列表
					var left = (parseFloat(_x_move) - parseFloat(_x_start) + parseFloat(left_start)) < 0 ? 0 : (parseFloat(_x_move) -
						parseFloat(_x_start) + parseFloat(left_start));
					var top = (parseFloat(_y_move) - parseFloat(_y_start) + parseFloat(top_start)) < 0 ? 0 : (parseFloat(_y_move) -
						parseFloat(_y_start) + parseFloat(top_start));
					var imgW = document.querySelector('#tulip').width; //图片宽
					var imgH = document.querySelector('#tulip').height; //图片高
					
					var canvasW = parseFloat(document.querySelector('#show-content').style.width); //画布宽
					var canvasH = parseFloat(document.querySelector('#show-content').style.height);//画布高
					// 当选择区超出右边
					if (left > imgW - canvasW) {
						left = imgW - canvasW;
					}
					// 当选择区超出下边
					if (top > imgH - canvasH) {
						top = imgH - canvasH;
					}
					document.getElementById("show-content").style.left = left + "px";
					document.getElementById("show-content").style.top = top + "px";
					document.querySelector('#show-content').style.backgroundPosition=`-${left}px -${top}px`;	
					_left=-left;
					_top=-top;
					_width=imgW;
					_height=imgH;
					//清空画布
					// ctx.clearRect(0, 0, canvas.width, canvas.height);
					//填充画布
					// ctx.drawImage(img, -left, -top, imgW, imgH);
				}
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				}
		});
	}
}
