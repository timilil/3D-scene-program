import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getBackpack(scene, renderer, camera){
    mtlLoader.load("./assets/backpack/12305_backpack_v2_l3.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/backpack/12305_backpack_v2_l3.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/backpack/12305_Backpack_v1_diffuse.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(200, 0, 200)
            object.rotateX(-Math.PI/2)
            object.scale.set(2, 2, 2)
            object.name = "backpack"
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}