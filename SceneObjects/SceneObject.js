
class SceneObject {

    constructor (material = new Material(), rotation = new Vector3()) {
        this.material = material.clone();

        // this.position = position.clone();
        this.rotation = rotation.clone();
        this.updateRotationMatrices();
    }

    raycast (ray) {
        throw new Error("Abstract method raycast not implemented.");
    }

    // Function for updating the objects's rotation
    setRotation (newRotation = new Vector3()) {
        this.rotation = newRotation.clone();
        this.updateRotationMatrices();
    }

    updateRotationMatrices () {
        this.rotationMatrix = this.generateRotationMatrix();
        this.invertedMatrix = this.rotationMatrix.clone().invert();
    }

    rotateRayToObjectSpace (ray, center) {
        const transformedOrigin = ray.origin.clone().subtract(center).multiplyMatrix(this.invertedMatrix);
        const transformedDirection = ray.direction.clone().multiplyMatrix(this.invertedMatrix).normalize();
        return new Ray(transformedOrigin, transformedDirection);
    }

    rotateHitPointToWorldSpace (hitPoint, center) {
        return hitPoint.multiplyMatrix(this.rotationMatrix).add(center);
    }

    rotateNormalToWorldSpace (normal) {
        return normal.multiplyMatrix(this.rotationMatrix).normalize();
    }

    generateRotationMatrix () {

        const rX = Matrix3.fromArray([
            [1, 0, 0],
            [0, Math.cos(this.rotation.x), -Math.sin(this.rotation.x)],
            [0, Math.sin(this.rotation.x), Math.cos(this.rotation.x)],
        ]);

        const rY = Matrix3.fromArray([
            [Math.cos(this.rotation.y), 0, Math.sin(this.rotation.y)],
            [0, 1, 0],
            [-Math.sin(this.rotation.y), 0, Math.cos(this.rotation.y)],
        ]);

        const rZ = Matrix3.fromArray([
            [Math.cos(this.rotation.z), -Math.sin(this.rotation.z), 0],
            [Math.sin(this.rotation.z), Math.cos(this.rotation.z), 0],
            [0, 0, 1],
        ]);

        return rZ.multiplyMatrix(rY).multiplyMatrix(rX);
    }
}

class Material {
    constructor (color = new Vector3(1, 1, 1), reflectivity = 0.0, emissivity = 0.0) {
        this.color = color.clone();
        this.reflectivity = reflectivity;
        this.emissivity = emissivity;
        // can add additional material properties as needed
    }

    clone () {
        return new Material(this.color, this.reflectivity, this.emissivity);
    }
}