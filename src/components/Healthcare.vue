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
              <input class="input" type="number" min="0" max="100" v-model.number="healthcareLocal.SECAPercent" v-validate="" name=SecaPct>
              <span class="icon is-small is-left">
                <i class="fas fa-percent"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">Percent</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('SecaPct') }}</span>
      </div>

      <div class="field" v-if="healthcareLocal.isOptedOut === 'Yes'">
        <label class="label">How much will the church contribute on a yearly basis toward a minister's retirement in addition to the regular contribution to the minister’s retirement account (as though he was in social security and the church was paying one half of his social security and medicare taxes)?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number"  min=0 max=100000 v-model.number="healthcareLocal.optOutContribution" v-validate="" name="RetireContrib">
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
        <span class="is-italic has-text-danger">{{ errors.first('RetireContrib') }}</span>
      </div>

      <div class="field">
        <label
          class="label"
        >The OPC recommends that the church contribute 10% of a man's basic package (salary + housing) in a retirement account. What percent will your church contribute?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="100" v-model.number="healthcareLocal.pensionPercent" v-validate="" name="RetirePct">
              <span class="icon is-small is-left">
                <i class="fas fa-percent"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">Percent</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('RetirePct') }}</span>
      </div>

      <h4 class="title is-4">Insurance</h4>
      <div class="field">
        <label class="label">How much will his healthcare cost monthly?</label>
        <div class="control">
            <div class="columns">
                <div class="column is-one-quarter">          
                    <div class="field has-addons">
                        <p class="control has-icons-left">
                            <input class="input" type="number" min="0" max="10000" v-model.number="healthcareLocal.healthInsurace" v-validate="" name="HealthIns">
                            <span class="icon is-small is-left">
                                <i class="fas fa-user-md"></i>
                            </span>
                        </p>
                        <div class="control">
                            <a class="button is-static">$/Month</a>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <!-- <a target="_blank" href="http://opcbenefits.decisely.com/" class="button is-link">
                    <span class="icon">
                        <i class="fas fa-external-link-alt"></i>
                    </span>
                    <span>Enter OPC Ministers Insurance Portal</span>
                    </a> -->
                </div>
            </div>
            <p class="help">Taking into consideration the size of his family and the ages of family members, and your love for his family, what health care coverages should be provided? Actually get quotes. If you determine that a high deductible plan would be desirable for all involved, make sure that there is enough discretionary income in his package to cover the deductible.</p>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('HealthIns') }}</span>
      </div>

      <div class="field">
        <label class="label">How much will his life insurance cost monthly?</label>
        <div class="control">
            <div class="columns">
                <div class="column is-one-quarter">          
                    <div class="field has-addons">
                        <p class="control has-icons-left">
                            <input class="input" type="number" min="0" max="5000" v-model.number="healthcareLocal.lifeInsurance" v-validate="" name="LifeIns">
                            <span class="icon is-small is-left">
                                <i class="fas fa-life-ring"></i>
                            </span>
                        </p>
                        <div class="control">
                            <a class="button is-static">$/Month</a>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <button class="button js-modal-trigger is-link" data-target="modal-lifeins-box">
                    <span class="icon">
                        <i class="fas fa-info-circle"></i>
                    </span>
                    <span>Schedule a Consultation</span>
                    </button>
                </div>
            </div>                
            <p class="help">There are numerous calculators available to determine how much life insurance a man should carry. Using such a tool or competent counsel, get quotes for a man of his age and health. See e.g.,
                    <a href="www.lifehappens.org/life-insurance-needs-calculator/">www.lifehappens.org/life-insurance-needs-calculator/</a></p>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('LifeIns') }}</span>
      </div>

      <div class="field">
        <label class="label">How much will his disability insurance cost monthly?</label>
        <div class="control">
            <div class="columns">
                <div class="column is-one-quarter">          
                    <div class="field has-addons">
                        <p class="control has-icons-left">
                            <input class="input" type="number" min="0" max="5000" v-model.number="healthcareLocal.disabilityInsurance" v-validate="" name="DisabilityIns">
                            <span class="icon is-small is-left">
                                <i class="fas fa-wheelchair"></i>
                            </span>
                        </p>
                        <div class="control">
                            <a class="button is-static">$/Month</a>
                        </div>
                    </div>
                </div>
                <!-- <div class="column">
                    <a target="_blank" href="http://opcbenefits.decisely.com/" class="button is-link">
                    <span class="icon">
                        <i class="fas fa-external-link-alt"></i>
                    </span>
                    <span>Enter OPC Ministers Insurance Portal</span>
                    </a>
                </div> -->
            </div>
          <p class="help">Disability insurance is a very inexpensive way of guarding both the pastor’s care and the church’s budget. How much will his monthly premiums be? Note: this should be included in his salary and taxed.</p>
        </div>
      </div>
      <span class="is-italic has-text-danger">{{ errors.first('DisabilityIns') }}</span>
    </div>

    <h4
      class="subtitle is-4"
    >Total Retirement and Insurance Benefits: {{ healthcareTotal | currency('$', 0) }}/yr</h4>
    <div id="modal-lifeins-box" class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Schedule a Life Insurance Consultation</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <p>The right amount of life insurance depends on a number of key variables. In most cases, life insurance for ministers should be in the $500,000 to $1,000,000 benefit range. </p>
                <br />
                <p>CMC recommends consulting with our partners at Drake, Lehner, & Morgan, who can help customize the right life insurance plan for each minister. They can be reached at (609) 747-1901, ext 323</p>
                <br />
                <p>Within the OPC Ministers Insurance Portal, life insurance is available up to $100,000 only. This type of life insurance is called guaranteed issue life insurance and requires no health exam and excludes no pre-existing conditions. Guaranteed issue life insurance is helpful for covering basic end-of-life expenses, but is not sufficient to support a family in the event of a minister's unexpected death.</p>
            </section>
            <footer class="modal-card-foot"></footer>
        </div>
    </div>    
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
