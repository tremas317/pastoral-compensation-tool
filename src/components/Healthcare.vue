<template>
  <div class="section">
    <h2 class="title is-2">Healthcare & Retirement</h2>

    <h4 class="title is-4">Insurance</h4>
    <div class="field">
      <label class="label">How much will his healthcare cost monthly?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="healthcareLocal.healthInsurace">
        <span class="icon is-small is-left">
          <i class="fas fa-user-md"></i>
        </span>
      </p>
      <p
        class="help"
      >Taking into consideration the size of his family and the ages of family members, and your love for his family, what health care coverages should be provided? Actually get quotes. If you determine that a high deductible plan would be desirable for all involved, make sure that there is enough discretionary income in his package to cover the deductible.</p>
    </div>

    <div class="field">
      <label class="label">How much will his life insurance cost monthly?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="healthcareLocal.lifeInsurance">
        <span class="icon is-small is-left">
          <i class="fas fa-life-ring"></i>
        </span>
      </p>
      <p class="help">
        There are numerous calculators available to determine how much life insurance a man should carry. Using such a tool or competent counsel, get quotes for a man of his age and health. See e.g.,
        <a
          href="www.lifehappens.org/life-insurance-needs-calculator/"
        >www.lifehappens.org/life-insurance-needs-calculator/</a>
      </p>
    </div>

    <div class="field">
      <label class="label">How much will his disability insurance cost monthly?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="healthcareLocal.disabilityInsurance">
        <span class="icon is-small is-left">
          <i class="fas fa-wheelchair"></i>
        </span>
      </p>
      <p
        class="help"
      >Disability insurance is a very inexpensive way of guarding both the pastor’s care and the church’s budget. How much will his monthly premiums be? Note: this should be included in his salary and taxed.</p>
    </div>

    <h4 class="title is-4">Retirement</h4>

    <div class="field">
      <label class="label">How much will his medicare cost yearly?</label>
      <p class="control has-icons-left">
        <input class="input is-static" type="text" v-model="computedHealthcare.medicare" readonly>
        <span class="icon is-small is-left">
          <i class="fas fa-user-md"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">How much will his social security cost yearly?</label>
      <p class="control has-icons-left">
        <input
          class="input is-static"
          type="text"
          v-model="computedHealthcare.socialSecurity"
          readonly
        >
        <span class="icon is-small is-left">
          <i class="fas fa-money-bill"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">Has the minister opted out of Social Security?</label>
      <p class="control">
        <span class="select">
          <select v-model="healthcareLocal.isOptedOut">
            <option>Yes</option>
            <option>No</option>
          </select>
        </span>
      </p>
    </div>

    <div class="field">
      <label
        class="label"
      >The OPC recommends that the church contribute 10% of a man's basic package (salary + housing) in a retirement account as a pension. What percent will your church contribute?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="healthcareLocal.pensionPercent">
        <span class="icon is-small is-left">
          <i class="fas fa-percent"></i>
        </span>
      </p>
    </div>

    <h4
      class="subtitle is-4"
    >Total Health/Life Insurance and Retirement: {{ healthcareTotal | currency('$', 0) }}/yr</h4>
  </div>
</template>

<script>
export default {
  name: "Healthcare",
  props: ["healthcare", "healthcareTotal", "computedHealthcare"],
  computed: {
    healthcareLocal: {
      get: function() {
        return this.healthcare;
      },
      set: function(value) {
        this.$emit("update:healthcare", value);
      }
    }
  }
};
</script>

<style>
</style>
