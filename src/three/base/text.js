// 建立了场景
import * as THREE from './three.module';

const loader = new THREE.FontLoader();

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

export default function () {
    loader.load('./font/helvetiker_regular.typeface.json', font => {
        const geometry = new THREE.TextGeometry('hello', {
            font,
            size: 80,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelSize: 8,
            bevelSegments: 5,
        });
        const material = new THREE.MeshBasicMaterial({ color: '#fff' });
        const cube = new THREE.Mesh(geometry, material);
        // 场景增加线条
        scene.add(cube);
        // 渲染
        renderer.render(scene, camera);
    });
};
