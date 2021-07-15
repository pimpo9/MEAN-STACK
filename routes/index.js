var express = require('express')
var url = require('url')
var path = require('path')
var usermodels=require('../models/usermodels')
var router = express.Router()
var mail= require('mail')


var d=''
usermodels.fetchall('addcategory',function(result)
{
   d=result
})

var d1=''
usermodels.fetchall1('subcategory',function(result)
{
   d1=result
})


router.get('/', function(req, res, next) {
   res.render('index', { 'result': d });
});

router.get('/home', function(req, res, next) {
  usermodels.fetchall('addcategory',function(result)
{
  res.render('index', { 'result': result});
})
});


router.get('/about', function(req, res, next) {
  res.cookie('username','admin')
  res.cookie('password','password')
  
  console.log(req.cookies)
  
  res.render('about',{'cdata':req.cookies});
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});
router.get('/services', function(req, res, next) {
  res.render('services', { title: 'Express' });
});
router.get('/logout', function(req, res, next) {
  req.session.destroy()
res.redirect('/login')//routing change
  //res.render('login', { Result: 'please login first' });//page is render routing does not change
  
});
router.all('/login', function(req, res, next) {
  if(req.method=='GET')
  res.render('login', { Result:'' });
else
var data=req.body //data is a object

usermodels.login('register',data,function(result)
{
if(result.length>0)//result is array of object
  {
    req.session.unm=data.email
    req.session.role=result[0].role
  if(result[0].role=='user')
    res.redirect('/users')
  else
  res.redirect('/admin')
  }
  else
    res.render('login',{Result:'invalid user detail or varification required'})

})

});



router.all('/register', function(req, res, next) {
  
  if(req.method=="GET")
  res.render('register',{Result:'' })
  else
  {
var data=req.body
usermodels.register('register',data,function(result)
{
  if(result)
  {
    res.render('register',{Result:'Registration done!!!'})
/*mail.sendmail(data,function(newresult){
  if(newresult)
    			res.render('register',{'result':'Registered successfully, Verify from your Inbox...'}); 
    	 })	*/

} 
else
  res.render('register',{Result:'Registration fail!!!'})
  
})
  }
})
router.get('/viewsubcat', function(req, res, next) {
  var data=url.parse(req.url,true).query
  usermodels.viewsubcat('subcategory',data.cat_name,function(result)
{
  if(result.length>0)
  {
  res.render('viewsubcat',{'result':result,'catlist':d });
  }
  else
  res.render('viewsubcat',{'result':'','catlist':d });
})
});

router.all('/singlepost', function(req, res, next) {
 var data=url.parse(req.url,true).query.id
usermodels.fetchall4('addpost',data,function(result)
{
 res.render('singlepost',{'result':result,'Result':''});
})
})
router.post('/logincheck', function(req, res, next) {
  var data=req.body //data is a object
console.log(data)
usermodels.login('register',data,function(result)
{
if(result.length>0)//result is array of object
  {
    
    res.redirect('/singlepost')
 
  }
  else
    res.render('singlepost',{})

})

});


router.all('/viewpost', function(req, res, next) {
  if(req.method=="GET")
  {
  var data=url.parse(req.url,true).query
  usermodels.viewpost('addpost',data,function(result)
{
  if(result.length>0)
  {
  res.render('viewpost',{'result':result, 'catlist':d1});
  }
  else
  res.render('viewsubcat',{'result':'','catlist':d1 })
})

  }
  else{
   var data=req.body
  
   if(data.sprice!=undefined)
   {
     var sprice=parseInt(data.sprice)
     var eprice=parseInt(data.eprice)
     
   usermodels.viewpost1('addpost',data,sprice,eprice,function(result)
  {
    if(result.length>0)
  {
  res.render('viewpost',{'result':result, 'catlist':d1});
  }
})
   }
   else
   {
    usermodels.viewpostcf('addpost',data,function(result)
    {
      if(result.length>0)
    {
    res.render('viewpost',{'result':result,'catlist':d1});
    }
     })
    }

   }
});


router.all('/addpost', function(req, res, next) {
  if(req.method=='GET')
  res.render('addpost', {'title':'','subcatlist':d1 });
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
     
     usermodels.addpost(req.body,myimg1_nm,myimg2_nm,myimg3_nm,function(result)
     {
       if(result)
       res.render('addpost',{'title':'Post uploaded, wait for verification','subcatlist':d1});
      else
       res.render('addpost',{'title':'Post not uploaded, try again','subcatlist':d1});	   	 
     
     
     })
    }

})


module.exports = router
