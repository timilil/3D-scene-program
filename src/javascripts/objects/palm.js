import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getPalm(scene, renderer, camera){
    mtlLoader.load("./assets/palm/Palm_01.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/palm/Palm_01.obj", function(object){

            //let texture = new THREE.TextureLoader().load( './assets/VL1X8_002.png' );
            //let material = new THREE.MeshBasicMaterial( { map: texture } );
             
            for(let o of object.children){
                let c = new THREE.Color()
                c.setHex(0x00FF00)
                o.material = new THREE.MeshPhongMaterial({
                    color: c
                })
                //o.material = material
            }
            
            object.position.set(-300, 0, -300)
            object.scale.set(8, 8, 8)
            scene.add(object)
            
            // generate n amount of objects inside a circle
            /*let cx = 400;
            let cz = 100;
            let radius = 100
            let objectCount = 10
            for (let i=0; i<objectCount; i++){
                
                let angle = Math.random()*Math.PI*2;
                
                let x = cx + Math.cos(angle)*radius;
                let z = cz+ Math.sin(angle)*radius;
                
                object.position.set(x,0,z)
                object.scale.set(8, 8, 8)
                scene.add(object)
            }*/
            renderer.render(scene, camera)
        })
    })
}