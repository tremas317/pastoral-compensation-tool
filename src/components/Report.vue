<template>
  <div class="section" id="report">
  <article class="message">
  <div class="message-header is-size-3">
    Pastoral Compensation Report
    </div>
  <div class="message-body">
    
    <div class="columns">
      <div class="column">
          <button class="button is-medium is-primary" @click="print">
          <span class="icon">
            <i class="fas fa-print"></i>
          </span>
          <span>Print Report</span>
        </button>
    
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
                <td class="has-text-right">{{ basicSalary.basicLivingExpenses | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Experience Adjustment</td>
                <td class="has-text-right">{{ basicSalary.experienceAdjustment | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Salary Base</td>
                <td class="has-text-weight-bold has-text-right">{{ basicSalary.total | currency('$', 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="section">
          <h4 class="subtitle is-4">Retirement and Insurance Benefits</h4>
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
                <td class="has-text-right">{{ isOptedOut }}</td>
              </tr>
              <tr v-if="isOptedOut=='No'">
                <td>SECA Taxes Contribution</td>
                <td class="has-text-right">{{ healthcareSalary.medicare + healthcareSalary.socialSecurity | currency('$', 0) }}</td>
              </tr>
              <tr v-if="isOptedOut=='Yes'">
                <td>SECA Taxes Contribution</td>
                <td class="has-text-right">{{ healthcareSalary.optOutContribution | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Medical Care</td>
                <td class="has-text-right">{{ healthcareSalary.medicalCare | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Life Insurance</td>
                <td class="has-text-right">{{ healthcareSalary.lifeInsurance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Disability Insurance</td>
                <td class="has-text-right">{{ healthcareSalary.disabilityInsurance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Retirement Contribution</td>
                <td class="has-text-right">{{ healthcareSalary.retirementContribution | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Retirement and Insurance Benefits</td>
                <td class="has-text-weight-bold has-text-right">{{ healthcareSalary.total | currency('$', 0) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="column">
      
        <div v-if="!reportLocal.showCallVue">
        <button class="button is-medium is-info" @click="genCallLetter">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span>Generate Call Letter</span>
        </button>
        </div>
    
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
                <td class="has-text-right">{{ housingSalary.mortgageOrRent | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Housing Insurance</td>
                <td class="has-text-right">{{ housingSalary.housingInsurance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Utilities, etc.</td>
                <td class="has-text-right">{{ housingSalary.utilities | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Other Housing Expenses</td>
                <td class="has-text-right">{{ housingSalary.otherHousingExpenses | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Housing</td>
                <td class="has-text-weight-bold has-text-right">{{ housingSalary.total | currency('$', 0) }}</td>
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
                <td>Book Allowance</td>
                <td class="has-text-right">{{ otherSalary.bookAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Continuing Education</td>
                <td class="has-text-right">{{ otherSalary.continuingEducation | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Computer Allowance</td>
                <td class="has-text-right">{{ otherSalary.computerAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Phone Allowance</td>
                <td class="has-text-right">{{ otherSalary.phoneAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Vehicle Allowance</td>
                <td class="has-text-right">{{ otherSalary.vehicleAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Education Allowance</td>
                <td class="has-text-right">{{ otherSalary.educationAllowance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Debt Discharge Assistance</td>
                <td class="has-text-right">{{ otherSalary.debtDischargeAssistance | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td>Other Package Adjustment</td>
                <td class="has-text-right">{{ otherSalary.otherPackageAdjustment | currency('$', 0) }}</td>
              </tr>
              <tr>
                <td class="has-text-weight-bold">Total Other Expenses</td>
                <td class="has-text-weight-bold has-text-right">{{ otherSalary.total | currency('$', 0) }}</td>
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
    
    </div></article>
  </div>
</template>

<script>
export default {
  name: "Report",
  props: [    
    "report",
    "basicSalary",
    "housingSalary",
    "healthcareSalary",
    "otherSalary",
    "totalSalary",
    "isOptedOut",
  ],
  computed: {
    reportLocal: {
      get: function() {
        return this.report;
      },
      set: function(value) {
        this.$emit("update:report", value);
      }
    }
  },
  methods: {
    print() {
      this.$htmlToPaper("report");
    },
    
    genCallLetter() {
        this.reportLocal.showCallVue = true;
        document.getElementById('CallPosition').scrollIntoView()
    }
  }
};
</script>

<style scoped>
.section {
  padding: 15px 0;
}
</style>
