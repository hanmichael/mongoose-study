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

// animalSchema.methods.findSimilarTypes = function (cb) {
//   return this.model('Animal').find({ name: this.name }, cb);
// }
// animalSchema.statics.findByName = function (name, cb) {
//   return this.find({ name: new RegExp(name, 'i') }, cb);
// }
  // //创建自定义模式文档方法
  // movieSchema.methods.findTypes(function(cb){
  //   return this.model('movieMode').find({title: this.title}, cb);
  // }); 

  var animalMode = db.model('Animal', animalSchema);

  // animalMode.findByName('catName', function (err, animals) {
  //   console.log(animals);
  // });


  // var cat = new animalMode({
  //   name: 'catName',
  //   age: '7',    //这里依然使用字符串，mongoose会自动转换类型
  // });

  // cat.save(function(err, thor) {
  //   if (err) return console.log(err);
  //   //console.log(thor);
  // });

  // animalMode.find(function(err, cat){
  //   if (err) console.log(err);
  //   console.log(cat);
  // })
  // animalMode.findOne({name: 'catName'}, function(err, cat){
  //   if (err) console.log(err);
  //   console.log(cat);
  // });
  
  // animalMode.update({name: 'catName'}, {age: '6'}, {multi : true}, function(err, numberAffected, raw){
  //   if (err) return console.log(err);
  //   console.log('The number of updated documents was %d', numberAffected);
  //   console.log('The raw response from Mongo was ', raw);
  // });
  
  // animalMode.remove({age: 6}, function(err){
  //   if (err) console.log(err);
  // })

  // animalMode.find(function(err, cat){
  //   if (err) console.log(err);
  //   console.log(cat);
  // })

  // animalMode.findById(id, function(err, adventure){
  //   if (err) consoel.log(err);
  //   console.log(adventure);
  // });
  
  // animalMode.where('age', '2').exec(function(err, cat){
  //   if (err) console.log(err);
  //   console.log(cat);
  // });

  // animalMode
  //   .where('age').gte(1).lte(10)
  //   .where('name', 'catName')
  //   .exec(function(err, cat){
  //     if (err) console.log(err);
  //     console.log(cat);
  //   });

  animalMode.count({age: 2}, function(err, cat){
    if (err) console.log(err);
    console.log(cat);
  })

  // animalMode.findOne({name: 'catName'}, function(err, cat){
  //   if (err) console.log(err);
  //   console.log(cat);
  // });

  // cat.findSimilarTypes(function(err, cat){
  //   if(err) console.log(err);
  //   console.log(cat);
  // });

  //查找符合条件数据
  // movieMode.findOne({title: 'Thor1'}, function(err, movie){
  //   if(err) console.log(err);
  //   console.log(movie);
  // });

  //查找所有数据
  // animalMode.find(function(err, people){
  //   if(err) console.log(err);
  //   console.log(people);
  // });

  // movieEntity.findTypes(function(err, movies) {
  //   if (err) return console.error(err);
  //   console.log(movies);
  // });

});

