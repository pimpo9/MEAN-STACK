var db=require("./conn")
var datetime = require('node-datetime')

function fetchall(tbl_nm,data,cb)
{
   
db.collection(tbl_nm).find({'email':data}).toArray(function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function fetchall1(tbl_nm,data,cb)
{
   
db.collection(tbl_nm).find({'email':data}).toArray(function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function updateprofile(tbl_nm,d,cb)
{
db.collection(tbl_nm).update({'email':d.email},{$set:{'nm':d.nm,'email':d.email,'ad':d.ad,'mob':d.mob,'city':d.city,'gender':d.gender}},function(err,result)
{
    if(err)
    console.log(err)
    else
    cb(result)
})
}

function addpost(data,myimg1_nm,myimg2_nm,myimg3_nm,cb)
{

  db.collection("addpost").insert({'title':data.title,'cat_nm':data.cat_nm,'description':data.description,'price':data.price,
'myimage1':myimg1_nm,'myimage2':myimg2_nm,'myimage3':myimg3_nm,'address':data.address,'email':data.email,
'mob':data.mob,'city':data.city,'vstatus':'0','ustatus':'1'},function(err,result){
    if(err)
    console.log(err)
    else
    cb(result)
})
}
module.exports={fetchall:fetchall,addpost:addpost,fetchall1:fetchall1,updateprofile:updateprofile}