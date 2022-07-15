<template>
  <div class="section">
    <h2 class="title is-3">Other Expenses</h2>

    <div class="container box">
    
      <div class="field">
        <label class="label">How much should the pastor spend on books and periodical journals?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="10000" v-model.number="otherLocal.books" v-validate="" name="Books">
              <span class="icon is-small is-left">
                <i class="fas fa-book"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('Books') }}</span>
      </div>    
    
      <div class="field">
        <label
          class="label"
        >How much should the pastor spend on continuing education (conferences, classes, etc.)?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="50000" v-model.number="otherLocal.classes" v-validate="" name="ContEd">
              <span class="icon is-small is-left">
                <i class="fas fa-chalkboard-teacher"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('ContEd') }}</span>
      </div>
      
      <div class="field">
        <label
          class="label"
        >A laptop is almost certainly a non-expendable tool for his ministry. If the church is not outright providing one, will you help him financially to keep one functional?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="10000" v-model.number="otherLocal.computer" v-validate="" name="Laptop">
              <span class="icon is-small is-left">
                <i class="fas fa-laptop"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/3 Years</a>
            </div>
          </div>
          <p
            class="help"
          >The calculation will divide the 3 year replacement figure into an annual sum.</p>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('Laptop') }}</span>
      </div>
    
      <div class="field">
        <label
          class="label"
        >A cellphone is almost certainly a non-expendable tool for his ministry. If the church is not outright providing one, will you help him financially to keep one functional?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="1000" v-model.number="otherLocal.cellphone" v-validate="" name="Cellphone">
              <span class="icon is-small is-left">
                <i class="fas fa-mobile"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('Cellphone') }}</span>
      </div>   
    
      <div class="field">
        <label
          class="label"
        >If the church plans to assist in providing a vehicle, indicate the monthly amount below:</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="10000" v-model.number="otherLocal.vehicle" v-validate="" name="Vehicle">
              <span class="icon is-small is-left">
                <i class="fas fa-car"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('Vehicle') }}</span>
      </div>   
      
      <div class="field">
        <label
          class="label"
        >If the church plans to assist in the education expenses for his children, indicate the monthly amount below:</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="100000" v-model.number="otherLocal.childrensEducation" v-validate="" name="ChildEd">
              <span class="icon is-small is-left">
                <i class="fas fa-school"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('ChildEd') }}</span>
      </div>

      <div class="field">
        <label
          class="label"
        >How much will the church contribute each month toward the discharge of student loan or other debt the family carries?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="100000" v-model.number="otherLocal.debt" v-validate="" name="StudentLoan">
              <span class="icon is-small is-left">
                <i class="fas fa-hand-holding-usd"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('StudentLoan') }}</span>
      </div>

      <div class="field">
        <label class="label">Are there other expenses the church would like to help with?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" min="0" max="100000" v-model.number="otherLocal.other" v-validate="" name="OtherExp">
              <span class="icon is-small is-left">
                <i class="fas fa-ellipsis-h"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
        </div>
        <span class="is-italic has-text-danger">{{ errors.first('OtherExp') }}</span>
      </div>
    </div>

    <h4 class="subtitle is-4">Total Other Expenses: {{ otherTotal | currency('$', 0) }}/yr</h4>
  </div>
</template>

<script>
export default {
  name: "OtherExpenses",
  props: ["other", "otherTotal"],
  computed: {
    otherLocal: {
      get: function() {
        return this.other;
      },
      set: function(value) {
        this.$emit("update:other", value);
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
