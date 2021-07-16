var express = require('express');
var router = express.Router();
var registermodel=require('../models/registermodel')
var usermodels=require('../models/usermodels')


var d1=''
usermodels.fetchall1('subcategory',function(result)
{
   d1=result
})



router.use(function(req,res,next){
  if(req.session.unm==undefined || req.session.role=='admin' )
  {
    res.redirect('/login')
  }
  else
  next()

})

/* GET users listing. */
router.get('/', function(req, res, next) {

  registermodel.fetchall('addpost',req.session.unm,function(result)
  {
  res.render('userhome',{'userdetails':req.session.unm,'result':result});
});
})


router.all('/updateprofile', function(req, res, next) {
if(req.method=='GET')
{ 
  var d=req.session.unm
registermodel.fetchall1('register',d,function(result)
  {
res.render('updateprofile',{'result':result,'title':''})
})
}
else
{
  var data=req.body
  console.log(data)
registermodel.updateprofile('register',data,function(result)
  {
    if(result)
  res.redirect('/users/updateprofile')
  else
  console.log(hiiii)
})
}
})


router.all('/raddpost', function(req, res, next) {
  if(req.method=='GET')
  res.render('raddpost', {'title':'','subcatlist':d1 });
  else
  {
   
      var d4=req.files.myimg1
      var d2=req.files.myimg2
      var d3=req.files.myimg3
      if(d4==undefined)
      {
       var myimg1_nm='dummy.jpg'
      }
      else
      {
        var myimg1_nm=d4.name
       var despath=path.join(__dirname,'../public/uploads',myimg1_nm)
      d4.mv(despath)
      }
     
      if(d2==undefined)
      {
       var myimg2_nm='dummy.jpg'
      }
      else
      {
        var myimg2_nm=d2.name
       var despath=path.join(__dirname,'../public/uploads',myimg2_nm)
      d2.mv(despath)
      }
     
      if(d3==undefined)
      {
       var myimg3_nm='dummy.jpg'
      }
      else
      {
        var myimg3_nm=d3.name
       var despath=path.join(__dirname,'../public/uploads',myimg3_nm)
      d3.mv(despath)
      }
     
     registermodel.addpost(req.body,myimg1_nm,myimg2_nm,myimg3_nm,function(result)
     {
       if(result)
       res.render('raddpost',{'title':'Post uploaded, wait for verification','subcatlist':d1});
      else
       res.render('raddpost',{'title':'Post not uploaded, try again','subcatlist':d1});	   	 
     
     
     })
    }

})

router.all('/changepass', function(req, res, next) {
  if(req.method=="GET")
  res.render('changepassu',{title:''}) 
else
{
  var data=req.body
  var r=req.session.unm
  if(data.new==data.reconfirm)
  {
  usermodels.changepass('register',data,r,function(result){
    if(result.result.nModified>0)
     res.render('changepassu',{title:'added succcessfully....'})
     else
     res.render('changepassu',{title:'fail!!!',})
   })
  }
  else
  res.render('changepassu',{title:'incorrect old password'})
}



})


module.exports = router;
