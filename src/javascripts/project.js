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

    // basketball
    //geometry = new THREE.SphereGeometry(15, 40, 60)
    //material = new THREE.MeshNormalMaterial({color: 0xFF00FF})
    //let basketball = new THREE.Mesh(geometry/*, material*/)
    /*basketball.materialParams = {}
    basketball.name = "basketball"
    basketball.translateX(30)
    basketball.translateZ(40)
    basketball.translateY(15)
    scene.add(basketball)*/

    geometry = new THREE.BoxGeometry(30, 30, 30)
    //material = new THREE.MeshPhongMaterial({color: 0x00FF00})
    let player = new THREE.Mesh(geometry)
    player.materialParams = {/*color: 0x00FF00*/}
    player.position.set(0, 15, 0)
    player.name = "crate"
    scene.add(player)

    // add scene to html page
    canvas.appendChild(renderer.domElement)

    let controls = {
        radius: 400,
        theta: 1, // in radians
        phi: 1
    }

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function(){
        //camera.lookAt(player.position) 
        renderer.render(scene, camera)
    })
    // limit the camera so it wont go "below" ground
    cameraControls.maxPolarAngle = Math.PI/2-.1
    cameraControls.maxDistance = 600

    /*camera.position.x = controls.radius * Math.sin(controls.theta) * Math.cos(controls.phi)
    camera.position.y = controls.radius * Math.cos(controls.theta) 
    camera.position.z = controls.radius * Math.sin(controls.theta) * Math.sin(controls.phi)*/

    camera.position.x = -300
    camera.position.y = 200
    camera.position.z = 0
    
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
    document.onkeydown = function(e) {
        //console.log(e.keyCode)
        // check that the movable object is inside the island
        switch(e.keyCode){
            case 87: 
                if (!insideBoundary && lastMove === "forward") {
                    player.translateX(0)
                } else {
                    console.log("move forward")
                    lastMove = "forward"
                    player.translateX(10)
                    camera.lookAt(player.position)
                    //camera.position.x = camera.position.x + 10
                    renderer.render(scene, camera)
                } 
                break
            case 83: 
                if (!insideBoundary && lastMove === "backward") {
                    player.translateX(0)
                } else {
                    console.log("move backwards")
                    lastMove = "backward"
                    player.translateX(-10)
                    camera.lookAt(player.position)
                    //camera.position.x = camera.position.x - 10
                    renderer.render(scene, camera)
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
                    renderer.render(scene, camera)
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
                    renderer.render(scene, camera)
                }
                break
        } 
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