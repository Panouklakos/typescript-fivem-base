module Vector3 {
	export class Three {

		private points:Array<number>;

		constructor(points:Array<number> = [0, 0, 0]) {
			this.points = points;
		}

		get x():number {
			return this.points[0];
		}

		get y():number {
			return this.points[1];
		}

		get z():number {
			return this.points[2];
		}

		set x(v:number) {
			this.points[0] = v;
		}

		set y(v:number) {
			this.points[1] = v;
		}

		set z(v:number) {
			this.points[2] = v;
		}

		get magnitude():number {
			return this.x * this.x + this.y * this.y + this.z * this.z;
		}

		get normal():number {
			return Math.sqrt(this.magnitude);
		}

		get array():Array<number> {
			return this.points;
		}

		toString():string {
			return 'vec3:(' + this.points.join(', ') + ')';
		}

		// -- Basic Arithmetic

		add(a:Three):Three {
			return new Three([
				this.x + a.x,
				this.y + a.y,
				this.z + a.z
			]);
		}

		subtract(a:Three):Three {
			return new Three([
				this.x - a.x,
				this.y - a.y,
				this.z - a.z
			]);
		}

		multiplyScalar(s:number):Three {
			return new Three([
				this.x * s,
				this.y * s,
				this.z * s
			]);
		}

		divideScalar(s:number):Three {
			return new Three([
				((this.x === 0) ? 0 : this.x / s),
				((this.y === 0) ? 0 : this.y / s),
				((this.z === 0) ? 0 : this.z / s)
			]);
		}

		// -- Comparators

		eq(b:Three):boolean {
			return this.x === b.x && this.y === b.y && this.z === b.z;
		}

		neq(b:Three):boolean {
			return !this.eq(b);
		}

		// -- Methods

		multiply(b:Three):Three {
			return new Three([
				this.x * b.x,
				this.y * b.y,
				this.z * b.z
			]);
		}

		divide(b:Three):Three {
			return new Three([
				((this.x === 0 || b.x === 0) ? 0 : this.x / b.x),
				((this.y === 0 || b.y === 0) ? 0 : this.y / b.y),
				((this.z === 0 || b.z === 0) ? 0 : this.z / b.z)
			]);
		}

		angle(to:Three):number {
			return Math.acos(this.dot(to) / (this.normal * to.normal));
		}

		dot(b:Three):number {
			return this.x * b.x + this.y * b.y + this.z * b.z;
		}

		cross(b:Three):Three {
			return new Three([
				(this.y * b.z) - (this.z * b.y),
				(this.z * b.x) - (this.x * b.z),
				(this.x * b.y) - (this.y * b.x),
			]);
		}

		distance(b:Three):number {
			var dx:number = this.x - b.x,
				dy:number = this.y - b.y,
				dz:number = this.z - b.z;

			return Math.sqrt(dx * dx + dy * dy + dz * dz);
		}

		negate():Three {
			return new Three([
				(-1 * Math.abs(this.x)),
				(-1 * Math.abs(this.y)),
				(-1 * Math.abs(this.z))
			]);
		}

		abs():Three {
			return new Three([
				(Math.abs(this.x)),
				(Math.abs(this.y)),
				(Math.abs(this.z))
			]);
		}

		reflect():Three {
			return new Three([
				(-1 * this.x),
				(-1 * this.y),
				(-1 * this.z)
			]);
		}

		lerp(b:Three, a:number):Three {
			return this.add(b.subtract(this).multiply(new Three([a, a, a])));
		}

		// -- Static Functions

		static max(a:Three, b:Three):Three {
			return new Three([
				((a.x > b.x) ? a.x : b.x),
				((a.y > b.y) ? a.y : b.y),
				((a.z > b.z) ? a.z : b.z)
			]);
		}

		static min(a:Three, b:Three):Three {
			return new Three([
				((a.x < b.x) ? a.x : b.x),
				((a.y < b.y) ? a.y : b.y),
				((a.z < b.z) ? a.z : b.z)
			]);
		}
	}
}

export default Vector3