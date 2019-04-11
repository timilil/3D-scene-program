import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getBeachTowels(scene, renderer, camera){
    mtlLoader.load("./assets/beachtowels/13519_Beach_Towels_v2_L2.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/beachtowels/13519_Beach_Towels_v2_L2.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/beachtowels/Beach_Towels_diffuse.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-410, 0, 400)
            object.rotateX(-Math.PI/2)
            object.scale.set(1, 1, 1)
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
    
}