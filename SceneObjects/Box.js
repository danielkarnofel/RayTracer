
class Box extends SceneObject {

    constructor (material = new Material(), center = new Vector3(), dimensions = new Vector3(1, 1, 1), rotation = new Vector3()) {
        super(material, rotation);
        this.center = center.clone();
        this.dimensions = dimensions.clone();
    }

    raycast (ray) {

        // half-widths in each basis direction
        const extents = this.dimensions.clone().multiplyScalar(0.5);

        // rotate ray into box space
        const oRay = this.rotateRayToObjectSpace(ray, this.center);

        // slab test
        const min = extents.clone().multiplyScalar(-1); // box centered at origin
        const max = extents.clone();                    // box extents around origin
        let tMin = -Infinity;   // represents the last slab the ray enters
        let tMax = Infinity;    // represents the first slab the ray exits
        let t1, t2;

        let objectNormal;
    
        // X axis slab
        t1 = (min.x - oRay.origin.x) / oRay.direction.x;
        t2 = (max.x - oRay.origin.x) / oRay.direction.x;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tMin = Math.max(tMin, t1);
        if (tMin == t1) objectNormal = new Vector3(1, 0, 0);
        tMax = Math.min(tMax, t2);
    
        // Y axis slab
        t1 = (min.y - oRay.origin.y) / oRay.direction.y;
        t2 = (max.y - oRay.origin.y) / oRay.direction.y;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tMin = Math.max(tMin, t1);
        if (tMin == t1) objectNormal = new Vector3(0, 1, 0);
        tMax = Math.min(tMax, t2);
    
        // Z axis slab
        t1 = (min.z - oRay.origin.z) / oRay.direction.z;
        t2 = (max.z - oRay.origin.z) / oRay.direction.z;
        if (t1 > t2) [t1, t2] = [t2, t1];
        tMin = Math.max(tMin, t1);
        if (tMin == t1) objectNormal = new Vector3(0, 0, 1);
        tMax = Math.min(tMax, t2);
    
        // miss
        if (tMin > tMax) {
            return { hit: false }
        }

        // box is behind the ray
        if (tMax < 0) {
            return { hit: false }
        }

        // ray starts inside the box
        if (tMin < 0) {
            return { hit: false }
        }

        // transform the hit point into world space
        const hitPoint = oRay.origin.clone().add(oRay.direction.clone().multiplyScalar(tMin));
        const worldHitPoint = this.rotateHitPointToWorldSpace(hitPoint, this.center);

        const worldNormal = this.rotateNormalToWorldSpace(objectNormal);

        return {
            hit: true,      // Boolean indicating if an intersection occurred
            point: worldHitPoint,    // Vector3 of the intersection point
            normal: worldNormal,   // Normal vector at the intersection point
            distance: tMin, // Distance from ray origin to intersection
        }
    }

}