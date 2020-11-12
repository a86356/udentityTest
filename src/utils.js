
export function setCache(key,value){
    localStorage.setItem(key,value)
}

export function getCache(key){

    let list=  localStorage.getItem(key)
    if(list){
        return JSON.parse(list);
    }
    return [];
}
export function getCnTime(){
    var time = new Date();
    let y = time.getFullYear(); //获取完整的年份(4位,1970-???)
    let m = time.getMonth(); //获取当前月份(0-11,0代表1月)
    let d = time.getDate(); //获取当前日(1-31)
    let h = time.getHours(); //获取当前小时数(0-23)
    let minutes = time.getMinutes(); //获取当前分钟数(0-59)
    let s = time.getSeconds(); //获取当前秒数(0-59)
    return y+"-"+m+"-"+d+" "+h+":"+minutes+":"+s

}

