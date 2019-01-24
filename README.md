# shear-picture
裁剪图片保存为base64,可用于头像上传


使用方法
1.首先加载插件，需要用到的文件有shear.picture.js和shear.picture.css文件。

<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="css/shear.picture.css">
    <script src="js/shear.picture.js"></script>
</head>
<body>
    ...
</body>
</html>

2.HTML内容。

<div class="head-img">
  <!-- 显示图片的容器 -->
  <img class="my-img">
  <!-- 选择图片 -->
  <input type="file" class="selImg" accept="image/*" multiple="">
</div>

3.调用Picture
<script>
Picture(function(e){
  //点击确定后的回调函数
  console.log(e)
}, function(e) {
  //点击取消后的回调函数
  console.log(e)
})
</script>
