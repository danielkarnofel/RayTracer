
class Ray {

    constructor (origin = new Vector3(), direction = new Vector3(0, 0, 1)) {
        this.origin = origin.clone();
        this.direction = direction.clone().normalize();
    }

    clone () {
        return new Ray(this.origin, this.direction);
    }
}
