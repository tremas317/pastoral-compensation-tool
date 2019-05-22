<template>
  <div class="section">
    <h2 class="title is-2">Housing Allowance</h2>

    <div class="field">
      <label
        class="label"
      >Taking into consideration the size of the family, as well as hospitality expectations of the minister, what is a reasonable monthly rent or mortgage payment for the size and location of an appropriate home?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="housingLocal.monthlyRent">
        <span class="icon is-small is-left">
          <i class="fas fa-home"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label
        class="label"
      >What is homeowners (or renters) insurance for such a home likely to cost each month?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="housingLocal.insurance">
        <span class="icon is-small is-left">
          <i class="fas fa-house-damage"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">What will utilities likely cost?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="housingLocal.utilities">
        <span class="icon is-small is-left">
          <i class="fas fa-lightbulb"></i>
        </span>
      </p>
      <p
        class="help"
      >The Housing Allowance shall include all utilities and other house-related items recognized by the IRS as being covered under the Allowance stipulation. Consideration should be given, therefore, to property taxes, HOA dues, as well as the costs of furnishing, grounds maintenance, home repairs and improvements, and pest control, for example</p>
    </div>

    <div class="field">
      <label class="label">Additional Annual Housing Costs</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="housingLocal.additionalCosts">
        <span class="icon is-small is-left">
          <i class="fas fa-dollar-sign"></i>
        </span>
      </p>
    </div>

    <h4 class="subtitle is-4">Total Housing: {{ housingTotal | currency('$', 0) }}/yr</h4>
  </div>
</template>

<script>
export default {
  name: "HousingAllowance",
  props: ["housing", "housingTotal"],
  computed: {
    housingLocal: {
      get: function() {
        return this.housing;
      },
      set: function(value) {
        this.$emit("update:housing", value);
      }
    }
  }
};
</script>

<style>
</style>
