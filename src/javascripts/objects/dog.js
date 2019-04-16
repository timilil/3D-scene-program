import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getDog(scene, renderer, camera){
    mtlLoader.load("./assets/dog/12228_Dog_v1_L2.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/dog/12228_Dog_v1_L2.obj", function(object){

            let texture = new THREE.TextureLoader().load( './assets/dog/Dog_diffuse.jpg' );
            let material = new THREE.MeshBasicMaterial( { map: texture } );
            
            for(let o of object.children){
                o.material = material
            }
            
            object.position.set(-130, 0, 170)
            object.rotateX(-Math.PI/2)
            object.rotateZ(Math.PI/2)
            object.scale.set(2, 2, 2)
            object.name = "dog"
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}