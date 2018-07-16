<template>
	<v-app>
		<v-content>
			<v-container>
				<div class="face">
					{{face}}
				</div>
				<p>
					Hello, my name is Love, True Love and I'm looking for the perfect partner. It has been a while since I 
					felt in love. Ohhhhhhhhh {{trueLoveName}}, will I ever see you again?. I'm a digital being and I use valJS
					to check your answers. Please I beg you to fill out the 
					following form to see if you are my other half. I have a very peculiar taste and 
					you may considered me a weirdo. I know she is somewhere out there.
				</p>
				<v-text-field
					v-model="name"
					:error="$data.$vueval.name.hasError"
					label="Name"
					@blur="touchVueVal('name')"
				></v-text-field>
				<v-text-field
					v-model="age"
					:error="$data.$vueval.age.hasError"
					label="Age"
					type="number"
					min="1"
					max="150"
					@blur="touchVueVal('age')"
				></v-text-field>
				<v-slider
					v-model="weightKg"
					:error="$data.$vueval.weightKg.hasError"
					label="Weight (Kg)"
					hint="Be honest"
					min="1"
					max="200"
					thumb-label
					@input="touchVueVal('weightKg')"
				></v-slider>
				<input 
					id="hasKids"
					v-model="hasKids"
					type="checkbox"
					label="Do you have kids?"
				/>
				<label for="hasKids">Do you have kids?</label>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import { greaterThan, lessThan, isEqual } from '../../src/utils';
import { any, not } from '../../src/operators';
import faces from './faces';

const trueLoveName = 'Eli';
const isWomen   = isEqual('women');
const isMen     = isEqual('men');

const isGender  = any(isMen, isWomen);
const isEmpty = (val) => !val;
const isNotEmpty = not(isEmpty);
export default {
	name: 'app',

	data() {
		return {
			name: '',
			gender: 'men',
			hasKids: false,
			age: null,
			weightKg: null,

			trueLoveName,
			face: '',
			message: '',
			faces,
			randomFaces: ['NORMAL', 'KISSING', 'SATISFIED', 'JUGDGING']
		};
	},
	
	mounted() {
		this.face = this.faces['NORMAL'];
	},
	methods: {
		validate(value) {
			const $v = this.$data.$vueval;
			$v.validate(value);
			if($v.isInvalid) {
				const name = $v.name;

				if(name.hasError) {
					this.setFace('THINKING');
				} 
			} else {
				this.face = faces['HAPPY'];
			}
		},

		touchVueVal(name) {
			const val = this.$data.$vueval[name];
			if(val.isTouched) return;

			val.touch(); 
			this.$forceUpdate();
		},

		setFace(face) {
			this.face = faces[face];
		}
	},

	validations: {
		name: isNotEmpty,
		gender: isGender,
		hasKids: isEqual(false),
		age: {
			adult: greaterThan(18),

			notMILF(age) { 
				// functions have access to context
				return !this.hasKids && age < 40;
			},
			notEmpty: isNotEmpty
		},

		weightKg:  {
			fat: lessThan(100)
		}
	}
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

.face {
	font-size: 85px;
}
</style>
