<template>
  <div class="section">
    <h2 class="title is-3">Retirement & Insurance Benefits</h2>

    <div class="container box">
      <h4 class="title is-4">Retirement</h4>

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

      <div class="field" v-if="healthcareLocal.isOptedOut === 'No'">
        <label class="label">
          Since ministers are to pay social security and medicare taxes as mandated by SECA (as self-employed workers), they are to make the full contribution. The minister's social security and medicare taxes (calculated from base salary and housing allowance) are as follows:
        </label>
      </div>

      <div class="field" v-if="healthcareLocal.isOptedOut === 'No'">
        <label class="label">Medicare:</label>
        <p class="control has-icons-left">
          <input
            class="input is-static"
            type="number"
            v-model.number="computedHealthcare.medicare"
            readonly
          >
          <span class="icon is-small is-left">
            <i class="fas fa-user-md"></i>
          </span>
        </p>
      </div>

      <div class="field" v-if="healthcareLocal.isOptedOut === 'No'">
        <label class="label">Social Security:</label>
        <p class="control has-icons-left">
          <input
            class="input is-static"
            type="number"
            v-model.number="computedHealthcare.socialSecurity"
            readonly
          >
          <span class="icon is-small is-left">
            <i class="fas fa-money-bill"></i>
          </span>
        </p>
      </div>

      <div class="field" v-if="healthcareLocal.isOptedOut === 'No'">
        <label class="label">Total SECA Taxes:</label>
        <p class="control has-icons-left">
          <input
            class="input is-static"
            type="number"
            v-model.number="computedHealthcare.totalSECA"
            readonly
          >
          <span class="icon is-small is-left">
            <i class="fas fa-money-bill"></i>
          </span>
        </p>
      </div>

      <div class="field" v-if="healthcareLocal.isOptedOut === 'No'">
        <label class="label"><u>The ongoing recommendation has been that churches pay one half of a minister's social security and medicare taxes in the form of increased salary.</u></label>
      </div>

      <div class="field" v-if="healthcareLocal.isOptedOut === 'No'">
        <label class="label">What percent will the church contribute in increased salary toward helping the minister pay his SECA taxes? </label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="healthcareLocal.SECAPercent">
              <span class="icon is-small is-left">
                <i class="fas fa-percent"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">Percent</a>
            </div>
          </div>
        </div>
      </div>

      <div class="field" v-if="healthcareLocal.isOptedOut === 'Yes'">
        <label class="label">How much will the church contribute on a yearly basis toward a minister's retirement in addition to the regular contribution to the minister’s retirement pension account (as though he was in social security and the church was paying one half of his social security and medicare taxes)?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="healthcareLocal.optOutContribution">
              <span class="icon is-small is-left">
                <i class="fas fa-money-bill"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
          <p
            class="help"
          >Recommended Amount: ${{ computedHealthcare.halfSECA }} (One half of SECA Taxes)</p>
        </div>
      </div>

      <div class="field">
        <label
          class="label"
        >The OPC recommends that the church contribute 10% of a man's basic package (salary + housing) in a retirement account as a pension. What percent will your church contribute?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="healthcareLocal.pensionPercent">
              <span class="icon is-small is-left">
                <i class="fas fa-percent"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">Percent</a>
            </div>
          </div>
        </div>
      </div>

      <h4 class="title is-4">Insurance</h4>
      <div class="field">
        <label class="label">How much will his healthcare cost monthly?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="healthcareLocal.healthInsurace">
              <span class="icon is-small is-left">
                <i class="fas fa-user-md"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
          <p
            class="help"
          >Taking into consideration the size of his family and the ages of family members, and your love for his family, what health care coverages should be provided? Actually get quotes. If you determine that a high deductible plan would be desirable for all involved, make sure that there is enough discretionary income in his package to cover the deductible.</p>
        </div>
      </div>

      <div class="field">
        <label class="label">How much will his life insurance cost monthly?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="healthcareLocal.lifeInsurance">
              <span class="icon is-small is-left">
                <i class="fas fa-life-ring"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
          <p class="help">
            There are numerous calculators available to determine how much life insurance a man should carry. Using such a tool or competent counsel, get quotes for a man of his age and health. See e.g.,
            <a
              href="www.lifehappens.org/life-insurance-needs-calculator/"
            >www.lifehappens.org/life-insurance-needs-calculator/</a>
          </p>
        </div>
      </div>

      <div class="field">
        <label class="label">How much will his disability insurance cost monthly?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input
                class="input"
                type="number"
                v-model.number="healthcareLocal.disabilityInsurance"
              >
              <span class="icon is-small is-left">
                <i class="fas fa-wheelchair"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
          <p
            class="help"
          >Disability insurance is a very inexpensive way of guarding both the pastor’s care and the church’s budget. How much will his monthly premiums be? Note: this should be included in his salary and taxed.</p>
        </div>
      </div>
    </div>

    <h4
      class="subtitle is-4"
    >Total Retirement and Insurance Benefits: {{ healthcareTotal | currency('$', 0) }}/yr</h4>
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

<style scoped>
.container {
  background: #eeeeee;
  padding: 10px;
}
</style>
