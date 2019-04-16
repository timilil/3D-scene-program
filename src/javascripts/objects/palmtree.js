import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'

let mtlLoader = new MTLLoader()
let objLoader = new OBJLoader()

export function getPalmTree(scene, renderer, camera){
    
    mtlLoader.load("./assets/palmtree/10446_Palm_Tree_v1_max2010_iteration-2.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/palmtree/10446_Palm_Tree_v1_max2010_iteration-2.obj", function(object){
             
            new THREE.TextureLoader().load('./assets/palmtree/10446_Palm_Tree_v1_Diffuse.jpg', function(texture){
                let material = new THREE.MeshBasicMaterial( { map: texture } );
             
                for(let o of object.children){
                    o.material = material
                }
                
                object.position.set(100, 0, -400)
                object.scale.set(.5, .5, .5)
                object.rotateX(-(Math.PI/2))
                object.name = "palmtree"
                scene.add(object)

                let clonedObject = object.clone()
                clonedObject.position.set(-300, 0, 300)
                clonedObject.scale.set(.5, .5, .5)
                clonedObject.name = "palmtree"
                scene.add(clonedObject)

                let clonedObject2 = object.clone()
                clonedObject2.position.set(-500, 0, 200)
                clonedObject2.scale.set(.4, .4, .4)
                clonedObject2.name = "palmtree"
                scene.add(clonedObject2)

                renderer.render(scene, camera)
            });
        })
    })

}