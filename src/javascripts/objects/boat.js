

import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getBoat(scene, renderer, camera){
    
    mtlLoader.load("./assets/boat/boat.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/boat/boat.obj", function(object){
             
            let i = 0
            for(let o of object.children){
                let c = new THREE.Color(0xFFFFFF)
                if(i===0) {
                    c.setHex(0xD3D3D3)
                } else {
                    c.setHex(0x654321)
                    o.rotateY(1.7)
                    o.translateX(-3)
                    o.translateY(-.15)
                    o.translateZ(-4.2)
                    o.rotateZ(.36)
                }
                o.material = new THREE.MeshLambertMaterial({
                    color: c
                })
                i++
            }
            
            object.position.set(650, -10, 400)
            object.scale.set(40, 40, 40)
            object.rotateY(-2)
            scene.add(object)

            renderer.render(scene, camera)
        })
    })
}