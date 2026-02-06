
class Plane extends SceneObject {

    constructor (material, normal = new Vector3(), validPoint = new Vector3()) {
        super(material);
        this.normal = normal.clone().normalize();
        this.validPoint = validPoint.clone();
    }

    raycast (ray) {
        
        const numerator = this.normal.dot(this.validPoint) - (this.normal.dot(ray.origin));
        const denominator = this.normal.dot(ray.direction);
        const alpha = numerator / denominator;

        if (alpha <= 0 || this.normal.dot(ray.direction) >= 0) {
            return { hit: false }
        }

        const hitPoint = ray.origin.clone().add(ray.direction.clone().multiplyScalar(alpha));
        return {
            hit: true,
            point: hitPoint,
            normal: this.normal,
            distance: alpha,
        };
    }
}