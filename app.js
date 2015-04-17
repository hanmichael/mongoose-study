var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  //在这里创建你的模式和模型
  var movieSchema = new Schema({
    title: {
      type: String
    },
    rating: String,
    releaseYear: Number,
    hasCreditCookie: Boolean
  });

  //创建自定义模式文档方法
  movieSchema.methods.findTypes(function(cb){
    return this.model('movieMode').find({title: this.title}, cb);
  }); 

  var movieMode = db.model('Movie', movieSchema);


  var movieEntity = new movieMode({
    title: 'Thor1',
    rating: 'PG-13',
    releaseYear: '2011', //注意我们在这里使用一个字符串而不是一个数字 -- Mongoose会为我们自动转换     
    hasCreditCookie: true
  });

  movieEntity.save(function(err, thor) {
    if (err) return console.log(err);
    //console.log(thor);
  });

  //查找符合条件数据
  // movieMode.findOne({title: 'Thor1'}, function(err, movie){
  //   if(err) console.log(err);
  //   console.log(movie);
  // });

  //查找所有数据
  // movieMode.find(function(err, movie){
  //   if(err) console.log(err);
  //   console.log(movie);
  // });

  movieEntity.findTypes(function(err, movies) {
    if (err) return console.error(err);
    console.log(movies);
  });

});

mongoose.connect('mongodb://localhost/test');