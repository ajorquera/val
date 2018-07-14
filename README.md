# ValJS

> Another validation library

### Why?
I went to this crash course about functional programming and it got me thinking... How do I use and learn this type of coding? Lets make a simple library to force myself to learn, and maybe, just maybe create something useful(probalby not). I think it can be quite useful fo data validation. Yes, it is inspired in vuelidate, which is better in different ways. Vuelidate also allows function composition. So, Im not doing anything new. 

### Functional programming 
I'm not trying to be a smartass, but this is what I think I know about FP. So, this type of programming is about transforming data using function composition. With really small and simple functions you can compose more abstracts ones that will do stuff to data. Some of the benefits of this are, cleaner code, more readable(it can be difficult at the beginning), easier to test (pure functions), etc

To understand the following example, you probably need some knowledge on high order functions like curry and composition.

```javascript
// composition
const fn = composition(f, g) // => fn(x) = f(g(x))

// curry
const fn = (a,b) => a + b;
const curryFn = curry(fn);

const addOne = curryFn(1);
addOne(2) // => 3
```

Example: lets make some very basic functions that will check if is a primitive type

```javascript
const isPrimitive = curry((primitive, value) => typeof value === primitive);
const arrayLength = (arr) => arr.length;
const not = () => (...args) => !fn(...args)
const isEqual = curry((a, b) => a === b);

const isEqualZero = isEqual(0);

const isFunction   = isPrimitive('function')
const isNumber     = isPrimitive('number')
const isNull       = isEqual(null);
const isUndefined  = isEqual(undefined);

const isArrayEmpty = compose(isEqualZero, arrayLength)
const isArrayNotEmpty = not(isArrayEmpty);
```

So now, imagine all your code through composed functions. Seems quite interesting right. It fucking is. In my very short experience with FP, everything can be composed but not everything should be. I use the guideline, make it simple and not complicated.

I have a create a super duper small and simple library to validate data using function composition. In theory, this library should work with any javascript framework. At the moment, I just add it to vuejs, just because I use it at my current job.

For vuejs:

```javacript
import { required, moreThan, between, any } from 'valjs/utils'
import { curry } from 'valjs/operators'

copnst isTatiana = isEqual('Tatiana');
const isWomen = isEqual('women');
const isMen = isEqual('men');

const isGender = any(isMen, isWomen)

export default {
  data() {
    return {
      name: '',
      age: 0
    }

	methods: {
		resetFormValidation() {
			this.$vueval.reset();
		}

		submit() {
			if (this.$vueval.isInvalid) {
				
				const nameVal = this.$vueval.name;
				const ageVal = this.$vueval.age;

				if (nameVal.isInvalid) {
					console.log('is not Tatiana :(');
				
				else if (ageVal.reasons.has('empty')) {
					console.log('no age, no play');

				} else if(ageVal.reasons.has('milf')) {
					console.log('we need the experience');

				} else if(weightVal.reasons.has('fatAndWTF)) {
					console.log('run')
				}

				this.$vueval.touch();
			}
		}
	}
  },
  validations: {
    name: isTatiana,
	gender: isGender
    age: {
      adult: moreThan(18),
	  milf: moreThan(40),
	  empty: required
    }

	weight:  {
		fatAndWTF(val) {
			// we have access to the vue component scope
			return isEqual('men', this.gender) && moreThan(100, val);
		}
	}
  }
}
```

Once the plugin is installed, you need to add a validations object to the component (like vuelidate), which will indicate the validations of each property that's being watch. In this cheeky example, age and name are being watched. If you assign just a simple function, there will be no reasons why the validation failed. If you assign a key, validation object, you will have available the reasons why it failed, using its key as the reason. 

On the instance of the component we will have available an instance property called $vueval. This is an object with the following properties and methods: 

* isInvalid: the field didnt pass the validation
* isValid: the field pass the validation
* hasError: isInvalid and isTouched are true
* isTouched: the property had been touched
* reasons: set that will contain all the reasons which the validation failed
* touch(): Will set isTouched to true.
* reset(): will reset the isTouched to false
* [propName]: There will be a property matching the one being watch that will contain all properties and methods mentioned above



