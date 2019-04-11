import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getBeachUmbrella(scene, renderer, camera){
    mtlLoader.load("./assets/beachumbrella/12984_beach_umbrella_v1_L2.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/beachumbrella/12984_beach_umbrella_v1_L2.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/beachumbrella/12984_beach-umbrella_diffuse.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-400, 0, 400)
            object.rotateX(-Math.PI/2)
            object.scale.set(1.5, 1.5, 1.5)
            scene.add(object)
            renderer.render(scene, camera)
        })
    })

}