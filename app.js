var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/animal');

db.on('error', console.error);
db.once('open', function() {
  //在这里创建你的模式和模型
  var animalSchema = new Schema({
    name: String,
    age: Number,
  });

  // //创建自定义模式文档方法
  // movieSchema.methods.findTypes(function(cb){
  //   return this.model('movieMode').find({title: this.title}, cb);
  // }); 

  var animalMode = db.model('Animal', animalSchema);


  var cat = new animalMode({
    name: 'catName',
    age: '7',    //这里依然使用字符串，mongoose会自动转换类型
  });

  cat.save(function(err, thor) {
    if (err) return console.log(err);
    console.log(thor);
  });

  //查找符合条件数据
  // movieMode.findOne({title: 'Thor1'}, function(err, movie){
  //   if(err) console.log(err);
  //   console.log(movie);
  // });

  //查找所有数据
  animalMode.find(function(err, people){
    if(err) console.log(err);
    console.log(people);
  });

  // movieEntity.findTypes(function(err, movies) {
  //   if (err) return console.error(err);
  //   console.log(movies);
  // });

});

