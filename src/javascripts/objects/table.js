import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getTable(scene, renderer, camera){
    mtlLoader.load("./assets/table/Outdoor Furniture_02_obj.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/table/Outdoor Furniture_02_obj.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/treestump/w3.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-100, 5, 420)
            object.scale.set(2.5, 2.5, 2.5)
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
    
}