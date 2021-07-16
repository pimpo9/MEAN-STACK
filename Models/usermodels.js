
var db=require('./conn')
var datetime = require('node-datetime')

function usersinfo(tbl_nm,cb)
{
   
db.collection(tbl_nm).find().toArray(function(err,result){
    if(err)
    conosle.log(err)
    else
    cb(result)
    })
}


function login(tbl_nm,data,cb)
{
 
db.collection(tbl_nm).find({'email':data.email,'pass':data.pass,'status':'1'}).toArray(function(err,result)
{
    console.log(result)
    if(err)
    console.log(err)
    else
    cb(result)

})
}


function register(tbl_nm,data,cb)
{
  data.id=datetime.create()._created
 db.collection(tbl_nm).insert(data,function(err,result){
    if(err)
        console.log(err)
    else
        cb(result)	

})
}

function changepass(tbl_nm,d,r,cb)
{
db.collection(tbl_nm).update({'email':r,'pass':d.old},{$set:{'pass':d.new}},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}


function blockunblock(tbl_nm,d,cb)
{
db.collection(tbl_nm).update({'email':d.email},{$set:{'status':d.status}},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function verifypost(tbl_nm,d,cb)
{
db.collection(tbl_nm).update({'id':parseInt(d)},{$set:{'vstatus':'1'}},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function updatecat(tbl_nm,d,cat_imagenm,cb)
{
db.collection(tbl_nm).update({'cat_id':parseInt(d.cat_id)},{$set:{'cat_name':d.cat_name,'cat_image':cat_imagenm}},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function updatesubcat(tbl_nm,d,cat_imagenm,cb)
{
db.collection(tbl_nm).update({'subcat_id':parseInt(d.subcat_id)},{$set:{'subcat_name':d.subcat_name,'cat_name':d.cat_name,'subcat_image':cat_imagenm}},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}



function deleteuser(tbl_nm,d,cb)
{
  

db.collection(tbl_nm).remove({'email':d},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function deletecat(tbl_nm,d,cb)
{
db.collection(tbl_nm).remove({'cat_name':d},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}


function deletesubcat(tbl_nm,d,cb)
{
db.collection(tbl_nm).remove({'subcat_name':d},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})

}

function deletepost(tbl_nm,d,cb)
{
db.collection(tbl_nm).remove({'id':parseInt(d)},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function deletevpost(tbl_nm,d,cb)
{
db.collection(tbl_nm).remove({'id':parseInt(d)},function(err,result)
{
    console.log(result)
    if(err)
    console.log(err)
    else
    cb(result)
})
}


function addcategory(tbl_nm,cat_name,cat_imagenm,cb)
{

db.collection(tbl_nm).insert({'cat_id':datetime.create()._created,'cat_name':cat_name,'cat_image':cat_imagenm},function(err,result){
    if(err)
        console.log(err)
    else
        cb(result)	

})

}

function addsubcategory(tbl_nm,data,subcat_imagenm,cb)
{

db.collection(tbl_nm).insert({'subcat_id':datetime.create()._created,'subcat_name':data.subcat_name,'cat_name':data.cat_name,'subcat_image':subcat_imagenm},
function(err,result){
    if(err)
    console.log(err)
    else
    cb(result)
})
}


function fetchall(tbl_nm,cb)
{
   
 db.collection(tbl_nm).find({},function(err,result)
{result.toArray(function(err,result)
{
    if(err)
    conosle.log(err)
    else
    cb(result)
    })
})
}

function fetchall1(tbl_nm,cb)
{
   
db.collection(tbl_nm).find({},function(err,result){result.toArray(function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
})
}

function fetchall2(tbl_nm,cb)
{
   
db.collection(tbl_nm).find({'vstatus':'0'}).toArray(function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function fetchall3(tbl_nm,cb)
{
   
db.collection(tbl_nm).find({'vstatus':'1'}).toArray(function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function fetchall4(tbl_nm,d,cb)
{
   
db.collection(tbl_nm).find({'id':parseInt(d)}).toArray(function(err,result)
{
    console.log(result)
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function viewsubcat(tbl_nm,cat_name,cb)
{
db.collection(tbl_nm).find({'cat_name':cat_name}).toArray(function(err,result)
{

    if(err)
    console.log(err)
    else
    cb(result)

})

}

function viewpost(tbl_nm,data,cb)
{
db.collection(tbl_nm).find({'cat_nm':data.cat_nm}).toArray(function(err,result)
{

    if(err)
    console.log(err)
    else
    cb(result)

})
}

function viewpostcf(tbl_nm,data,cb)
{
    db.collection(tbl_nm).find({'cat_nm':data.cat_nm,'city':data.city}).toArray(function(err,result)
    {
    
        if(err)
        console.log(err)
        else
        cb(result)
    
    })
}



function viewpost1(tbl_nm,data,sprice,eprice,cb)
{
db.collection(tbl_nm).find({$and:[{'cat_nm':data.cat_nm},{'price': {$gt:sprice, $lt:eprice}}]}).toArray(function(err,result)

{
    console.log(result)
    if(err)
    console.log(err)
    else
    cb(result)

})
}

function addpost(data,myimg1_nm,myimg2_nm,myimg3_nm,cb)
{

  db.collection("addpost").insert({'id':datetime.create()._created,'title':data.title,'cat_nm':data.cat_nm,'description':data.description,'price':data.price,
'myimage1':myimg1_nm,'myimage2':myimg2_nm,'myimage3':myimg3_nm,'address':data.address,'email':data.email,
'mob':data.mob,'city':data.city,'vstatus':'0','ustatus':'0'},function(err,result){
    if(err)
    console.log(err)
    else
    cb(result)
})
}
/*
module.exports={updatecat:updatecat,viewpost:viewpost,viewpost1:viewpost1,addpost:addpost,viewsubcat:viewsubcat,fetchall1:fetchall1,deletesubcat:deletesubcat,fetchall:fetchall,deletecat:deletecat
    ,managecategory:managecategory,addcategory:addcategory,addsubcategory:addsubcategory,deleteuser:deleteuser
    ,blockunblock:blockunblock,register:register,login:login,usersinfo:usersinfo}*/

    module.exports={register:register,login:login,addcategory:addcategory,usersinfo:usersinfo,deleteuser:deleteuser,
        deletecat:deletecat,fetchall:fetchall,addsubcategory:addsubcategory,fetchall1:fetchall1,deletesubcat:deletesubcat,
    addpost:addpost,viewsubcat:viewsubcat,blockunblock:blockunblock,viewpost:viewpost,viewpost1:viewpost1,viewpostcf:viewpostcf,fetchall2:fetchall2,
    fetchall3:fetchall3,deletepost:deletepost,verifypost:verifypost,deletevpost:deletevpost,updatecat:updatecat,
    updatesubcat:updatesubcat,changepass:changepass,fetchall4:fetchall4
}
