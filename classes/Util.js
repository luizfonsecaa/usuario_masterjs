class Util{
    static onload(){
        Util.dateTeste();
    }
    static dateFormat(date){
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    }
    static dateTeste(){
        console.log('carreguei solo2');
    }
}
document.onload = Util.onload();