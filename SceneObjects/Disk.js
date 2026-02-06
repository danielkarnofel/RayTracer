
class Disk extends SceneObject {

    constructor (material, normal = new Vector3(), center = new Vector3(), radius = 1.0) {
        super(material);
        this.normal = normal.clone();
        this.center = center.clone();
        this.radius = radius;
    }

    raycast (ray) {

        const numerator = this.normal.dot(this.center) - (this.normal.dot(ray.origin));
        const denominator = this.normal.dot(ray.direction);
        const alpha = numerator / denominator;

        if (alpha <= 0 || this.normal.dot(ray.direction) >= 0) {
            return { hit: false }
        }

        const hitPoint = ray.origin.clone().add(ray.direction.clone().multiplyScalar(alpha));

        if (Vector3.fromTo(this.center, hitPoint).lengthSqr() > (this.radius*this.radius)) {
            return { hit: false }
        }

        return {
            hit: true,
            point: hitPoint,
            normal: this.normal,
            distance: alpha,
        };
    }
}