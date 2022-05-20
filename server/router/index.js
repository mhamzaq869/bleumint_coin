const express = require('express');
const app = express()
const router = express.Router();
const multer  = require('multer');
var upload = multer();
const User = require("../models/user_model");
// const TOKEN = require("./token");
// const Axios = require('axios');
// const fs = require('fs');
const config = require('../../config')
const {SignupUser, LoginUser, Upload_NID} = require('../controller/AuthController')
const fs = require('fs');
// const axios = require("axios");
// const multer = require('multer');

// const {registerUser, singinUser} = require('../controller/user_controller');
// var upload = multer();

// router.use('/users', adminusers);
// router.use('/customers', customer);
// router.use('/settings', settings);
router.post('/signup',SignupUser);
router.post('/login',LoginUser);
router.post('/upload-nid/:id', Upload_NID);
// router.post('/NIDupload', upload.single('front'), (req,res)=>{
//     // console.log(req.);
//     // console.log(req.body);
//     console.log("123123123")
//     console.log(req.file);
//     console.log(req.body);
//     console.log(req.body.user_mail);
//     if(req.file){
//         const filterfile = req.file;
//          path = 'upload/image/'  +  Date.now() + filterfile.originalname.replace(/(.*)([.][^.]*)/, function(a,b,c){return c});
//         try {
//             fs.writeFileSync(path, filterfile.buffer);
//             User.findOne({"email":req.body.user_mail}).then((user) => {
//                 console.log(user)
//                 console.log("find result ")
//                 if (user) {
//                    user.insertOne
//                     return res.send({"result" : "already exist"});
//                 }
        
               
//             });
            
//             // var user_mail = window.localStorage.getItem("user_data");
//             // console.log("user_mail");
//             // console.log(user_mail);
//             // let img_path = path.toString().replace("upload",config.baseUrl);
           
//             // axios.request(options).then(async function (response) {
//             //     const imageName = Date.now() + '.jpg'
//             //     await downloadImage(response.data.result[0]["url"], 'upload/filteredImage/'+imageName)
//             //     res.send(`/filteredImage/${imageName}`)
//             // }).catch(function (error) {
//             //     return res.send(error);
//             // });
//         } catch (err) {
//             return console.log(err);
//         }
//       }
  
//     // console.log(req.files);
//     // console.log(req.back);

// });


// router.post("/singin", (req,res) => {
//     console.log(req.body)
// });
// router.post("/register", (req,res) => {
//     console.log(req.body)
// });


// router.use("/register", registerUser);
// router.use("/singin", singinUser)



         
// async function downloadImage(url, filepath) {
//     const response = await Axios({
//         url,
//         method: 'GET',
//         responseType: 'stream'
//     });
//     return new Promise((resolve, reject) => {
//         response.data.pipe(fs.createWriteStream(filepath))
//             .on('error', reject)
//             .once('close', () => resolve(filepath)); 
//     });
//   }


//player 
// router.use("/profile",TOKEN.check_token,profile);
// router.use("/firstpage",TOKEN.check_token, firstpagedata);
// router.use("/players",TOKEN.check_token,netplay);
// router.use("/sports",TOKEN.check_token,SportsControl)

// router.use("/reports",TOKEN.check_token,ReportsModel);
// router.use("/Tools",TOKEN.check_token,Tools);
// router.use("/providermanager",TOKEN.check_token,ProviderManager);
// router.use("/netplay",TOKEN.check_token, netplay);
// router.use("/paymentGateWay",TOKEN.check_token,paymentGateWay);
// router.use("/gameprovider",TOKEN.check_token,GameProviders); 
// router.use("/revenue",TOKEN.check_token,revenueController);

// app.get('/file/download/:filename/:originalname' , function(req,res,next){ 
//   var filename = req.params.filename;
//   var originalname = req.params.originalname;
//   var directory = dl_dir.BASEURL + "/uploads/" + filename;
//   res.download(directory,originalname,'');
// })  

module.exports = router;