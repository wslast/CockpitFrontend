function getList(params){
    return new Promise((resolve, reject)=>{
        window.axios.formPost( "/api/auth/sysuser/doGetList",params).then(res=>{
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })
    
}
function addItem(params){
    return new Promise((resolve, reject)=>{
        window.axios.formPost( "/api/auth/sysuser/doSave",params).then(res=>{
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })
    
}
function deleteItem(params){
    return new Promise((resolve, reject)=>{
        window.axios.formPost( "/api/auth/sysuser/doDel",{id:params.id}).then(res=>{
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })
    
}
function editItem(params){
    return new Promise((resolve, reject)=>{
        window.axios.formPost( "/api/auth/sysuser/doMod",params).then(res=>{
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })

}
function getRoleListByUserId(params){
    return new Promise((resolve, reject)=>{
        window.axios.formPost( "/api/auth/sysrole/doGetListByUserId",params).then(res=>{
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })

}
function addUserRole(params){
    return new Promise((resolve, reject)=>{
        window.axios.formPost( "/api/auth/sysuserrole/doAddUserRole",params).then(res=>{
            resolve(res)
        }).catch(e => {
            reject(e)
        });
    })

}

function getLabelByCode(code, enums) {
    for(const obj of enums) {
        if (code == obj.code) {
            return obj.label;
        }
    }
    return '';
}
export {
    getList,
    deleteItem,
    addItem,
    editItem,
    getRoleListByUserId,
    addUserRole,
    getLabelByCode
}