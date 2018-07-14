<template>
	<div id="app">
		<img src="./assets/logo.png">
	</div>
</template>

<script>
import { isEmpty, greaterThan, isEqual } from '../../src/utils'
import { any } from '../../src/operators'

const isTatiana = isEqual('Tatiana');
const isWomen   = isEqual('women');
const isMen     = isEqual('men');

const isGender  = any(isMen, isWomen);

export default {
	name: 'app',

	data() {
		return {
			name: 'sherman',
			gender: 'men',
			age: 8,
			weightKg: 56
		}
	},

	validations: {
		name: isTatiana,
		gender: isGender,
		age: {
			adult: greaterThan(18),
			milf: greaterThan(40),
			empty: isEmpty
		},

		weightKg:  {
			fatAndWTF(val) {
				// we have access to the vue component scope
				return isMen(this.gender) && greaterThan(100, val);
			}
		}
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
