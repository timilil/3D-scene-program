import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getCampfire(scene, renderer, camera){
    mtlLoader.load("./assets/campfire/Campfire OBJ.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/campfire/Campfire OBJ.obj", function(object){
             
            let i = 0
            // remove unnecessary object
            object.remove(object.children[0])
            for(let o of object.children){
                if (i === 0) {
                    let texture = new THREE.TextureLoader().load( './images/army.jpg' );
                    let material = new THREE.MeshBasicMaterial( { map: texture } );
                    o.material = material
                    o.material.side = THREE.DoubleSide
                } else if (i === 1 || i === 2 || i === 3 || i === 4){
                    let c = new THREE.Color(0x191919)
                    o.material = new THREE.MeshPhongMaterial({
                        color: c,
                    })
                } else if (i === 5){
                    let texture = new THREE.TextureLoader().load( './assets/campfire/woodsground_diffuse.jpg' );
                    let material = new THREE.MeshBasicMaterial( { map: texture } );
                    o.material = material/*new THREE.MeshPhongMaterial({
                        color: c,
                        side: THREE.DoubleSide
                    })*/
                } else if (i === 6){
                    let texture = new THREE.TextureLoader().load( './images/rock1.jpg' );
                    let material = new THREE.MeshBasicMaterial( { map: texture } );
                    o.material = material
                } else if (i === 7){
                    //let c = new THREE.Color(0x2b1d0e)
                    let texture = new THREE.TextureLoader().load( './images/metal.jpg' );
                    let material = new THREE.MeshBasicMaterial( { map: texture } );
                    o.material = material
                } 
                i++
            }
            
            object.position.set(500, 0, -100)
            object.rotateY(-.5)
            object.scale.set(8, 8, 8)
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}