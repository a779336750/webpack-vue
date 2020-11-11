// 建立了场景
import * as THREE from './three.module';

// 新建渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染尺寸
renderer.setSize(window.innerWidth, window.innerHeight);
// 插入dom中
document.body.appendChild(renderer.domElement);

// 创建摄像机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
// 设置摄像机位置
camera.position.set(0, 0, 100);
// 设置摄像机视线方向
camera.lookAt(0, 0, 0);

// 创建场景
const scene = new THREE.Scene();

// 创建材质
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

// 绘制线条的几何模型，创建多个定点，顶点连接之后形成一条线
const geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

// 根据几何模型，创建线条
const line = new THREE.Line(geometry, material);

export default function () {
    // 场景增加线条
    scene.add(line);
    // 渲染
    renderer.render(scene, camera);
};
