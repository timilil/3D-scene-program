import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getChair(scene, renderer, camera){
    objLoader.load("./assets/chair/chair.obj", function(object){

        let texture = new THREE.TextureLoader().load( './assets/chair/diffuse.jpg' );
        let material = new THREE.MeshBasicMaterial( { map: texture } );
            
        for(let o of object.children){
            o.material = material
        }
        
        object.position.set(-150, 35, 250)
        object.rotateY(-3)
        object.scale.set(4, 3.5, 4)
        object.name = "chair"
        scene.add(object)
        renderer.render(scene, camera)
    })
}