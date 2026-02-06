
class Vector3 {

    constructor (x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    set (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    clone () {
        return new Vector3(this.x, this.y, this.z);
    }

    copy (other) {
        return this.set(other.x, other.y, other.z);
    }

    negate () {
        return this.set(-this.x, -this.y, -this.z);
    }

    add (v) {
        return this.set(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract (v) {
        return this.set(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    multiplyScalar (scalar) {
        return this.set(scalar * this.x, scalar * this.y, scalar * this.z);
    }

    multiplyMatrix(matrix) {
        const m = matrix.toArray(); // 3x3 array
        const x = m[0][0] * this.x + m[0][1] * this.y + m[0][2] * this.z;
        const y = m[1][0] * this.x + m[1][1] * this.y + m[1][2] * this.z;
        const z = m[2][0] * this.x + m[2][1] * this.y + m[2][2] * this.z;
        return this.set(x, y, z);
    }

    length () {
        return Math.sqrt(this.lengthSqr());
    }

    lengthSqr () {
        return this.dot(this);
    }

    normalize () {
        return this.rescale(1);
    }

    dot (other) {
        return (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
    }

    rescale (newScale) {
        let length = this.length();
        this.set(this.x/length, this.y/length, this.z/length);
        return this.multiplyScalar(newScale);
    }

    static fromTo (fromPoint, toPoint) {
        if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3))
            console.error("fromTo requires two vectors: 'from' and 'to'");
        return toPoint.clone().subtract(fromPoint);
    }

    static angle (v1, v2) {
        return Math.acos( (v1.dot(v2)) / (v1.length() * v2.length()) ) * (180/Math.PI);
    }

    static project (vectorToProject, otherVector) {
        let otherNormalized = otherVector.clone().normalize();
        let projectedLength = otherNormalized.dot(vectorToProject);
        return otherNormalized.multiplyScalar(projectedLength);
    }

    toString () {
        return "(" + this.x + ", " + this.y + ", " + this.z + ")";
    }
}