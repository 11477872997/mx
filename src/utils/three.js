import * as THREE from 'three';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { DragControls } from './DragControls'
/**
 *   加载单个fbx 模型
 * @param {*} path 背景路径
 * @returns 
 */
export const fbxloader = (path) => {
  return new Promise((resolve, reject) => {
    let loader = new FBXLoader();
    loader.load(path, (fbx) => {
      resolve(fbx)
    }, undefined, function (error) {
      reject(error)
    });
  });
}

/**
 * 创建场景
 */
export const initScene = () => {
  return new Promise((resolve, reject) => {
    let scene = new THREE.Scene();
    resolve(scene);
  });
}
/**
*  创建相机
* @param {*} fov  摄像机视锥体垂直视野角度
* @param {*} near  摄像机视锥体近端面
* @param {*} far   摄像机视锥体远端面
* @param {*} positionX   摄像机视角x
* @param {*} positionY   摄像机视角Y
* @param {*} positionZ   摄像机视角Z
*/
export const initCamera = (ojblist) => {
  return new Promise((resolve, reject) => {
    const camera = new THREE.PerspectiveCamera(ojblist.fov, window.innerWidth / window.innerHeight, ojblist.near, ojblist.far);
    camera.position.set(ojblist.positionX, ojblist.positionY, ojblist.positionZ);
    resolve(camera);
  });
}

/**
*  渲染器
* @param {*} dom  元素对象
* @returns 
*/
export const initRenderer = (dom) => {
  return new Promise((resolve, reject) => {
    //设置渲染器，并添加抗锯齿效果
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true, // 防止叠面闪烁问题
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.precision = 'mediump'
    dom.appendChild(renderer.domElement);
    resolve(renderer);
  });
}

/**
* 设置背景颜色
* @param {*} scene   场景对象
*/
export const setsTheBackgroundColor = (color) => {
  window.parameter.scene.background = new THREE.Color(color);
}

/**
* 网格线绘制
* @param {*} scene 场景对象
* @param {*} wdith  网格宽度
* @param {*} quantity  网格数量
* @param {*} centrecolor 网格中心线颜色
* @param {*} gridbg 网格颜色
*/
export const gridlineDrawing = (grid) => {
  removegridlineDrawing();
  let helper = new THREE.GridHelper(grid.wdith, grid.quantity, grid.centrecolor, grid.gridbg);
  window.parameter.scene.add(helper);
}
/**
 *  删除网格线
 * @param {*} scene 场景对象
 */
export const removegridlineDrawing = () => {
  var allChildren = window.parameter.scene.children;
  for (var i = allChildren.length - 1; i >= 0; i--) {
    if (allChildren[i] instanceof THREE.GridHelper) {
      window.parameter.scene.remove(allChildren[i]);
    }
  }
}

/**
 *  聚光灯
 * @param {*} bg 
 * @returns 
 */
export const initLight = (bg) => {
  return new Promise((resolve, reject) => {
    const light = new THREE.SpotLight(bg);
    window.parameter.scene.add(light);
    resolve(light)
  })
}

/**
 *  环境光
 * @param {*} bg 
 * @returns 
 */
export const initAmbientLight = (bg) => {
  return new Promise((resolve, reject) => {
    var ambientLight = new THREE.AmbientLight(bg);
    window.parameter.scene.add(ambientLight);
    resolve(ambientLight)
  })
}

/**
*  添加鼠标控制器
* @returns 
*/
export const inOrbitControls = () => {
  return new Promise((resolve, reject) => {
    const controls = new OrbitControls(window.parameter.camera, window.parameter.renderer.domElement);
    resolve(controls);
  });
}
/**
*  添加平移控件
* @returns 
*/
export const inTransformControls = () => {
  return new Promise((resolve, reject) => {
    const transformControls = new TransformControls(window.parameter.camera, window.parameter.renderer.domElement);
    window.parameter.scene.add(transformControls);
    resolve(transformControls);
  });
}
/**
*   创建一个模型会被用于拖拽的组
* @returns 
*/
export const inDragMeshList = () => {
  return new Promise((resolve, reject) => {
    const dragMeshList = new THREE.Group();
    dragMeshList.name = 'dragMeshList'
    window.parameter.scene.add(dragMeshList);
    resolve(dragMeshList);
  });
}
/**
*  导出
* @param {*} parameter 
*/
export const onexport = (parameter) => {
  var canvas = parameter.renderer.domElement;
  var renderer = new THREE.WebGLRenderer({ canvas: canvas });
  // 将renderer设置为高分辨率
  renderer.setPixelRatio(window.devicePixelRatio);
  // 禁用反锯齿设置
  renderer.antialias = false;
  // 尝试使用更高的渲染分辨率
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(parameter.scene, parameter.camera);
  var imgData = canvas.toDataURL('image/png');
  var link = document.createElement('a');
  link.download = 'myImage.png';
  link.href = imgData;
  link.click();
}



/**
 * 
 */
export const dragOpen = (mode) => {
  window.parameter.transformControls.setMode(mode);

  if (!window.parameter.dragControls) { // 初始化拖拽控件
    window.parameter.dragControls = new DragControls(window.parameter.dragMeshList.children, window.parameter.camera, window.parameter.renderer.domElement);
  }
  window.parameter.dragControls.activate() // 拖拽开启，实例化的时候默认开启的，这里意在关闭后重新打开
  window.parameter.dragControls.addEventListener('hoveron', dragAddEventAttach); // 监听鼠标进入能拖拽的模型时立即绑定该模型

  window.parameter.transformControls.addEventListener('mouseDown', transformControlsMouseDown); // 拖拽中
  window.parameter.transformControls.addEventListener('mouseUp', transformControlsMouseUp); // 拖拽中
}

/**
* 关闭模型拖拽
*/
export const dragClose = () => {
  window.parameter.dragControls.removeEventListener('hoveron', dragAddEventAttach);// 监听鼠标进入能拖拽的模型时立即绑定该模型
  window.parameter.transformControls.detach(); // 取消绑定的模型
  window.parameter.dragControls.deactivate() // 关闭拖拽功能

  window.parameter.transformControls.removeEventListener('mouseDown', transformControlsMouseDown); // 拖拽中
  window.parameter.transformControls.removeEventListener('mouseUp', transformControlsMouseUp); // 拖拽中
}
// 监听鼠标进入能拖拽的模型时立即绑定该模型
const dragAddEventAttach = (event) => {
  window.parameter.transformControls.attach(event.object);
}
const transformControlsMouseDown = () => {
  window.parameter.controls.enabled = false
}
const transformControlsMouseUp = () => {
  window.parameter.controls.enabled = true
}

