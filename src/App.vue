<template>
  <section class="section" id="app">
    <div class="container">
      <h1 class="title is-1">Pastoral Compensation Tool</h1>
      <BasicSalary :basic.sync="salary.basic" :basicTotal="basicTotal.total"/>
      <HousingAllowance :housing.sync="salary.housing" :housingTotal="housingTotal.total"/>
      <Healthcare
        :healthcare.sync="salary.healthcare"
        :computedHealthcare="computedSalary.healthcare"
        :healthcareTotal="healthcareTotal.total"
      />
      <OtherExpenses :other.sync="salary.other" :otherTotal="otherTotal.total"/>
      <div class="section">
        <h3
          class="subtitle is-3 has-text-weight-bold"
        >Total Package: {{ totalPackage | currency('$', 0) }}/yr</h3>
      </div>

      <Report
        :basicSalary="basicTotal"
        :housingSalary="housingTotal"
        :healthcareSalary="healthcareTotal"
        :otherSalary="otherTotal"
        :totalSalary="totalPackage"
        :isOptedOut.sync="salary.healthcare.isOptedOut"
      />
    </div>
  </section>
</template>

<script>
import BasicSalary from "./components/BasicSalary";
import HousingAllowance from "./components/HousingAllowance";
import Healthcare from "./components/Healthcare";
import OtherExpenses from "./components/OtherExpenses";
import Report from "./components/Report";

export default {
  name: "app",
  components: {
    BasicSalary,
    HousingAllowance,
    Healthcare,
    OtherExpenses,
    Report
  },
  data() {
    return {
      salary: {
        basic: {
          region: "48 Contiguous, DC & Canada",
          regionOptions: ["48 Contiguous, DC & Canada", "Alaska", "Hawaii"],
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
          isOptedOut: "No",
          SECAPercent: 50,
          optOutContribution: 0,
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
          medicare: Math.ceil((this.basicTotal.total + this.housingTotal.total) * 0.029),
          socialSecurity: Math.ceil((this.basicTotal.total + this.housingTotal.total) * 0.124),
          totalSECA: Math.ceil((this.basicTotal.total + this.housingTotal.total) * 0.029) + Math.ceil((this.basicTotal.total + this.housingTotal.total) * 0.124),
          halfSECA: Math.ceil((Math.ceil((this.basicTotal.total + this.housingTotal.total) * 0.029) + Math.ceil((this.basicTotal.total + this.housingTotal.total) * 0.124)) / 2)
        }
      };
    },
    basicTotal() {
      let basicLivingExpenses = 0;
      if (this.salary.basic.region == "48 Contiguous, DC & Canada") {
        basicLivingExpenses +=
          18735 + 6630 * ((parseInt(this.salary.basic.persons) || 0) - 1);
      } else if (this.salary.basic.region == "Alaska") {
        basicLivingExpenses +=
          23400 + 8295 * ((parseInt(this.salary.basic.persons) || 0) - 1);
      } else if (this.salary.basic.region == "Hawaii") {
        basicLivingExpenses +=
          21570 + 7620 * ((parseInt(this.salary.basic.persons) || 0) - 1);
      }

      let experienceAdjustment = 0;
      if ((parseInt(this.salary.basic.yearsOfService) || 0) !== 0) {
        experienceAdjustment +=
          (parseInt(this.salary.basic.yearsOfService) || 0) *
          0.03 *
          basicLivingExpenses;
      }

      return {
        total: basicLivingExpenses + experienceAdjustment,
        basicLivingExpenses: basicLivingExpenses,
        experienceAdjustment: experienceAdjustment
      };
    },
    housingTotal() {
      let mortgageOrRent =
        (parseInt(this.salary.housing.monthlyRent) || 0) * 12;
      let housingInsurance =
        (parseInt(this.salary.housing.insurance) || 0) * 12;
      let utilities = (parseInt(this.salary.housing.utilities) || 0) * 12;
      let otherHousingExpenses =
        parseInt(this.salary.housing.additionalCosts) || 0;

      return {
        total:
          mortgageOrRent + housingInsurance + utilities + otherHousingExpenses,
        mortgageOrRent: mortgageOrRent,
        housingInsurance: housingInsurance,
        utilities: utilities,
        otherHousingExpenses: otherHousingExpenses
      };
    },
    healthcareTotal() {
      let medicalCare =
        parseInt(this.salary.healthcare.healthInsurace || 0) * 12;
      let lifeInsurace =
        (parseInt(this.salary.healthcare.lifeInsurance) || 0) * 12;
      let disabilityInsurance =
        (parseInt(this.salary.healthcare.disabilityInsurance) || 0) * 12;
      let medicare = parseInt(this.computedSalary.healthcare.medicare * (this.salary.healthcare.SECAPercent / 100)) || 0;
      let socialSecurity =
        parseInt(this.computedSalary.healthcare.socialSecurity * (this.salary.healthcare.SECAPercent / 100)) || 0;
      let optOutContribution = parseInt(this.salary.healthcare.optOutContribution) || 0;

      let retirementContribution = 0;
      if ((parseInt(this.salary.healthcare.pensionPercent) || 0) !== 0) {
        retirementContribution =
          ((parseInt(this.basicTotal.total) || 0) +
            (parseInt(this.housingTotal.total) || 0)) *
          ((parseInt(this.salary.healthcare.pensionPercent) || 0) / 100);
      }

      if (this.salary.healthcare.isOptedOut == "No") {
        return {
          total:
            medicalCare +
            lifeInsurace +
            disabilityInsurance +
            medicare +
            socialSecurity +
            retirementContribution,
          medicalCare: medicalCare,
          lifeInsurance: lifeInsurace,
          disabilityInsurance: disabilityInsurance,
          medicare: medicare,
          socialSecurity: socialSecurity,
          retirementContribution: retirementContribution
        }
      } else {
        return {
          total:
            medicalCare +
            lifeInsurace +
            disabilityInsurance +
            optOutContribution +
            retirementContribution,
          medicalCare: medicalCare,
          lifeInsurance: lifeInsurace,
          disabilityInsurance: disabilityInsurance,
          optOutContribution: optOutContribution,
          retirementContribution: retirementContribution
        };
      }
    },
    otherTotal() {
      let educationAllowance =
        (parseInt(this.salary.other.childrensEducation) || 0) * 12;
      let debtDischargeAssistance =
        (parseInt(this.salary.other.debt) || 0) * 12;
      let bookAllowance = parseInt(this.salary.other.books) || 0;
      let continuingEducation = parseInt(this.salary.other.classes) || 0;
      let computerAllowance = (parseInt(this.salary.other.computer) || 0) / 3;
      let phoneAllowance = (parseInt(this.salary.other.cellphone) || 0) * 12;
      let otherPackageAdjustment = parseInt(this.salary.other.other) || 0;

      return {
        total:
          educationAllowance +
          debtDischargeAssistance +
          bookAllowance +
          continuingEducation +
          computerAllowance +
          phoneAllowance +
          otherPackageAdjustment,
        educationAllowance: educationAllowance,
        debtDischargeAssistance: debtDischargeAssistance,
        bookAllowance: bookAllowance,
        continuingEducation: continuingEducation,
        computerAllowance: computerAllowance,
        phoneAllowance: phoneAllowance,
        otherPackageAdjustment: otherPackageAdjustment
      };
    },
    totalPackage() {
      return (
        this.basicTotal.total +
        this.housingTotal.total +
        this.healthcareTotal.total +
        this.otherTotal.total
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
}
</style>

<style lang="scss">
$input-background-color: whitesmoke;

@import "~bulma/bulma";
</style>
