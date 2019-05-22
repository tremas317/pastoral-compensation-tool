<template>
  <section class="section" id="app">
    <div class="container">
      <h1 class="title is-1">Pastoral Compensation Tool</h1>
      <BasicSalary :basic.sync="salary.basic" :basicTotal="basicTotal"/>
      <HousingAllowance :housing.sync="salary.housing" :housingTotal="housingTotal"/>
      <Healthcare
        :healthcare.sync="salary.healthcare"
        :computedHealthcare="computedSalary.healthcare"
        :healthcareTotal="healthcareTotal"
      />
      <OtherExpenses :other.sync="salary.other" :otherTotal="otherTotal"/>
      <h3 class="subtitle is-3">Total Package: {{ totalPackage | currency('$', 0) }}/yr</h3>
    </div>
  </section>
</template>

<script>
import BasicSalary from "./components/BasicSalary";
import HousingAllowance from "./components/HousingAllowance";
import Healthcare from "./components/Healthcare";
import OtherExpenses from "./components/OtherExpenses";

export default {
  name: "app",
  components: {
    BasicSalary,
    HousingAllowance,
    Healthcare,
    OtherExpenses
  },
  data() {
    return {
      salary: {
        basic: {
          region: "48 Contiguous & DC",
          regionOptions: ["48 Contiguous & DC", "Alaska", "Hawaii"],
          persons: 4,
          yearsOfService: 0
        },
        housing: {
          monthlyRent: 1700,
          insurance: 100,
          utilities: 300,
          additionalCosts: 500
        },
        healthcare: {
          healthInsurace: 350,
          lifeInsurance: 50,
          disabilityInsurance: 100,
          isOptedOut: "Yes",
          pensionPercent: 10
        },
        other: {
          childrensEducation: 0,
          debt: 0,
          books: 700,
          classes: 250,
          computer: 2000,
          cellphone: 60,
          other: 0
        }
      }
    };
  },
  computed: {
    computedSalary() {
      return {
        healthcare: {
          medicare: Math.ceil(this.basicTotal * 0.0145),
          socialSecurity: Math.ceil(this.basicTotal * 0.062)
        }
      };
    },
    basicTotal() {
      let total = 0;
      if (this.salary.basic.region == "48 Contiguous & DC") {
        total += 12140 + 4320 * (this.salary.basic.persons - 1);
      } else if (this.salary.basic.region == "Alaska") {
        total += 15180 + 5400 * (this.salary.basic.persons - 1);
      } else if (this.salary.basic.region == "Hawaii") {
        total += 13960 + 4970 * (this.salary.basic.persons - 1);
      }
      if (this.salary.basic.yearsOfService != 0) {
        total += this.salary.basic.yearsOfService * 0.03 * total;
      }

      return total;
    },
    housingTotal() {
      return (
        this.salary.housing.monthlyRent * 12 +
        this.salary.housing.insurance * 12 +
        this.salary.housing.utilities * 12 +
        this.salary.housing.additionalCosts
      );
    },
    healthcareTotal() {
      return (
        this.salary.healthcare.healthInsurace * 12 +
        this.salary.healthcare.lifeInsurance * 12 +
        this.salary.healthcare.disabilityInsurance * 12 +
        this.computedSalary.healthcare.medicare +
        this.computedSalary.healthcare.socialSecurity +
        (this.basicTotal + this.housingTotal) *
          (1 / this.salary.healthcare.pensionPercent)
      );
    },
    otherTotal() {
      return (
        this.salary.other.childrensEducation * 12 +
        this.salary.other.debt * 12 +
        this.salary.other.books +
        this.salary.other.classes +
        this.salary.other.computer / 3 +
        this.salary.other.cellphone * 12 +
        this.salary.other.other
      );
    },
    totalPackage() {
      return (
        this.basicTotal +
        this.housingTotal +
        this.healthcareTotal +
        this.otherTotal
      );
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
