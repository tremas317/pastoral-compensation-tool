<template>
  <div class="section">
    <h2 class="title is-2">Other Expenses</h2>

    <div class="field">
      <label class="label">Will the church assist in the education of his children? If so, how much?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="otherLocal.childrensEducation">
        <span class="icon is-small is-left">
          <i class="fas fa-school"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label
        class="label"
      >How much will the church contribute each month toward the discharge of student loan or other debt the family caries?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="otherLocal.debt">
        <span class="icon is-small is-left">
          <i class="fas fa-hand-holding-usd"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">How much should the pastor spend on books and periodical journals?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="otherLocal.books">
        <span class="icon is-small is-left">
          <i class="fas fa-book"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label
        class="label"
      >How much should the pastor spend on continuing education (conferences, classes, etc.)?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="otherLocal.classes">
        <span class="icon is-small is-left">
          <i class="fas fa-chalkboard-teacher"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label
        class="label"
      >A laptop is almost certainly a non-expendable tool for his ministry. If the church is not outright providing one, will you help him financially to keep one functional?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="otherLocal.computer">
        <span class="icon is-small is-left">
          <i class="fas fa-laptop"></i>
        </span>
      </p>
      <p class="help">The calculation will divide the 3 year replacement figure into an annual sum.</p>
    </div>

    <div class="field">
      <label
        class="label"
      >A cellphone is almost certainly a non-expendable tool for his ministry. If the church is not outright providing one, will you help him financially to keep one functional?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="otherLocal.cellphone">
        <span class="icon is-small is-left">
          <i class="fas fa-mobile"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">Are there other expenses the church would like to help with?</label>
      <p class="control has-icons-left">
        <input class="input" type="text" v-model="otherLocal.other">
        <span class="icon is-small is-left">
          <i class="fas fa-ellipsis-h"></i>
        </span>
      </p>
    </div>

    <h4 class="subtitle is-4">Total Other Expenses: {{ otherTotal | currency('$', 0) }}/yr</h4>
  </div>
</template>

<script>
export default {
  name: "OtherExpenses",
  props: ["other", "otherTotal", "otherHealthcare"],
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

<style>
</style>
