
/**
 * 
 * @param {*} path  字符串路径  例如 ‘/src/assets/fbximg/universalwheel.png’
 * @returns 
 */
export const  getFileName = (path) =>{
    const parts = path.split('/');
    return parts[parts.length - 1];
  }
/**
 * 
 * @param
 * @returns  读取文件图片
 */
export const  getfile = () =>{
    let list = [];
    const files = import.meta.globEager( `@/assets/fbximg/*.png`);
    Object.keys(files).forEach((fileName) => {
        const name = fileName.replace(/\.\/|\.ts/g, '');
        list.push({
            fileName:  getFileName(name),
            cameraDistance: 30
        });
    });
    return list;
  }

  /**
 *  assets 文件夹
 * @param {*} name  路径名称 文件夹加上图片路径
 */
export const getImgSrc  = (name) =>{
    return new URL(`../assets/${ name }`, import.meta.url).href;
}