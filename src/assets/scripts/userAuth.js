let VirtualUser = {
   userAuth: "",
   userName: "",
   userPassword:"",
   userPhoto:""
};


// let games = readVirtualUserLocal('Games');



const readVirtualUserLocal=(name)=>{
   const user= JSON.parse(localStorage.getItem(name));
   return user;
 }
 
const writeVirtualUserLocal=(userData, name)=>{
 localStorage.setItem(name,JSON.stringify(userData));
}
 
 const delVirtualUserLocal=(name)=>{
   localStorage.removeItem(name);
 }

 console.log(readVirtualUserLocal("virtualUser"));  

 if (readVirtualUserLocal("virtualUser")){
   VirtualUser=readVirtualUserLocal("virtualUser");    
 }else VirtualUser.userAuth=false;