import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getTreeStump(scene, renderer, camera){
    objLoader.load("./assets/treestump/tree.obj", function(object){

        let texture = new THREE.TextureLoader().load( './assets/treestump/w3.jpg' );
        let material = new THREE.MeshBasicMaterial( { map: texture } );
            
        for(let o of object.children){
            o.material = material
        }
        
        object.position.set(-600, 28, -200)
        object.scale.set(10, 10, 10)
        object.name = "treestump"
        scene.add(object)
        renderer.render(scene, camera)
    })
}