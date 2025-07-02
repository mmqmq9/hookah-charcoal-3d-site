// إعداد المشهد والكاميرا
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf9f9f9);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(5,10,7);
scene.add(dirLight);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('charcoal-cube').appendChild(renderer.domElement);

// رأس الشيشة
const bowlGeometry = new THREE.CylinderGeometry(0.8, 1, 0.7, 32);
const bowlMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 });
const hookahBowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
hookahBowl.position.y = 0.35;
scene.add(hookahBowl);

const baseGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32);
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x3b2d16, roughness: 0.95 });
const hookahBase = new THREE.Mesh(baseGeometry, baseMaterial);
hookahBase.position.y = 0.1;
scene.add(hookahBase);

// تحميل نموذج الفحم
const loader = new THREE.GLTFLoader();
loader.load('models/charcoal_cube.glb', function(gltf) {
    const charcoal = gltf.scene;
    charcoal.scale.set(0.3,0.3,0.3);
    charcoal.position.y = 0.8;
    scene.add(charcoal);

    animate = function() {
        requestAnimationFrame(animate);
        hookahBowl.rotation.y += 0.005;
        hookahBase.rotation.y += 0.005;
        charcoal.rotation.y += 0.005;
        animateSmoke();
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function(error) {
    console.error("خطأ في تحميل الفحم:", error);
});

// دخان
const smokeParticles = [];
const smokeMaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load('assets/smoke.png'),
    transparent: true,
    opacity: 0.3
});

for (let i=0; i<50; i++) {
    const p = new THREE.Sprite(smokeMaterial);
    p.position.set((Math.random()-0.5)*0.3, 0.8, (Math.random()-0.5)*0.3);
    p.scale.set(0.2,0.2,0.2);
    scene.add(p);
    smokeParticles.push(p);
}

function animateSmoke() {
    for (let p of smokeParticles) {
        p.position.y += 0.002 + Math.random()*0.001;
        p.material.opacity -= 0.0005;
        if (p.material.opacity <= 0) {
            p.position.y = 0.8;
            p.material.opacity = 0.3;
        }
    }
}

// استجابة لتغيير حجم الشاشة
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// أزرار واتساب
function orderSample() {
    window.open("https://wa.me/967XXXXXXXXX?text=السلام عليكم، أود طلب عينة من الفحم الطبيعي للشيشة لمتجري في صنعاء.");
}
function askPrice() {
    window.open("https://wa.me/967XXXXXXXXX?text=السلام عليكم، أود معرفة أسعار الفحم الطبيعي للشيشة وخيارات التوصيل.");
}

// scrollToSection
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}