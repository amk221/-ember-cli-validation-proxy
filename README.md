# Ember ValidationProxy object

##### The intention

To have model data be dispayed in a form, which can be validated.

##### Usage


	model: Ember.Object.create({
		name: 'Fred'
	}),
	form: validationProxy('model', {
	  presence: true
	})
	
##### Example

See the [IndexController](app/controllers/index.js) for an example.

##### Overview

1. `form` is bound to the inputs, leaving `model` alone.
2. The user can populate alter the `form` data, leaving `model` alone.
3. The user submits the `form`
4. The `form` is validated
5. If validation is successful, the changes are transfered to the `model` itself.

This works fine, apart from an inconsistancy I noticed with htmlbars not adding a classname to the input when in an error state.

Notice in the screenshot bind-attr is displaying an error but htmlbars is not:

![](./screenshot.png =293x100)

