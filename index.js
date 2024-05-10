const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const {User} = require('./model/User');
const mongoose = require("mongoose");
const config = require("./config/key");
//application/x-www-form-urlencoded 형식을 받는다
app.use(bodyParser.urlencoded({extended:true}));
//application/json 형식을 받는다
app.use(bodyParser.json());

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World! -- 안녕하세요111');
})

app.post('/register', (req, res) => {
    // 회원가입에 필요한 정보들을 클라이언트에서 가져오면 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
  
     //mongoDB 메서드, user모델에 저장
  const result =  user.save().then(()=>{
    res.status(200).json({
      success: true
    })
  }).catch((err)=>{
    res.json({ success: false, err })
  })
  /*
    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err});
      return res.status(200).json({
        success: true,
      });
    });*/
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})