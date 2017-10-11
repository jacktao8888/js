/*obj = {
		type:'post',
		url :'demo.php',
		data :{
			'username':'feifei',
			'age':18
		},
		success :function(data){
		}
}*/
var $ = {
	ajax : function (obj){

		// 创建
		var xhr = new XMLHttpRequest();

		// 如果传递过来是get的话
		if(obj.type == 'get' || obj.type == 'GET'){
			// 重组url
			obj.url = obj.url + '?' + this.params(obj.data);
			// 将数据设置成null
			obj.data = null;
		}else{
			// 因为data默认传递过来的对象，需要转成字符串形式的数据
			obj.data = this.params(obj.data);
		}
		// 打开
		xhr.open(obj.type,obj.url);

		// 设置
		if(obj.type == 'post' || obj.type =='POST'){
			xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		}
		// 在发送之前调用
		obj.beforeSend && obj.beforeSend();

		// 发送
		xhr.send(obj.data);

		// 监听
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 ){
				if(xhr.status == 200){
					var data = xhr.responseText;
					// callback有 然后在去调用
					obj.success && obj.success(data);
					/*if(callback){
						callback();
					}*/
				}else{
					obj.error && obj.error(xhr.status);
				}
				obj.complete && obj.complete();
			}
		}
	},
	// 这个方法是将对象转成成字符串
	params : function (obj){
		/*{'username':'feifei','age':18} =>'username=feifei&age=18'*/
		var str = '';
		for(var attr in obj){
			str += attr + '=' + obj[attr] + '&';
		}
		return str.slice(0,-1);
	}
}
