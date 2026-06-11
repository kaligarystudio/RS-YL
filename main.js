import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

const scene = new THREE.Scene();

scene.background =
new THREE.Color(0x87CEEB);

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(
renderer.domElement
);

const light =
new THREE.DirectionalLight(
0xffffff,
2
);

light.position.set(
20,
20,
10
);

scene.add(light);

const ground =
new THREE.Mesh(

new THREE.PlaneGeometry(
200,
200
),

new THREE.MeshStandardMaterial({
color:0x4CAF50
})

);

ground.rotation.x =
-Math.PI/2;

scene.add(ground);

const horse =
new THREE.Mesh(

new THREE.BoxGeometry(
2,
1,
4
),

new THREE.MeshStandardMaterial({
color:0x8B4513
})

);

horse.position.y = 0.5;

scene.add(horse);

camera.position.set(
0,
8,
15
);

let piecesFound = 0;

const pieces = [];

for(let i=0;i<4;i++){

    const piece =
    new THREE.Mesh(

        new THREE.BoxGeometry(
            1,
            1,
            1
        ),

        new THREE.MeshStandardMaterial({
            color:0xFFD700
        })

    );

    piece.position.set(
        0,
        0.5,
        -20 - (i*20)
    );

    scene.add(piece);

    pieces.push(piece);
}

function updateProgress(){

document
.getElementById("progress")
.innerHTML =
`Piezas encontradas: ${piecesFound}/4`;

}

function showInvitation(){

document
.getElementById("invitation")
.style.display="flex";

}

function animate(){

requestAnimationFrame(
animate
);

horse.position.z -= 0.08;

camera.position.z =
horse.position.z + 15;

camera.position.x =
horse.position.x;

camera.lookAt(
horse.position
);

pieces.forEach(piece=>{

if(!piece.visible)
return;

const distance =
horse.position.distanceTo(
piece.position
);

if(distance < 3){

piece.visible=false;

piecesFound++;

updateProgress();

if(piecesFound===4){

showInvitation();

}

}

});

renderer.render(
scene,
camera
);

}

animate();
