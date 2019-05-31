<template>
  <div class="section">
    <h2 class="title is-2">Basic Salary</h2>

    <div class="container">
      <div class="field">
        <label class="label">This call is applicable to:</label>
        <p class="control has-icons-left">
          <span class="select">
            <select v-model="basicLocal.region">
              <option
                v-bind:key="index"
                v-for="(value, name, index) in basicLocal.regionOptions"
                v-bind:value="value"
              >{{ value }}</option>
            </select>
          </span>
          <span class="icon is-small is-left">
            <i class="fas fa-globe-americas"></i>
          </span>
        </p>
      </div>

      <div class="field">
        <label class="label">How many persons does the household support?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="basicLocal.persons">
              <span class="icon is-small is-left">
                <i class="fas fa-users"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">Persons</a>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">What year of service as a minister is the man entering into?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="basicLocal.yearsOfService">
              <span class="icon is-small is-left">
                <i class="fas fa-calendar-alt"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">Years</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4 class="subtitle is-4">Total Base Salary: {{ basicTotal | currency('$', 0) }}/yr</h4>
  </div>
</template>

<script>
export default {
  name: "BasicSalary",
  props: ["basic", "basicTotal"],
  computed: {
    basicLocal: {
      get: function() {
        return this.basic;
      },
      set: function(value) {
        this.$emit("update:basic", value);
      }
    }
  }
};
</script>

<style scoped>
.container {
  background: #d5eed2;
  padding: 10px;
}
</style>

