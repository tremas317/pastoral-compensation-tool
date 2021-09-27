<template>
  <div class="section" id="report">
    <h2 class="title is-2">Pastoral Compensation Report</h2>
    <button class="button is-medium is-success" @click="print">
      <span class="icon">
        <i class="fas fa-print"></i>
      </span>
      <span>Print Report</span>
    </button>
	
    <button class="button is-medium is-success">
      <span class="icon">
        <i class="fas fa-print"></i>
      </span>
      <span>Generate Call Letter</span>
    </button>
	
    <div class="columns">
      <div class="column">
        <div class="section">
          <h4 class="subtitle is-4">Basic Salary</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Basic Living Expenses</td>
                <td>{{ basicSalary.basicLivingExpenses | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Experience Adjustment</td>
                <td>{{ basicSalary.experienceAdjustment | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Salary Base</td>
                <td class="has-text-weight-bold">{{ basicSalary.total | currency('$', 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="section">
          <h4 class="subtitle is-4">Healthcare and Retirement</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Opted Out of Social Security?</td>
                <td>{{ isOptedOut }}</td>
              </tr>
              <tr v-if="isOptedOut=='No'">
                <td>SECA Taxes Contribution</td>
                <td>{{ healthcareSalary.medicare + healthcareSalary.socialSecurity | currency('$', 0) }}</td>
              </tr>
              <tr v-if="isOptedOut=='Yes'">
                <td>SECA Taxes Contribution</td>
                <td>{{ healthcareSalary.optOutContribution | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Medical Care</td>
                <td>{{ healthcareSalary.medicalCare | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Life Insurance</td>
                <td>{{ healthcareSalary.lifeInsurance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Disability Insurance</td>
                <td>{{ healthcareSalary.disabilityInsurance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Retirement Contribution</td>
                <td>{{ healthcareSalary.retirementContribution | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Health/Life Insurance and Retirement</td>
                <td class="has-text-weight-bold">{{ healthcareSalary.total | currency('$', 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="column">
        <div class="section">
          <h4 class="subtitle is-4">Housing Allowance</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mortgage or Rent</td>
                <td>{{ housingSalary.mortgageOrRent | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Housing Insurance</td>
                <td>{{ housingSalary.housingInsurance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Utilities, etc.</td>
                <td>{{ housingSalary.utilities | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Other Housing Expenses</td>
                <td>{{ housingSalary.otherHousingExpenses | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Housing</td>
                <td class="has-text-weight-bold">{{ housingSalary.total | currency('$', 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="section">
          <h4 class="subtitle is-4">Other Expenses</h4>
          <table class="table is-striped">
            <thead>
              <tr>
                <th>Category</th>
                <th>Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Education Allowance</td>
                <td>{{ otherSalary.educationAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Debt Discharge Assistance</td>
                <td>{{ otherSalary.debtDischargeAssistance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Book Allowance</td>
                <td>{{ otherSalary.bookAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Continuing Education</td>
                <td>{{ otherSalary.continuingEducation | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Computer Allowance</td>
                <td>{{ otherSalary.computerAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Phone Allowance</td>
                <td>{{ otherSalary.phoneAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Other Package Adjustment</td>
                <td>{{ otherSalary.otherPackageAdjustment | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Other Expenses</td>
                <td class="has-text-weight-bold">{{ otherSalary.total | currency('$', 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="box">
      <h4
        class="subtitle is-4 has-text-weight-bold"
      >Total Package: {{ totalSalary | currency('$', 0) }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Report",
  props: [
    "basicSalary",
    "housingSalary",
    "healthcareSalary",
    "otherSalary",
    "totalSalary",
    "isOptedOut"
  ],
  methods: {
    print() {
      this.$htmlToPaper("report");
    }
  }
};
</script>

<style scoped>
.section {
  padding: 15px 0;
}
</style>
