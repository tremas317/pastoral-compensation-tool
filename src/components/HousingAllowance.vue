<template>
  <div class="section">
    <h2 class="title is-3">Housing Allowance</h2>

    <div class="container box">
      <div class="field">
        <label
          class="label"
        >Taking into consideration the size of the family, as well as hospitality expectations of the minister, what is a reasonable monthly rent or mortgage payment for the size and location of an appropriate home?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="housingLocal.monthlyRent">
              <span class="icon is-small is-left">
                <i class="fas fa-home"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >What is homeowners (or renters) insurance for such a home likely to cost each month?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="housingLocal.insurance">
              <span class="icon is-small is-left">
                <i class="fas fa-house-damage"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">What will utilities likely cost?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="housingLocal.utilities">
              <span class="icon is-small is-left">
                <i class="fas fa-lightbulb"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
          <p
            class="help"
          >The Housing Allowance shall include all utilities and other house-related items recognized by the IRS as being covered under the Allowance stipulation. Consideration should be given, therefore, to property taxes, HOA dues, as well as the costs of furnishings, grounds maintenance, home repairs and improvements, and pest control, etc.</p>
        </div>
      </div>

      <div class="field">
        <label class="label">Additional Annual Housing Costs</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="housingLocal.additionalCosts">
              <span class="icon is-small is-left">
                <i class="fas fa-dollar-sign"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
        </div>
      </div>
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

<style scoped>
.container {
  background: #eeeeee;
  padding: 10px;
}
</style>
