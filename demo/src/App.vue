<template>
	<v-app>
		<v-content>
			<v-container>
				<div class="face">
					{{face}}
				</div>
				<p>
					Hello, my name is random guy and I'm looking for the perfect partner. It has been a while since I 
					felt in love. Ohhhhhhhhh {{trueLoveName}}, will I ever see you again?. Please I beg you to fill out the 
					following form to see if you are my other half. I have a very peculiar taste and 
					you may considered me a weirdo, but I know my true love is somewhere out there.
				</p>
				<v-text-field
					v-model="name"
					label="Name"
				></v-text-field>
				<v-text-field
					v-model="age"
					label="Age"
					type="number"
				></v-text-field>
				<v-slider
					v-model="weightKg"
					color="orange"
					label="Weight"
					hint="Be honest"
					min="1"
					max="200"
					thumb-label
					@change="$data.$vueval.weightKg.touch()"
				></v-slider>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
import { isEmpty, greaterThan, isEqual } from '../../src/utils';
import { any } from '../../src/operators';
import faces from './faces';

const trueLoveName = 'Eli';
const isMyLove  = isEqual(trueLoveName);
const isWomen   = isEqual('women');
const isMen     = isEqual('men');

const isGender  = any(isMen, isWomen);

export default {
	name: 'app',

	data() {
		return {
			name: '',
			gender: 'men',
			age: null,
			weightKg: 50,

			trueLoveName,
			face: '',
			message: '',
			faces,
			randomFaces: ['NORMAL', 'KISSING', 'SATISFIED', 'JUGDGING']
		};
	},

	watch: {
		'weightKg'(value) {
			const val = this.$data.$vueval && this.$data.$vueval.weightKg;

			if(!val) return;
			val.validate(value);
			
			if(val.reasons.has('fatAndWTF')) {
				this.face = faces['WTF'];
			} else {
				this.face = faces['NORMAL'];
			}
		}
	},

	mounted() {
		this.face = this.faces['NORMAL'];
		
	},
	methods: {
		setFaceInterval() {
			const intervarlTime = 1000*5;

			this.faceInterval = setInterval(() => {
				const facePicked = this.randomFaces[Math.floor(Math.random() * this.randomFaces.length)];
				this.face = faces[facePicked];
			}, intervarlTime);
		}
	},

	

	validations: {
		name: isMyLove,
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
