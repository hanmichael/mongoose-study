# mongoose-study
使用mongoose可以让我们更好使用mongodb数据库，而不需要写繁琐的业务逻辑。
##安装

> npm install mongoose


----------


##初始化使用
使用mongoose前，需安装node和mongodb，这里不讲node和mongodb的安装方法。

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    var db = mongoose.connection;
    mongoose.connect('mongodb://localhost/animal');
    db.on('error', console.error);
    db.once('open', function() {
       //这里建立模式和模型
    }


----------


##快速入门
在mongoose中，所有的数据都是一种模式，每个模式都映射到mongodb的集合，并且定义该集合文件结构。

    //这里建立一个动物的模式，所有动物都拥有这个模式下的所有属性
    var animalSchema = new Schema({
        name: String,
        age: Number,
    });

模型是我们从Schema中定义的一种多样化的构造函数，模型的实例可以使用很多操作，所有文档的创建和检索都是由模型来处理

    var animalMode = db.model('Animal', animalSchema);
    
模型的实例实质是文件，而我们可以很轻松创建、修改这种文件

    var cat = new animalMode({
        name: 'catName',
        age: '7',    //这里依然使用字符串，mongoose会自动转换类型
      });
    
    cat.save(function(err, thor) {
        if (err) return console.log(err);
        console.log(thor);
    });
    //或者可以使用create
    //cat.create(function(err, thor) {
    //    if (err) return console.log(err);
    //    console.log(thor);
    //});
    
    //执行查找
    animalMode.find(function(err, people){
        if(err) console.log(err);
        console.log(people);
    });
    //查找符合条件数据
    animalMode.findOne({title: 'catName'}, function(err, cat){
        if(err) console.log(err);
        console.log(cat);
    });


----------


##Schema
**数据类型**
这是Schema中所有的数据类型，包括mongoose自定的数据类型

 - [String][1]
 - [Number][2]
 - [Date][3]
 - [Buffer][4]
 - Boolean
 - Mixed
 - [ObjectId][5]
 - Array

每种数据类型的使用

    var animalMode = mongoose.model('Animal', schema);
    
    var cat = new animalMode;
    cat.name = 'Statue of Liberty'              //String
    cat.age = '7';                              //Number
    cat.updated = new Date;                     //Date
    cat.binary = new Buffer(0);                 //Buffer
    cat.living = false;                         //Boolean
    cat.mixed = { any: { thing: 'i want' } };   //Mixed              
    cat._someId = new mongoose.Types.ObjectId;  //ObjectId
    cat.ofString.push("strings!");              //Array

其中Mixed是mongoose自定义的一种混合类型，因为Mixed没有定义具体内容，可以用{}来使用，以下2种定义形式等价。

    var animalSchema = new Schema({any: {}});
    var animalSchema = new Schema({any: {Schema.Types.Mixed}});


----------
**自定义方法**

可以为Schema绑定方法

    var animalSchema = new Schema({
        name: String,
        age: Number,
    });
    
    animalSchema.methods.findSimilarTypes = function (cb) {
        return this.model('Animal').find({ name: this.name }, cb);
    }
    
    var animalMode = db.model('Animal', animalSchema);
    
    cat.findSimilarTypes(function(err, cat){
        if(err) console.log(err);
        console.log(cat);
    });
   
也可以为Schema添加静态方法

    animalSchema.statics.findByName = function (name, cb) {
        return this.find({ name: new RegExp(name, 'i') }, cb);
    }
    var animalMode = db.model('Animal', animalSchema);
    
    animalMode.findByName('catName', function (err, animals) {
        console.log(animals);
    });
    


----------
**索引**
我们可以为mongodb数据建立索引，mongodb支持二级索引，为了提高数据查找和定位，建立复合索引是必要的

    var animalSchema = new Schema({
      name: String,
      age: Number,
      tags: { age: [String], index: true } // field level
    });
    
    animalSchema.index({ name: 1, age: -1 }); // schema level

但是这种索引的建立可能导致显著的性能影响，建议在生产下停止，将设置模式下的自动索引设置为false禁止

    animalSchema.set('autoIndex', false);
    // or
    new Schema({..}, { autoIndex: false });

----------

##Model
###C
    cat.save(function(err, thor) {
        if (err) return console.log(err);
        console.log(thor);
    });
    //或者可以使用create
    cat.create(function(err, thor) {
        if (err) return console.log(err);
        console.log(thor);
    });

###R

    //查找所有数据
    animalMode.find(function(err, cat){
        if (err) console.log(err);
        console.log(cat);
    })
      
    //查找指定数据
    animalMode.findOne({name: 'catName'}, function(err, cat){
        if (err) console.log(err);
        console.log(cat);
    })

###U
官方文档提供的更新函数[Model.update][6]

    Model.update(conditions, doc, [options], [callback])

 - conditions   更新条件
 - doc  更新内容
 - option   更新选项
    -safe (boolean) 安全模式，默认选项，值为true
    -upsert (boolean) 条件不匹配时是否创建新文档，默认值为false
    -multi (boolean) 是否更新多个文件，默认值为false
    -strict (boolean) 严格模式，只更新一条数据
    -overwrite (boolean) 覆盖数据，默认为false
 - callback
    -err 更新数据出错时返回值
    -numberAffected （笔者暂时不清楚）
    -rawResponse 受影响的行数

   '''javascript
   animalMode.update({name: 'catName'}, {age: '6'}, {multi : true}, function(err, numberAffected, raw){
    if (err) return console.log(err);
    console.log('The number of updated documents was %d', numberAffected);
    console.log('The raw response from Mongo was ', raw);
  });
   '''

##资源推荐
[mongoosejs.com][7]



持续更新中...


  [1]: http://mongoosejs.com/docs/api.html#schema-string-js
  [2]: http://mongoosejs.com/docs/api.html#schema-number-js
  [3]: http://mongoosejs.com/docs/api.html#schema-date-js
  [4]: http://mongoosejs.com/docs/api.html#schema-buffer-js
  [5]: http://mongoosejs.com/docs/api.html#schema-objectid-js
  [6]: http://mongoosejs.com/docs/api.html#model_Model.update
  [7]: http://mongoosejs.com/docs/guide.html