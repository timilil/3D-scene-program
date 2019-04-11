import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getLogs(scene, renderer, camera){
    mtlLoader.load("./assets/treelogs/Logs.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/treelogs/Logs.obj", function(object){
             
            let texture = new THREE.TextureLoader().load( './assets/treestump/w3.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-600, 0, -100)
            object.scale.set(.5, 2, 2)
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}