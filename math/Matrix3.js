
class Matrix3 {

    constructor(v1 = new Vector3(), v2 = new Vector3(), v3 = new Vector3()) {
        this.v1 = v1.clone();
        this.v2 = v2.clone();
        this.v3 = v3.clone();
    }

    clone() {
        return new Matrix3(this.v1, this.v2, this.v3);
    }

    multiplyMatrix(other) {
        const a = this.toArray();
        const b = other.toArray();
        const result = [];

        for (let i = 0; i < 3; i++) {
            result[i] = [];
            for (let j = 0; j < 3; j++) {
                result[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return Matrix3.fromArray(result);
    }

    invert() {
        const m = this.toArray();

        const [
            [a, b, c],
            [d, e, f],
            [g, h, i],
        ] = m;

        const A = e * i - f * h;
        const B = -(d * i - f * g);
        const C = d * h - e * g;

        const D = -(b * i - c * h);
        const E = a * i - c * g;
        const F = -(a * h - b * g);

        const G = b * f - c * e;
        const H = -(a * f - c * d);
        const I = a * e - b * d;

        const det = a * A + b * B + c * C;

        if (Math.abs(det) < 1e-10) {
            throw new Error("Matrix is not invertible");
        }

        const invDet = 1 / det;

        const inverseArray = [
            [A * invDet, D * invDet, G * invDet],
            [B * invDet, E * invDet, H * invDet],
            [C * invDet, F * invDet, I * invDet],
        ];

        return Matrix3.fromArray(inverseArray);
    }

    toString() {
        return this.v1.toString() + "\n" +
               this.v2.toString() + "\n" +
               this.v3.toString();
    }
    

    toArray() {
        return [
            [this.v1.x, this.v2.x, this.v3.x],
            [this.v1.y, this.v2.y, this.v3.y],
            [this.v1.z, this.v2.z, this.v3.z],
        ];
    }

    static fromArray(arr) {
        const v1 = new Vector3(arr[0][0], arr[1][0], arr[2][0]);
        const v2 = new Vector3(arr[0][1], arr[1][1], arr[2][1]);
        const v3 = new Vector3(arr[0][2], arr[1][2], arr[2][2]);
        return new Matrix3(v1, v2, v3);
    }
}
