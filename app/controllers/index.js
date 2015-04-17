import DS from 'ember-data';
import Ember from 'ember';
import BufferedMixin from 'ember-buffered-proxy/mixin';
import EmberValidations from 'ember-validations';

var validationProxy = function(key, validations) {
  return Ember.computed(function() {
    return Ember.ObjectProxy.createWithMixins(
      BufferedMixin,
      EmberValidations.Mixin, {
      content: this.get(key),
      validations: validations,
      container: this.get('container'),
      _validate: function() {
        return this._super();
      }
    });
  });
};

export default Ember.Controller.extend({

  myModel: null,

  form: validationProxy('myModel', {
    name: {
      presence: true
    }
  }),

  init() {
    this.set('myModel', this.store.createRecord('foo'))
  },

  actions: {
    validate() {
      this.get('form').validate()
        .then(() => {
          this.get('form').applyChanges();
          console.log(this.get('myModel').toJSON());
        })
        .catch(() => {
          console.log('Invalid', JSON.stringify(this.get('form.errors')));
        })
    }
  }

});
