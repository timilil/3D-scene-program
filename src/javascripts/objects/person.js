import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getPerson(scene, renderer, camera){
    objLoader.load("./assets/person/1.obj", function(object){

        let texture = new THREE.TextureLoader().load( './assets/person/20110809023200406316.jpg' );
        let material = new THREE.MeshBasicMaterial( { map: texture } );      
    
        for(let o of object.children){
            o.material = material
        }
        
        object.position.set(-130, 0, 180)
        object.rotateY(1.5)
        object.scale.set(3.3, 3.3, 3.3)
        scene.add(object)
        renderer.render(scene, camera)
    })
}