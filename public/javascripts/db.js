var MongoClient=require('mongodb').MongoClient;
var url="mongodb://127.0.0.1:27017/";
function _connect(callback){
	MongoClient.connect(url,function(err,db){
		if(err) throw err;
		callback(err,db);
		db.close();
	})
}

// 查找
exports.find=function(dbase,collectionName,myobj,callback){
	_connect(function(a,db){
		// db代表查找数据库
		db.db(dbase).collection(collectionName).find(myobj).toArray(function(err,result){
			if(err) throw err;
			console.log("文档查找成功");
			callback(err,result);
			db.close();
		})
	})
}

// 插入
exports.insert=function(dbase,collectionName,myobj,callback){
	_connect(function(a,db){
		db.db(dbase).collection(collectionName).insertOne(myobj,function(err,result){
			if(err) throw err;
			console.log("文档插入成功");
			callback(err,result);
			db.close();
		})
	})
}

// 删除
exports.delete=function(dbase,collectionName,myobj,callback){
	_connect(function(a,db){
		db.db(dbase).collection(collectionName).deleteOne(myobj,function(err,result){
			if(err) throw err;
			console.log("文档删除成功");
			callback(err,result);
			db.close();
		})
	})
}
