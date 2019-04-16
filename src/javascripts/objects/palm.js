import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getPalm(scene, renderer, camera){
    mtlLoader.load("./assets/palm/Palm_01.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/palm/Palm_01.obj", function(object){
             
            for(let o of object.children){
                let c = new THREE.Color()
                c.setHex(0x00FF00)
                o.material = new THREE.MeshPhongMaterial({
                    color: c
                })
            }
            
            object.position.set(-200, 0, -300)
            object.scale.set(8, 8, 8)
            object.name = "palm"
            scene.add(object)
            
            // generate n amount of objects inside a circle
            let cx = -200;
            let cz = -300;
            let radius = 100
            let objectCount = 6
            for (let i=0; i<objectCount; i++){
                let clonedObj = object.clone()
                
                let angle = Math.random()*Math.PI*2;
                
                let x = cx + Math.cos(angle)*radius;
                let z = cz+ Math.sin(angle)*radius;
                
                clonedObj.position.set(x,0,z)
                clonedObj.scale.set(8, 8, 8)
                clonedObj.name = "palm"
                scene.add(clonedObj)
            }
            renderer.render(scene, camera)
        })
    })
}