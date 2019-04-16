import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getGrass(scene, renderer, camera){
    mtlLoader.load("./assets/grass/10438_Circular_Grass_Patch_v1_iterations-2.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/grass/10438_Circular_Grass_Patch_v1_iterations-2.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/grass/10438_Circular_Grass_Patch_v1_Diffuse.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-25, -36, 0)
            object.rotateX(-Math.PI/2)
            object.scale.set(4, 4, 4)
            object.name = "grass"
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}