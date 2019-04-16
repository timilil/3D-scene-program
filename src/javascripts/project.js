import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
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
import {getDrone} from './objects/drone'
import {getGrass} from './objects/grass'
import {getDog} from './objects/dog'

// check that the movable object is inside the island boundary
function isNextMoveInsideIslandBoundary(player, island, islandRadius, nextMove){
    if((Math.pow(((player.position.x-nextMove) - island.position.x), 2) + Math.pow(((player.position.z) - island.position.z), 2)) < Math.pow(islandRadius, 2)){
        return true
    } 
    return false
}

// check that the movable object is not intersecting other objects on the island
function isObjectIntersecting(scene, camera, player) {
    
    let raycaster = new THREE.Raycaster()
    let playerLocation = new THREE.Vector2()
    
    let intersectObjects = []
    for(let intersectChild of scene.children){
        if(intersectChild.children.length > 0) {
            for (let child of intersectChild.children){
                intersectObjects.push(child)
            }
        } else {
            intersectObjects.push(intersectChild)
        }
    }
    
    // x and y values because the player's car has been rotated and x is no longer in use
    playerLocation.z = player.position.z
    playerLocation.y = player.position.y
    raycaster.setFromCamera(playerLocation, camera)
    let intersects = raycaster.intersectObjects(intersectObjects)
    
    for(let intersect of intersects){
        if(intersect.object.name !== "water" && intersect.object.name !== "sand" && intersect.object.name !== "sky" && intersect.object.name !== "10438_Circular_Grass_Patch_v1"  && intersect.object.name !== "Mesh_0020"){
            return true
        }
    }
    return false
}

export function displayScene(){
    let canvas = document.querySelector("#webgl-scene")
    let scene = new THREE.Scene()
    let renderer = new THREE.WebGLRenderer()
    // parameters for PerspectiveCamera: angle, ratio, near (how near we start to see), far (how far can we see)
    let camera = new THREE.PerspectiveCamera(45, canvas.clientWidth/canvas.clientHeight, .1, 7000)
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0xEEEEEE)

    let textureLoader = new THREE.TextureLoader()
    let textures = {
        water: textureLoader.load('./images/water.jpg', function(){
            renderer.render(scene, camera)
        }),
        sand: textureLoader.load('./images/Sand2.jpg', function(){
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
        sky: textureLoader.load('./images/sky.jpg', function(texture){
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping
            texture.repeat.set(6, 1)
            renderer.render(scene, camera)
        }),
    }

    let islandRadius = 800

    // island
    let geometry = new THREE.CircleGeometry(islandRadius, 10)
    let island = new THREE.Mesh(geometry)
    island.materialParams = {}
    island.name = "sand"
    island.rotateX(-(Math.PI / 2))
    scene.add(island)

    // water
    geometry = new THREE.PlaneGeometry(15000, 15000, 20, 10)
    let water = new THREE.Mesh(geometry)
    water.materialParams = {}
    water.name = "water"
    water.translateY(-2)
    water.rotateX(-(Math.PI / 2))
    scene.add(water)

    // sky
    geometry = new THREE.SphereGeometry(5000, 25, 25, 0, 2*Math.PI, 0, 0.5 * Math.PI,)
    let sky = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial())
    sky.material.side = THREE.BackSide;
    sky.name = "sky"
    scene.add(sky)

    geometry = new THREE.SphereGeometry(15, 40, 60)
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
    getDrone(scene, renderer, camera)
    getGrass(scene, renderer, camera)
    getDog(scene, renderer, camera)

    let mtlLoader = new MTLLoader()
    let objLoader = new OBJLoader()

    let player = null
    mtlLoader.load("./assets/cardriver/baby.mtl", function(material1){
        material1.preload()
        objLoader.setMaterials(material1)
        objLoader.load("./assets/cardriver/baby.obj", function(objectPerson){

            let texture1 = new THREE.TextureLoader().load( './assets/cardriver/SittingBabyDiffuseMap.jpg' );
            let materialPerson = new THREE.MeshBasicMaterial( { map: texture1 } );
            
            for(let o of objectPerson.children){
                o.material = materialPerson
            }
            
            objectPerson.position.set(-35, 50, -10)
            objectPerson.scale.set(3, 3, 3)
            objectPerson.rotateX(Math.PI/2)
            objectPerson.rotateY(Math.PI)

            mtlLoader.load("./assets/car/dpv.mtl", function(material2){
                material2.preload()
                objLoader.setMaterials(material2)
                objLoader.load("./assets/car/dpv.obj", function(objectCar){

                    let texture2 = new THREE.TextureLoader().load( './assets/car/Tex_0025_1.png' );
                    let materialCar = new THREE.MeshBasicMaterial( { map: texture2 } );
                    
                    for(let o of objectCar.children){
                        o.material = materialCar
                    }
                    
                    objectCar.position.set(0, 0, 0)
                    objectCar.scale.set(0.3, 0.3, 0.3)
                    objectCar.rotateY(-Math.PI/2)
                    player = objectCar
                    player.add(objectPerson)
                    player.name = "player"
                    scene.add(player)
                })
            })
        })
    })

    // add scene to html page
    canvas.appendChild(renderer.domElement)

    let cameraControls = new OrbitControls(camera, renderer.domElement)
    cameraControls.addEventListener("change", function(){
        
        renderer.render(scene, camera)
    })
    // limit the camera so it wont go "below" ground
    cameraControls.maxPolarAngle = Math.PI/2-.1
    cameraControls.maxDistance = 1000

    camera.position.z = 0
    camera.position.x = -600
    camera.position.y = 600
    
    let ambientLight = new THREE.AmbientLight(0x333333)
    let directionalLight = new THREE.DirectionalLight(0x777777)
    
    let pointLight = new THREE.PointLight(0x888888)
    pointLight.position.set(0, 1000, 0)
    pointLight.intensity = 1

    scene.add(directionalLight)
    scene.add(ambientLight)
    scene.add(pointLight)

    for(let obj of scene.children){

        if(obj.materialParams !== undefined) {
            obj.material = new THREE.MeshPhongMaterial(obj.materialParams)
        }

        if(textures[obj.name]){
            obj.material.map = textures[obj.name]
        }

    }

    let driveSpeed = 10
    document.onkeydown = function(e) {
        switch(e.keyCode){
            case 87: 
                if (isNextMoveInsideIslandBoundary(player, island, islandRadius, -driveSpeed) && !isObjectIntersecting(scene, camera, player)) {
                    // move the player/car forward
                    player.translateZ(-driveSpeed)
                    cameraControls.target.set(player.position.x, player.position.y, player.position.z);
                } 
                break
            case 83: 
                if (isNextMoveInsideIslandBoundary(player, island, islandRadius, driveSpeed)) {
                    // move the player/car backwards
                    player.translateZ(driveSpeed)
                    cameraControls.target.set(player.position.x, player.position.y, player.position.z);
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
        animate()
    }

    function animate(){

        renderer.render(scene, camera)
        cameraControls.update()
    }
    animate()

}