import * as THREE from 'three'
window.THREE = THREE
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
let OrbitControls = require('threejs-controls/OrbitControls')

function getHouse(textureWood, textureHay){
    
    let houseGeometry = new THREE.Geometry();
    houseGeometry.materialParams = {}
    let house = new THREE.Mesh(houseGeometry)
    //house.materialParams = {}

    let material = new THREE.MeshPhongMaterial()
    // roof half
    let geometry = new THREE.BoxGeometry(400, 200, 10)
    //geometry = new THREE.CircleGeometry(600, 10)
    //material = new THREE.MeshBasicMaterial({ color: 0x0000FF})
    let roof1 = new THREE.Mesh(geometry, material)
    roof1.material.side = THREE.DoubleSide;
    roof1.material.map = textureHay
    roof1.name = "roofHalf1"
    roof1.translateY(200)
    roof1.translateZ(-90)
    roof1.rotateX(1.0)

    // roof other half
    let roof2 = new THREE.Mesh(geometry, material)
    roof2.material.side = THREE.DoubleSide;
    roof2.material.map = textureHay
    roof2.name = "roofHalf2"
    roof2.translateY(200)
    roof2.translateZ(90)
    roof2.rotateX(-1.0)

    geometry = new THREE.CylinderGeometry( 10, 10, 400, 32 );
    let roofLog = new THREE.Mesh(geometry, material);
    roofLog.material.map = textureWood
    roofLog.name = "roofLog"
    roofLog.translateY(255)
    roofLog.rotateZ(Math.PI/2)
    
    house.add(roof1)
    house.add(roof2)
    house.add(roofLog)

    for(let i=0; i<4; i++) {
        geometry = new THREE.BoxGeometry(10, 160, 10)
        let pillar = new THREE.Mesh(geometry, material)
        pillar.material.map = textureWood
        pillar.name = "housePillar"
        pillar.translateY(80)
        
        if(i==0){
            pillar.translateX(-180)
            pillar.translateZ(-150)
        } else if(i==1) {
            pillar.translateX(180)
            pillar.translateZ(-150)
        } else if(i==2) {
            pillar.translateX(-180)
            pillar.translateZ(150)
        } else if(i==3) {
            pillar.translateX(180)
            pillar.translateZ(150)
        } 
        house.add(pillar)
    }

    return house
}

