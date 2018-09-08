class Util{
    static onload(){
     
    }
    static dateFormat(date){
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    }

}
document.onload = Util.onload();