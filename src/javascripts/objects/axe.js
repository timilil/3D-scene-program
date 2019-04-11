import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getAxe(scene, renderer, camera){
    mtlLoader.load("./assets/axe/12351_Axe_v3_l3.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/axe/12351_Axe_v3_l3.obj", function(object){
             
            let texture = new THREE.TextureLoader().load( './assets/axe/Axe_diffuse.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-565, 45, -200)
            object.rotateX(-1.5)
            object.rotateY(-0.8)
            object.scale.set(3, 3, 3)
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}