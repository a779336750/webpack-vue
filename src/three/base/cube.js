// 建立了场景
import * as THREE from './three.module';

const scene = new THREE.Scene();
// 建立摄像机，PerspectiveCamera为透视摄像机，第一个属性是视野角度（FOV）， 第二个值是长宽比（aspect ratio），接下来的两个值是远剪切面和近剪切面
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 创建渲染器
const renderer = new THREE.WebGLRenderer();
// 设置一个渲染器的大小尺寸，可以在调用setSize时，给updateStyle（第三个参数）传入false。以较低的分辨率来渲染
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个立方体，我们需要一个BoxGeometry（立方体）对象
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 对于这个立方体，我们需要给它一个材质，来让它有颜色
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 们需要一个Mesh（网格）。 网格是包含有一个几何体以及应用在在此几何体上的材质的对象，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const cube = new THREE.Mesh(geometry, material);
// 默认情况下，当我们调用scene.add()的时候，物体将会被添加到坐标为(0,0,0)的位置
scene.add(cube);
// 这可能会使得摄像机的位置和立方体相互重叠（也就是摄像机位于立方体中）。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可。
camera.position.z = 5;
// 设置一个动画循环
const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;

    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};
export default animate;
