import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getTree(scene, renderer, camera){
    mtlLoader.load("./assets/tree/Tree.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/tree/Tree.obj", function(object){
             
            let i = 0
            for(let o of object.children){
                let c = new THREE.Color()
                // this tree has only two objects, the trunk and the leaves
                if (i===0){
                    // brown
                    c.setHex(0xA52A2A)
                } else {
                    // green
                    c.setHex(0x00FF00)
                }
                o.material = new THREE.MeshPhongMaterial({
                    color: c
                })
                i++
            }
            
            object.position.set(-400, 0, -400)
            object.scale.set(100, 100, 100)
            object.name = "tree"
            scene.add(object)
            renderer.render(scene, camera)
        })
    })
}