const crypto = require('crypto');
crypto.DEFAULT_ENCODING = 'hex';


module.exports ={

hashPassword:function(password)
{
    if(password){
        const key = crypto.pbkdf2Sync(password,'bestsalteverbypratik', 20000,32,'sha256');
        console.log(key);  
        return(key);
    }
    else{
        return(password);
    }

},
isEmpty:function(obj) 
{
    return Object.keys(obj).length === 0;
},
}