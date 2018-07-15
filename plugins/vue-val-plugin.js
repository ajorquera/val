import Vueval from '../src/Vueval';
import { isEmpty } from '../src/utils';

export default {
	install (Vue) {
		Vue.mixin({
			data () {
				return {
					$vueval: new Vueval(this)
				};
			},

			created() {
				let validations = this.$options.validations;

				if(isEmpty(validations)) return;

				const data = Object.entries(this.$data).filter(([name]) => name !== '$vueval');

				data.forEach(([name]) => {
					const validation = validations[name]
					const $vueval = this.$data.$vueval;
					const val = $vueval.addVal(name, validation);
					this.$watch(name, val.validate.bind(val));
					window.vueval = $vueval;
				});
			}
		});
	}
};
