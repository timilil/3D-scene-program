import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getCar(scene, renderer, camera){
    mtlLoader.load("./assets/car/dpv.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/car/dpv.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/car/Tex_0025_1.png' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-130, 0, 170)
            object.scale.set(1,1,1)
            object.name = "car"
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}