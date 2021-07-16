var express = require('express');
var url = require('url');
var path = require('path');
var router = express.Router();
var usermodels=require('../models/usermodels')
var datetime = require('node-datetime')

var dt = datetime.create();
var formatted = dt.format('m/d/Y H:M:S');
console.log(formatted)
console.log(dt)

router.use(function(req,res,next){
  if(req.session.unm==undefined || req.session.role=='user' )
  {
    res.redirect('/login')
  }
  next()

})

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
  usermodels.fetchall2('addpost',function(result)
  {
  res.render('adminhome',{'userdetails':req.session.unm,'result':result});
  })
});

router.get('/managepost', function(req, res, next) {
  usermodels.fetchall3('addpost',function(result)
{
  res.render('managepost',{'result':result});
})
});




router.get('/usersinfo', function(req, res, next) {
  usermodels.usersinfo('register',function(result){
   res.render('usersinfo',{'result': result })
})
});

router.get('/managecategory', function(req, res, next){
  usermodels.fetchall('addcategory',function(result)
  {
      
res.render('managecategory',{'result':result })
  })
});

router.get('/managesubcat', function(req, res, next) {
  usermodels.fetchall('subcategory',function(result)
  {
   res.render('managesubcat',{'result':result})
})
})

router.get('/blockunblock', function(req, res, next) {
var d=url.parse(req.url,true).query
  usermodels.blockunblock('register',d,function(result){
  res.redirect('/admin/usersinfo')
  })
});

router.get('/deleteuser', function(req, res, next) {
  var d=url.parse(req.url,true).query.email
    usermodels.deleteuser('register',d,function(result){
   res.redirect('/admin/usersinfo')
    })
  });

  router.get('/deletecat', function(req, res, next) {
   var d=url.parse(req.url,true).query.cat_name
usermodels.deletecat('addcategory',d,function(result){
      res.redirect('/admin/managecategory')
       })
    });

    router.all('/updatecat', function(req, res, next) {
      if(req.method=='GET')
      {
      var q=url.parse(req.url,true).query
  res.render('updatecat',{'title':'','result':q})
      }
else
{
var data= req.body
 var cat_image=req.files.cat_image
var ocat_imagenm=cat_image.name
 //var cat_imagenm=Date()+'-'+ocat_imagenm
  var despath=path.join(__dirname,'../public/uploads',ocat_imagenm)
 cat_image.mv(despath,function(err)
{
if(err)
res.render('updatecat',{'title':'fail!!!','result':""})
else
{
usermodels.updatecat('addcategory',data,ocat_imagenm,function(result){
 if(result)
 res.redirect('/admin/managecategory')
 // res.render('updatecat',{'title':'updated succcessfully....','result':""})
  else
  res.render('updatecat',{'title':'updation fail!!!','result':""})
})
}
})
}
      });

      router.all('/updatesubcat', function(req, res, next) {
        if(req.method=='GET')
        {
        var q=url.parse(req.url,true).query
    res.render('updatesubcat',{'title':'','result':q,'catlist':d})
        }
  else
  {
  var data=req.body
  console.log(req.files)

   var subcat_image=req.files.subcat_image
  var ocat_imagenm=subcat_image.name
  console.log(data)
   //var cat_imagenm=Date()+'-'+ocat_imagenm
    var despath=path.join(__dirname,'../public/uploads',ocat_imagenm)
   subcat_image.mv(despath,function(err)
  {
  if(err)
  res.render('updatesubcat',{'title':'fail!!!','result':"",'catlist':''})
  else
  {
  usermodels.updatesubcat('subcategory',data,ocat_imagenm,function(result){
   if(result)
   res.redirect('/admin/managesubcat')
   // res.render('updatecat',{'title':'updated succcessfully....','result':""})
    else
    res.render('updatesubcat',{'title':'updation fail!!!','result':"",'catlist':''})
  })
  }
  })
  }
        });

        router.get('/deletesubcat', function(req, res, next) {
      var d=url.parse(req.url,true).query.subcat_name
       usermodels.deletesubcat('subcategory',d,function(result){
        res.redirect('/admin/managesubcat')
        })
      });

    router.get('/deletepost', function(req, res, next) {
        var d=url.parse(req.url,true).query.id
         usermodels.deletepost('addpost',d,function(result){
          res.redirect('/admin')
          })
        });

        router.get('/deletevpost', function(req, res, next) {
          var d=url.parse(req.url,true).query.id
          console.log(d)
           usermodels.deletepost('addpost',d,function(result){
            res.redirect('/admin/managepost')
            })
          });
  

        router.get('/verifypost', function(req, res, next) {
          var d=url.parse(req.url,true).query.id
          console.log(d)
           usermodels.verifypost('addpost',d,function(result){
            res.redirect('/admin')
            })
          });
  





router.all('/addcategory', function(req, res, next) {
  if(req.method=="GET")
  res.render('addcategory',{Result:''});
  else
  {
 var cat_name= req.body.cat_name
 var cat_image=req.files.cat_image
var ocat_imagenm=cat_image.name
 //var cat_imagenm=Date()+'-'+ocat_imagenm
  var despath=path.join(__dirname,'../public/uploads',ocat_imagenm)
 cat_image.mv(despath,function(err)
{
if(err)
res.render('addcategory',{Result:'fail!!!'})
else
{
usermodels.addcategory('addcategory',cat_name,ocat_imagenm,function(result){
 if(result)
  res.render('addcategory',{Result:'added succcessfully....'})
  else
  res.render('addcategory',{Result:'fail!!!'})
})
}
})
}
});

router.all('/addsubcategory', function(req, res, next) {
  if(req.method=="GET")
  res.render('addsubcategory',{'title':'','catlist':d })
  else
  var data= req.body
  //var cat_name= req.body.cat_name
 var subcat_image=req.files.subcat_image
 var subcat_imagenm=subcat_image.name
 var despath=path.join(__dirname,'../public/uploads',subcat_imagenm)
 subcat_image.mv(despath,function(err)
{
if(err)
res.render('addsubcategory',{title:'fail!!!','catlist':d})

else
{
usermodels.addsubcategory('subcategory',data,subcat_imagenm,function(result){
 if(result)
  res.render('addsubcategory',{title:'added succcessfully....','catlist':d})
  else
  res.render('addsubcategory',{title:'fail!!!','catlist':d})
})
}
})
});

router.all('/changepass', function(req, res, next) {
  if(req.method=="GET")
  res.render('changepass',{title:''}) 
else
{
  var data=req.body
  var r=req.session.unm
  if(data.new==data.reconfirm)
  {
  usermodels.changepass('register',data,r,function(result){
    if(result.result.nModified>0)
     res.render('changepass',{title:'added succcessfully....'})
     else
     res.render('changepass',{title:'fail!!!',})
   })
  }
  else
  res.render('changepass',{title:'incorrect old password'})
}



})

  
module.exports = router;
