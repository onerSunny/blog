var express = require('express');
var router = express.Router();
const db=require('../model/db.js');
const ObjectId=require('mongodb').ObjectId;
global.uname='';
// 加载静态资源
router.use(express.static('./static'));

// var cookieParser=require('cookie-arser');
// var session=require('express-session');
// var session=require('session');

// router.get('/',function(req,res){
//     if(req.session.sign){
//         console.log(req.session);
//         res.send("welcome"+req.session.name+'欢迎你再次登录');
//     }else{
//         req.session.sign=true;
//         req.session.name='首页';
//         res.end('欢迎登录');
//     }
// });

// 首页
router.get('/', function(req, res, next) {
	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";
 
	MongoClient.connect(url, function(err, db) {
    	if (err) throw err;
    	var dbo = db.db("wxy");  //数据库名称
    	dbo.collection("blog"). find({"type":"index"}).toArray(function(err, result) { // 返回集合中所有数据
        	if (err) throw err;
        	res.render('index', {title:result});
        	db.close();
    	});
	});
});

// 慢生活
router.get('/life', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wxy");  //数据库名称
        dbo.collection("blog"). find({"type":"life"}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            res.render('life', {title:result});
            db.close();
        });
    });
});

// 慢生活->旅行路上
router.get('/travel', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wxy");  //数据库名称
        dbo.collection("blog"). find({"type":"travel"}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            // console.log(result);
            res.render('travel', {title:result});
            db.close();
        });
    });
});

// 关于我
router.get('/about_me',function(req,res,next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    if(!uname){
        res.redirect(`/showLogin`)
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("wxy");  //数据库名称
            dbo.collection("user"). find({"username":uname}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                res.render('about_me', {uname:uname,title:result});
                db.close();
            });
        });
    }
})

//关于我-> 更新update()
router.post('/addAbout',(req,res)=>{
    var obj = {};
    obj={$set:req.body};
    // obj是一个对象
    db.update('wxy','user',{"username":uname},obj,(err,result)=>{
        res.set("Content-Type","text/plain");
        // 重定向
        res.redirect('/about_me');
    })
})

// 发表文章
router.get('/article',function(req,res,next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    if(!uname){
        res.redirect(`/showLogin`)
    }else{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("wxy");  //数据库名称
            dbo.collection("blog"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                res.render('article', {uname:uname,title:result});
                db.close();
            });
        });
    }
})

// 发表文章-> 发表
router.post('/addArticle',(req,res)=>{
    var obj = {};
    obj=req.body;
    obj.type="article";
    db.insert('wxy','blog',obj,(err,result)=>{
        res.set("Content-Type","text/plain");
        // 重定向：点击发表文章，数据插入数据库的同时，路由跳转到find_manage，去到article_manage页面
        res.redirect('/findArticle');
        res.end();
    })
})

// 我的文章
router.get('/findArticle',(req,res)=>{
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wxy");  //数据库名称
        dbo.collection("blog"). find({"type":"article"}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            res.render('my_article', {title:result});
            db.close();
        });
    });
})

// 我的文章-> 删除
router.get('/delArticle',(req,res)=>{
    var index=req.query.index;
    var obj={"_id":new ObjectId(index)};
    db.delete('wxy','blog',obj,(err,result)=>{
        res.set("Content-Type","text/plain");
        console.log(result);
        res.end(JSON.stringify(result));
    })
})

// 留言板
router.get('/message_board', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wxy");  //数据库名称
        dbo.collection("comment"). find({}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            res.render('message_board', {title:result});
            db.close();
        });
    });
});

// 留言板-> 刷新 find()
router.get('/getList',(req,res)=>{  
    var obj={};
    db.find('wxy','comment',obj,(err,result)=>{
        res.set("Content-Type","text/plain");
        res.end(JSON.stringify(result));
    })
})

// 留言板-> 插入insert()
router.get('/addList',(req,res)=>{
    var obj = {};
    obj.con=req.query.con;
    // obj是一个对象
    db.insert('wxy','comment',obj,(err,result)=>{
        res.set("Content-Type","text/plain");
        res.end(JSON.stringify(obj));
    })
})

// 留言板-> 删除delete()
router.get('/delList',(req,res)=>{
    var index=req.query.index;
    var obj={"_id":new ObjectId(index)};
    db.delete('wxy','comment',obj,(err,result)=>{
        res.set("Content-Type","text/plain");
        res.end(JSON.stringify(result));
    })
})

// 注册
router.get('/showRegister', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("wxy");  //数据库名称
        dbo.collection("user").find({"username":req.body.username}).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            else if(result.length>0){
                res.end(JSON.stringify(result));
            }else{
                var name=req.body.username;
                var pass=req.body.password;
                dbo.collection("user").insert({"username":name,"password":pass});
                res.end(JSON.stringify(result));
            }
            db.close();
        });
    });
});

// 登录
router.get('/showLogin', function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res, next) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017";

    MongoClient.connect(url,function(err,db) {
        uname=req.body.username;
        if(err) throw err;
        var dbo = db.db("wxy");
        dbo.collection("user").find({"username":req.body.username}).toArray(function(err,result) {
            if (err) throw err;
            else if(result.length>0){
                res.end(JSON.stringify(result));
            }else{
                res.end(JSON.stringify(result));
            }
            db.close();
        })
    })
});


module.exports = router;
