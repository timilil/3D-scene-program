import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getSleepingBag(scene, renderer, camera){
    mtlLoader.load("./assets/sleepingbag/10532_Sleeping_Bag_Unrolled_V1_L3.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/sleepingbag/10532_Sleeping_Bag_Unrolled_V1_L3.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/sleepingbag/Sleeping_Bag_Unrolled_V1_SG_Diffuse.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(100, 0, 400)
            object.rotateX(-Math.PI/2)
            object.scale.set(1, 1, 1)
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}