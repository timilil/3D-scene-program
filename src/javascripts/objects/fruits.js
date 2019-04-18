import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getFruits(scene, renderer, camera){
    mtlLoader.load("./assets/fruits/apple.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/fruits/apple.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/fruits/fin.jpg' )
            let texture2 = new THREE.TextureLoader().load( './assets/fruits/colormap 2.jpg' )
            
            for(let o of object.children){
                if(o.name === "subd"){
                    let material = new THREE.MeshBasicMaterial( { map: texture2 } )
                    o.material = material
                } else {
                    let material = new THREE.MeshBasicMaterial( { map: texture } )
                    o.material = material
                }
            }
            
            object.position.set(-100, 80, 450)
            object.scale.set(0.5, 0.5, 0.5)
            object.name = "fruits"
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}