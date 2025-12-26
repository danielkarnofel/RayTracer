
class Sphere extends SceneObject {

    constructor (material, center = new Vector3(), radius = 1.0) {
        super(material);
        this.center = center.clone();
        this.radius = radius;
    }

    raycast (ray) {

        const origin = ray.origin.clone();
        const direction = ray.direction.clone();
        const center = this.center.clone();
        const radius = this.radius; // primitive, copied by value

        let centerToOrigin = Vector3.fromTo(center, origin);

        let a = 1;
        let b = 2 * (direction.dot(centerToOrigin));
        let c = centerToOrigin.dot(centerToOrigin) - (radius * radius);

        let discriminant = (b * b) - (4 * a * c);
        if (discriminant < 0) {
            return { hit: false };
        }

        let discriminantSqrt = Math.sqrt(discriminant); // only calculate the square root once
        let alpha1 = ( -b + discriminantSqrt ) / (2 * a);
        let alpha2 = ( -b - discriminantSqrt ) / (2 * a);

        if (alpha1 < 0 || alpha2 < 0) {
            return { hit: false };
        }

        let alpha = (alpha1 <= alpha2) ? alpha1 : alpha2;
        let intersectionPoint = origin.clone().add(direction.clone().multiplyScalar(alpha));
        let normalVector = Vector3.fromTo(center, intersectionPoint).normalize();

        return {
            hit: true,      // Boolean indicating if an intersection occurred
            point: intersectionPoint,     // Vector3 of the intersection point
            normal: normalVector,    // Normal vector at the intersection point
            distance: alpha,  // Distance from the ray origin to the intersection
        };
    }
}