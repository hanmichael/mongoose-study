# mongoose-study
使用mongoose可以让我们更好使用mongodb数据库，而不需要写繁琐的业务逻辑。
##安装

> npm install mongoose

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
    
    //执行查找
    animalMode.find(function(err, people){
        if(err) console.log(err);
        console.log(people);
    });