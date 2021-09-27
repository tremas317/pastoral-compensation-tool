<template>
  <div class="section">
    <h2 class="title is-3">Other Expenses</h2>

    <div class="container box">
    
      <div class="field">
        <label class="label">How much should the pastor spend on books and periodical journals?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.books">
              <span class="icon is-small is-left">
                <i class="fas fa-book"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
        </div>
      </div>    
    
      <div class="field">
        <label
          class="label"
        >How much should the pastor spend on continuing education (conferences, classes, etc.)?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.classes">
              <span class="icon is-small is-left">
                <i class="fas fa-chalkboard-teacher"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
        </div>
      </div>
      
      <div class="field">
        <label
          class="label"
        >A laptop is almost certainly a non-expendable tool for his ministry. If the church is not outright providing one, will you help him financially to keep one functional?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.computer">
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
      </div>
    
      <div class="field">
        <label
          class="label"
        >A cellphone is almost certainly a non-expendable tool for his ministry. If the church is not outright providing one, will you help him financially to keep one functional?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.cellphone">
              <span class="icon is-small is-left">
                <i class="fas fa-mobile"></i>
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
        >If the church plans to assist in providing a vehicle, indicate the monthly amount below:</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.vehicle">
              <span class="icon is-small is-left">
                <i class="fas fa-car"></i>
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
        >If the church plans to assist in the education expenses for his children, indicate the monthly amount below:</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.childrensEducation">
              <span class="icon is-small is-left">
                <i class="fas fa-school"></i>
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
        >How much will the church contribute each month toward the discharge of student loan or other debt the family caries?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.debt">
              <span class="icon is-small is-left">
                <i class="fas fa-hand-holding-usd"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Month</a>
            </div>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Are there other expenses the church would like to help with?</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="otherLocal.other">
              <span class="icon is-small is-left">
                <i class="fas fa-ellipsis-h"></i>
              </span>
            </p>
            <div class="control">
              <a class="button is-static">$/Year</a>
            </div>
          </div>
        </div>
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
