import Val from '../src/Val';

export default {
	install (Vue, options) {
		Vue.mixin({
			data () {
				return {
					$vueval: new Val(this),
					vals: new Map()
				}
			},

			created() {
				let validations = this.$options.vueval;

				if(isEmpty(validations)) return;

				validations = validations.filter(isPredicate);

				const data = Object.entries(this.$data).flat();

				validations = data.forEach(([name, value]) => {
					this.$vueval.setWatch(this.$watch.bind(this));
					this.$vueval.setVal(name, value);
					this.$vueval.watch(name);
				})
			}
		});
	}
}