
var express = require('express');
var app = express();
var fs = require('fs');
var swig = require('swig');
var bodyParser = require('body-parser');
//上传
var multer  = require('multer');


var picData = {
	'keyboard':{
		src:'images/1keyboard.jpg',
		title:'Start Your Imaginations',
		texts:'Phoenix is an SVG based instrument, meaning all icons are sharp and look awesome everywhere.A combination of the unique layout and material design best practices is what the Phoenix loved for.' 
	},
	'quality':{
		src:'images/2quality.jpg',
		title:'Elegant Style',
		texts:'He knew now that it was his own will to happiness which must make the next move. But if he was to do so, he realized that he must come to terms with time, that to have time was at once the most magnificent.' 
	},
	'journey':{
		src:'images/3journey.jpg',
		title:'Journey Begin Here',
		texts:'Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit.' 
	},
	'watch':{
		src:'images/4watch.jpg',
		title:'Soft materials',
		texts:'Warm genuine leather straps from local supplier comes in two colors: dark and brown. Highly protected glass gives water resistance up to 30 meters.A sophisticated watch by Simpl Watch, which incorporates perfect functionality while maintaining a stylish appearance. Your watch now represents your individuality.' 
	},
	'phone':{
		src:'images/5phone.jpg',
		title:'Your time is unique',
		texts:'We are always happy to help you with installing, optimising and promoting your portfolio. All incoming features and updates are also included in the pack.We are always happy to help you with installing, optimising and promoting your portfolio.' 
	},
	'view':{
		src:'images/8view.jpg',
		title:'We Proudly Present',
		texts:'You were put on this earth to achieve your greatest self, to live out your purpose, and to do it courageously and simple.Who can know the joy and pain of a power if he has the hermetic attitude of the saint.' 
	},
	'boost':{
		src:'images/10-boost.jpg',
		title:'Impressive Bass Boost',
		texts:'He knew now that it was his own will to happiness which must make the next move. But if he was to do so, he realized that he must come to terms with time, that to have time was at once the most magnificent.' 
	},
	'music':{
		src:'images/6music.jpg',
		title:'Profect Sound',
		texts:'Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit.' 
	}
	
	
}

var responseData;

app.use(function(req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
})

//设置静态文件资源的托管
app.use('/public', express.static('public'));

//定义项目模板引擎
app.engine('html', swig.renderFile);
//设置模板存放目录
app.set('views', './views');
//把模板引擎注册到app中
app.set('view engine', 'html');
//开发模式下，设置不缓存
swig.setDefaults({
    cache: false
});

//设置解析post数据的中间件
app.use(bodyParser.urlencoded({ extended: true }));




app.post('/index', function(req, res, next) {
    //console.log(req.body);

    for (var attr in picData) {
        if (attr == req.body.picName) {
            responseData.data = picData[attr];
            res.send(responseData);
            return;
        }
    }
    responseData.code = 3;
    responseData.message = '无此数据';
    res.send(responseData);

})


app.listen(8888);