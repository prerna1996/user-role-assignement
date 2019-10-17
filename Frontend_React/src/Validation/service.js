
const service = {
    validateString: function(name){
            if (name.length <=5) {
               return false; 
        }
        else{
            return true; 
        }
},

validateEmail:function(number){
if (!number.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
return false
}
else{
    return true;
}
}

}
export default service;