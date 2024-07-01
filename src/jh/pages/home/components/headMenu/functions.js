import axios from '@/data/fetchType';

function getList(params){
    return new Promise((resolve, reject)=>{
        axios.formPost("/api/biz/potal/potQuickMeun/doGetListNoPage",params).then(res=>{
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })
}

export{
    getList
}