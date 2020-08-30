/**
 * @typedef Info 
 * @property {number} id 
 * @property {string} type 
 * @property {string} principal 
 * @property {string} location 
 * @property {string} link 
 * @property {string} description 
**/


/**
 * 
 * @param {Info} info 
 */
export async function addInfo(info){
    return await fetch('/infos', {
        method:'POST',
        headers:{
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(info)
    }).then(x=>x.json())
}


export async function listInfo(){
    return await fetch('/infos').then(x=>x.json())
}