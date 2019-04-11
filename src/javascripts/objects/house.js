
export function getHouse(textureWood, textureHay){
    
    let houseGeometry = new THREE.Geometry();
    houseGeometry.materialParams = {}
    let house = new THREE.Mesh(houseGeometry)
    //house.materialParams = {}

    // roof half
    let geometry = new THREE.BoxGeometry(400, 200, 10)
    //geometry = new THREE.CircleGeometry(600, 10)
    //material = new THREE.MeshBasicMaterial({ color: 0x0000FF})
    let roof1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial())
    roof1.material.side = THREE.DoubleSide;
    roof1.material.map = textureHay
    roof1.name = "roofHalf1"
    roof1.translateY(200)
    roof1.translateZ(-90)
    roof1.rotateX(1.0)

    // roof other half
    let roof2 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial())
    roof2.material.side = THREE.DoubleSide;
    roof2.name = "roofHalf2"
    roof2.translateY(200)
    roof2.translateZ(90)
    roof2.rotateX(-1.0)

    geometry = new THREE.CylinderGeometry( 10, 10, 400, 32 );
    let roofLog = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
    roofLog.material.map = textureWood
    roofLog.name = "roofLog"
    roofLog.translateY(255)
    roofLog.rotateZ(Math.PI/2)
    
    house.add(roof1)
    house.add(roof2)
    house.add(roofLog)

    for(let i=0; i<4; i++) {
        geometry = new THREE.BoxGeometry(10, 160, 10)
        let pillar = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial())
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
    
    roof2.material.map = textureHay

    return house
}