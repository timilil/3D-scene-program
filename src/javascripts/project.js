import * as THREE from 'three'
window.THREE = THREE
let OrbitControls = require('threejs-controls/OrbitControls')

export function displayScene(){
    let canvas = document.querySelector("#webgl-scene")
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer()
    // parameters for PerspectiveCamera: angle, ratio, near (how near we start to see), far (how far can we see)
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, .1, 2000)
    
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
        

    }

    let islandRadius = 600

    // floor
    //let geometry = new THREE.PlaneGeometry(700, 700, 20, 10)
    let geometry = new THREE.CircleGeometry(islandRadius, 10)
    let island = new THREE.Mesh(geometry)
    island.materialParams = {}
    island.name = "sand"
    island.rotateX(-(Math.PI / 2))
    scene.add(island)

    // water
    geometry = new THREE.PlaneGeometry(5000, 5000, 20, 10)
    //geometry = new THREE.CircleGeometry(600, 10)
    //material = new THREE.MeshBasicMaterial({ color: 0x0000FF})
    let water = new THREE.Mesh(geometry)
    water.materialParams = {}
    water.name = "water"
    water.translateY(-1)
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
    //playerHead.material = new THREE.MeshPhongMaterial(playerHead.materialParams)
    //playerHead.material.map = textures.playerHead
    playerHead.name = "playerHead"
    //scene.add(playerHead)

    let playerGeometry = new THREE.Geometry();
    playerLeftLeg.updateMatrix()
    playerGeometry.merge(playerLeftLeg.geometry, playerLeftLeg.matrix)

    playerRightLeg.updateMatrix()
    playerGeometry.merge(playerRightLeg.geometry, playerRightLeg.matrix)
    
    playerTorso.updateMatrix()
    playerGeometry.merge(playerTorso.geometry, playerTorso.matrix)

    playerHead.updateMatrix()
    playerGeometry.merge(playerHead.geometry, playerHead.matrix)

    playerLeftArm.updateMatrix()
    playerGeometry.merge(playerLeftArm.geometry, playerLeftArm.matrix)

    playerRightArm.updateMatrix()
    playerGeometry.merge(playerRightArm.geometry, playerRightArm.matrix)
    
    //playerGeometry.materialParams = {}
    
    let player = new THREE.Mesh(playerGeometry)
    player.materialParams = {}
    scene.add(player);

    // add scene to html page
    canvas.appendChild(renderer.domElement)

    let controls = {
        radius: 400,
        theta: 1, // in radians
        phi: 1
    }

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function(){
        
        camera.lookAt(player.position) 
        renderer.render(scene, camera)
    })
    // limit the camera so it wont go "below" ground
    cameraControls.maxPolarAngle = Math.PI/2-.1
    cameraControls.maxDistance = 600

    /*camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
    camera.position.y = controls.radius * Math.cos(controls.theta) 
    camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)*/

    camera.position.z = player.position.z 
    camera.position.x = player.position.x -400
    camera.position.y = player.position.y +400
    
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
    document.onkeydown = function(e) {
        //console.log(e.keyCode)
        switch(e.keyCode){
            case 87: 
                if (!insideBoundary && lastMove === "forward") {
                    player.translateX(0)
                } else {
                    console.log("move forward")
                    lastMove = "forward"
                    player.translateX(walkSpeed)
                    camera.lookAt(player.position)
                    //camera.position.z = player.position.z 
                    //camera.position.x = player.position.x -400
                    //camera.position.y = player.position.y +400
                    //camera.position.set(player.position.x -400, player.position.y +400, player.position.z);
                    
                    //cameraControls.update();
                } 
                break
            case 83: 
                if (!insideBoundary && lastMove === "backward") {
                    player.translateX(0)
                } else {
                    console.log("move backwards")
                    lastMove = "backward"
                    player.translateX(-walkSpeed)
                    camera.lookAt(player.position)
                    //camera.position.z = player.position.z 
                    //camera.position.x = player.position.x -400
                    //camera.position.y = player.position.y +400
                    //camera.position.x = camera.position.x - 10
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
                    //player.translateZ(-10)
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