export function displayScene(){
    let canvas = document.querySelector("#webgl-scene")
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer()
    // parameters for PerspectiveCamera: angle, ratio, near (how near we start to see), far (how far can we see)
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, .1, 5000)
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    // display x, y and z axes
    let axes = new THREE.AxesHelper(100)
    scene.add(axes)

    let textureLoader = new THREE.TextureLoader()
    let textures = {
        water: textureLoader.load('./images/water.jpg', function(){
            renderer.render(scene, camera)
        }),
        sand: textureLoader.load('./images/Sand2.jpg', function(texture){
            /*texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(1, 1)*/
            renderer.render(scene, camera)
        }),
        playerHead: textureLoader.load('./images/male_face.png', function(){
            renderer.render(scene, camera)
        }),
        bamboo: textureLoader.load('./images/bamboo.jpg', function(){
            renderer.render(scene, camera)
        }),
        hay: textureLoader.load('./images/hay.jpg', function(){
            renderer.render(scene, camera)
        })
    }

    let islandRadius = 800

    // island
    //let geometry = new THREE.PlaneGeometry(700, 700, 20, 10)
    let geometry = new THREE.CircleGeometry(islandRadius, 10)
    let island = new THREE.Mesh(geometry)
    island.materialParams = {}
    island.name = "sand"
    island.rotateX(-(Math.PI / 2))
    scene.add(island)

    // water
    geometry = new THREE.PlaneGeometry(15000, 15000, 20, 10)
    //geometry = new THREE.CircleGeometry(600, 10)
    //material = new THREE.MeshBasicMaterial({ color: 0x0000FF})
    let water = new THREE.Mesh(geometry)
    water.materialParams = {}
    water.name = "water"
    water.translateY(-2)
    water.rotateX(-(Math.PI / 2))
    scene.add(water)

    geometry = new THREE.BoxGeometry(10, 40, 10)
    let playerLeftLeg = new THREE.Mesh(geometry)
    //let material = new THREE.MeshBasicMaterial({ color: 0x0000FF})
    playerLeftLeg.materialParams = {color: 0x00FF00}
    playerLeftLeg.position.set(0, 20, -10)
    playerLeftLeg.name = "playerLeftLeg"
    //scene.add(playerLeftLeg)

    geometry = new THREE.BoxGeometry(10, 40, 10)
    let playerRightLeg = new THREE.Mesh(geometry)
    playerRightLeg.materialParams = {}
    playerRightLeg.position.set(0, 20, 10)
    playerRightLeg.name = "playerRightLeg"

    geometry = new THREE.BoxGeometry(20, 50, 30)
    let playerTorso = new THREE.Mesh(geometry)
    playerTorso.materialParams = {}
    playerTorso.position.set(0, 65, 0)
    playerTorso.name = "playerTorso"

    geometry = new THREE.BoxGeometry(10, 35, 10)
    let playerLeftArm = new THREE.Mesh(geometry)
    playerLeftArm.materialParams = {}
    playerLeftArm.rotateX(10)
    playerLeftArm.position.set(0, 72, -20)
    playerLeftArm.name = "playerLeftArm"

    geometry = new THREE.BoxGeometry(10, 35, 10)
    let playerRightArm = new THREE.Mesh(geometry)
    playerRightArm.materialParams = {}
    playerRightArm.rotateX(-10)
    playerRightArm.position.set(0, 72, 20)
    playerRightArm.name = "playerRightArm"

    geometry = new THREE.SphereGeometry(15, 30, 30)
    let playerHead = new THREE.Mesh(geometry)
    playerHead.materialParams = {}
    playerHead.position.set(0, 104, 0)
    playerHead.material = new THREE.MeshPhongMaterial(playerHead.materialParams)
    playerHead.material.map = textures.playerHead
    playerHead.name = "playerHead"
    
    let playerGeometry = new THREE.Geometry();
    playerGeometry.materialParams = {}
    
    let player = new THREE.Mesh(playerGeometry)
    //player.materialParams = {}
    player.add(playerHead)
    player.add(playerTorso)
    player.add(playerLeftArm)
    player.add(playerRightArm)
    player.add(playerLeftLeg)
    player.add(playerRightLeg)

    scene.add(player)

    let house = getHouse(textures.bamboo,textures.hay)
    house.translateZ(400)
    scene.add(house)

    let mtlLoader = new MTLLoader()
    let objLoader = new OBJLoader()
    mtlLoader.load("./assets/Palm_01.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/Palm_01.obj", function(object){

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
            
            object.position.set(400, 0, 100)
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

    mtlLoader.load("./assets/Tree.mtl", function(material){
        material.preload()
        objLoader.setMaterials(material)
        objLoader.load("./assets/Tree.obj", function(object){
             
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
            scene.add(object)

            renderer.render(scene, camera)
        })
    })

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
                scene.add(object)

                renderer.render(scene, camera)
            });
            
        })
    })

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

    // add scene to html page
    canvas.appendChild(renderer.domElement)

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function(){
        
        //camera.lookAt(player.position) 
        renderer.render(scene, camera)
    })
    // limit the camera so it wont go "below" ground
    //cameraControls.maxPolarAngle = Math.PI/2-.1
    cameraControls.maxDistance = 1000

    camera.position.z = player.position.z 
    camera.position.x = player.position.x -600
    camera.position.y = player.position.y +600
    
    let ambientLight = new THREE.AmbientLight(0x333333)
    let directionalLight = new THREE.DirectionalLight(0x777777)

    scene.add(directionalLight)
    scene.add(ambientLight)

    for(let obj of scene.children){

        if(obj.materialParams !== undefined) {
            obj.material = new THREE.MeshPhongMaterial(obj.materialParams)
        }

        if(textures[obj.name]){
            obj.material.map = textures[obj.name]
        }

    }

    let lastMove = null
    let insideBoundary = true
    let walkSpeed = 5
    let legRotation1 = 0.05
    let legRotation2 = -0.05
    let counter = 0
    document.onkeydown = function(e) {
        //console.log(e.keyCode)
        switch(e.keyCode){
            case 87: 
                if (!insideBoundary && lastMove === "forward") {
                    player.translateX(0)
                } else {
                    console.log("move forward")
                    lastMove = "forward"
                    /*if (counter === 10) {
                        legRotation1 = -legRotation1
                        legRotation2 = -legRotation2
                        counter = 0
                    }
                    counter++
                    
                    playerLeftLeg.rotateZ(legRotation1)
                    playerRightLeg.rotateZ(legRotation2)*/
                    player.translateX(walkSpeed)
                    
                    cameraControls.target.set(player.position.x, player.position.y, player.position.z);
                    cameraControls.update();
                } 
                break
            case 83: 
                if (!insideBoundary && lastMove === "backward") {
                    player.translateX(0)
                } else {
                    console.log("move backwards")
                    lastMove = "backward"
                    /*if (counter === 10) {
                        legRotation1 = -legRotation1
                        legRotation2 = -legRotation2
                        counter = 0
                    }
                    counter++

                    playerLeftLeg.rotateZ(legRotation2)
                    playerRightLeg.rotateZ(legRotation1)*/
                    player.translateX(-walkSpeed)

                    cameraControls.target.set(player.position.x, player.position.y, player.position.z);
                    //camera.position.set(player.position.x -400, player.position.y +400, player.position.z);
                    cameraControls.update();
                } 
                break
            case 65: 
                if (!insideBoundary && lastMove === "left") {
                    player.translateZ(0)
                } else {
                    console.log("move left")
                    lastMove = "left"
                    // these 2 lines will make the player move to the correct direction after rotating
                    player.rotateY(2)
                    player.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -(Math.PI/2))
                }
                break
            case 68: 
                if (!insideBoundary && lastMove === "right") {
                    player.translateZ(0)
                } else {
                    console.log("move right")
                    lastMove = "right"
                    player.rotateY(-2)
                    player.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI/2)
                }
                break
        }
        renderer.render(scene, camera) 

        // check that the movable object is inside the island boundary
        if((Math.pow((player.position.x - island.position.x), 2) + Math.pow((player.position.z - island.position.z), 2)) < Math.pow(islandRadius, 2)){
            insideBoundary = true
        } else {
            insideBoundary = false
        }
    }

    function animate(){

        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }
    animate()

}