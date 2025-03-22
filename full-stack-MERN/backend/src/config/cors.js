const domainsEnables = [process.env.FRONT_URL,undefined]

export const corsOptios ={
origin:function(origin,callback){
    if(domainsEnables.indexOf(origin) !== -1)
    {
        callback(null,true)
    }else{
        callback(new Error('Denied access for cors'))
    }
}
}