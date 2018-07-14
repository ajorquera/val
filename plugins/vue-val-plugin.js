import Vueval from '../src/Vueval';
import { isEmpty, isPredicate } from '../src/utils'
import { getProp } from '../src/operators'

export default {
	install (Vue, options) {
		Vue.mixin({
			data () {
				return {
					$vueval: new Vueval(this)
				}
			},

			created() {
				let validations = this.$options.validations;

				if(isEmpty(validations)) return;

				validations = Object.entries(validations).filter(([name, predicate]) => isPredicate(predicate));

				const data = Object.entries(this.$data).filter(([name]) => name !== '$vueval');

				validations.forEach(([name, validation]) => {
					const $vueval = this.$data.$vueval;
					$vueval.setWatch(this.$watch.bind(this), {immediate: true});
					$vueval.addVal(name, validation);
					$vueval.watch(name);
					window.vueval = $vueval;
				})
			}
		});
	}
}