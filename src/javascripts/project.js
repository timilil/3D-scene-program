import * as THREE from 'three'
window.THREE = THREE
let OrbitControls = require('threejs-controls/OrbitControls')

import {getBoat} from './objects/boat'
import {getHouse} from './objects/house'
import {getBeachUmbrella} from './objects/beachumbrella'
import {getBeachTowels} from './objects/beachtowels'
import {getSleepingBag} from './objects/sleepingbag'
import {getAxe} from './objects/axe'
import {getLogs} from './objects/logs'
import {getTree} from './objects/tree'
import {getTreeStump} from './objects/treestump'
import {getPalm} from './objects/palm'
import {getPalmTree} from './objects/palmtree'
import {getCampfire} from './objects/campfire'
import {getPerson} from './objects/person'
import {getChair} from './objects/chair'
import {getTable} from './objects/table'

function isNextMoveInsideIslandBoundary(player, island, islandRadius, nextMove){
    // check that the movable object is inside the island boundary
    if((Math.pow(((player.position.x +nextMove) - island.position.x), 2) + Math.pow((player.position.z - island.position.z), 2)) < Math.pow(islandRadius, 2)){
        return true
    } /*else {
        if((Math.pow(((player.position.x +(nextMove*5)) - island.position.x), 2) + Math.pow((player.position.z - island.position.z), 2)) < Math.pow(islandRadius, 2)){
            return true
        }
    }*/
    return false
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
        }),
        beachball: textureLoader.load('./images/beachball.jpg', function(){
            renderer.render(scene, camera)
        }),
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

    geometry = new THREE.SphereGeometry(15, 40, 60)
    //material = new THREE.MeshNormalMaterial({color: 0xFF00FF})
    let beachball = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial())
    beachball.material.map = textures.beachball
    beachball.name = "beachball"
    beachball.position.set(-30, 15, -150)
    scene.add(beachball)

    let house = getHouse(textures.bamboo,textures.hay)
    house.translateZ(400)
    scene.add(house)

    getBoat(scene, renderer, camera)
    getBeachTowels(scene, renderer, camera)
    getBeachUmbrella(scene, renderer, camera)
    getSleepingBag(scene, renderer, camera)
    getPalm(scene, renderer, camera)
    getTree(scene, renderer, camera)
    getTreeStump(scene, renderer, camera)
    getAxe(scene, renderer, camera)
    getLogs(scene, renderer, camera)
    getPalmTree(scene, renderer, camera)
    getCampfire(scene, renderer, camera)
    getPerson(scene, renderer, camera)
    getChair(scene, renderer, camera)
    getTable(scene, renderer, camera)

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

    let walkSpeed = 5
    let legRotation1 = 0.05
    let legRotation2 = -0.05
    let counter = 0
    document.onkeydown = function(e) {
        //console.log(e.keyCode)
        switch(e.keyCode){
            case 87: 
                if (isNextMoveInsideIslandBoundary(player, island, islandRadius, walkSpeed)) {
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
                if (isNextMoveInsideIslandBoundary(player, island, islandRadius, -walkSpeed)) {
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
                // these 2 lines will make the player move to the correct direction after rotating
                player.rotateY(2)
                player.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -(Math.PI/2))
                break
            case 68: 
                player.rotateY(-2)
                player.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI/2)
                break
        }
        renderer.render(scene, camera) 
    }

    function animate(){

        camera.lookAt(scene.position)
        renderer.render(scene, camera)
        cameraControls.update()
    }
    animate()

}