import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getDrone(scene, renderer, camera){
    
    mtlLoader.load("./assets/drone/drone_costum.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/drone/drone_costum.obj", function(object){

            object.position.set(-100, 82, 350)
            object.scale.set(6, 6, 6)
            object.name = "drone"
            scene.add(object)
            renderer.render(scene, camera)
        })
    })

}