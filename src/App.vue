<template>
  <section class="section" id="app">
    <div class="container">
      <section class="hero is-small" style="background-image: url(https://opccmc.org/wp-content/uploads/2019/08/green-bg.png?id=97)">
        <div class="hero-body">
            <p class="title has-text-white">
            Pastoral Compensation Tool
            </p>
            <p class="subtitle has-text-white">
            A Service of The Committee on Ministerial Care
            of the Orthodox Presbyterian Church
            </p>
        </div>
        </section>
        
        <p style="padding-bottom: 6px; padding-left: 24px; padding-top: 30px;"><span style="font-weight: bold; font-size: 1.2em;">User Disclosure:</span> The Pastoral Compensation Tool is designed to assist ministers, sessions, and presbyteries in assessing whether the terms of a minister’s call enable him to be free of worldly care and concern.</p>        
        <p style="padding-bottom: 6px; padding-left: 24px;">There is no one-size-fits-all approach to creating a call that is applicable in every situation.</p>
        <p style="padding-bottom: 6px; padding-left: 24px;">Consequently, what is offered is a tool that provides guidelines for discussion and evaluation of what is to be included in an adequate call.</p>
        <p style="padding-bottom: 6px; padding-left: 24px;">Bear in mind when using the tool that factors such as years of experience and family size can significantly impact the total compensation amount.</p>
        <p style="padding-bottom: 10px; padding-top: 6px; padding-left: 24px;"><a target="_blank" href="https://opccmc.org/wp-content/uploads/2021/07/Compensation-Tool-Guidelines-rev-5-2021.pdf">Open The Pastoral Compensation Tool Instruction Sheet</a></p>
        
      <BasicSalary :basic.sync="salary.basic" :basicTotal="basicTotal.total"/>
      <HousingAllowance :housing.sync="salary.housing" :housingTotal="housingTotal.total"/>
      <Healthcare
        :healthcare.sync="salary.healthcare"
        :computedHealthcare="computedSalary.healthcare"
        :healthcareTotal="healthcareTotal.total"
      />
      <OtherExpenses :other.sync="salary.other" :otherTotal="otherTotal.total"/>
      
      <div class="section box" style="background-color:#eeeeee" id=CallPosition>
        <h3
          class="subtitle is-4 has-text-weight-bold" 
        >Total Package: {{ totalPackage | currency('$', 0) }}/yr</h3>
      </div>
      <div v-if="salary.report.showCallVue">
      <CallLetter :call.sync="salary.call" 
        :salary="basicTotal.total"
        :housing="housingTotal.total"
        :medical="healthcareTotal.medicalCare"
        :life="healthcareTotal.lifeInsurance"
        :disability="healthcareTotal.disabilityInsurance"
        :pension="healthcareTotal.retirementContribution"
        :seca="healthcareTotal.seca"
        :bookAllowance="otherTotal.bookAllowance"
        :continueEdAllowance="otherTotal.continuingEducation"
        :computerAllowance="otherTotal.computerAllowance"
        :phoneAllowance="otherTotal.phoneAllowance"
        :vehicleAllowance="otherTotal.vehicleAllowance"
        :childEdAllowance="otherTotal.educationAllowance"
        :debtAllowance="otherTotal.debtDischargeAssistance"
        :otherAllowance="otherTotal.otherPackageAdjustment"        
      />
      </div>

      <Report :report.sync="salary.report"
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
import CallLetter from "./components/CallLetter";
import Report from "./components/Report";

export default {
  name: "app",
  components: {
    BasicSalary,
    HousingAllowance,
    Healthcare,
    OtherExpenses,
    Report,
    CallLetter
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
          vehicle: 0,
          other: 0
        },
        report: {
           showCallVue: false
        },
        call: {
         pastorName: "Rev. John Doe",
         churchName: "First Presbyterian Church",
         churchCity: "Willow Grove",
         churchState: "PA",
         includeClause: "",
         weeksVacation: 4,
         weeksStudyLeave: 1,
         sabbaticalYears: 7,
         stateOptions: ["", "AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO","MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VT", "WA", "WI", "WV", "WY"],
         app: "PastoralCompensationTool",
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
          retirementContribution: retirementContribution,
          seca: socialSecurity + medicare
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
          retirementContribution: retirementContribution,
          seca: optOutContribution
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
      let vehicleAllowance = (parseInt(this.salary.other.vehicle) || 0) * 12;
      let otherPackageAdjustment = parseInt(this.salary.other.other) || 0;

      return {
        total:
          educationAllowance +
          debtDischargeAssistance +
          bookAllowance +
          continuingEducation +
          computerAllowance +
          phoneAllowance +
          vehicleAllowance +
          otherPackageAdjustment,
        educationAllowance: educationAllowance,
        debtDischargeAssistance: debtDischargeAssistance,
        bookAllowance: bookAllowance,
        continuingEducation: continuingEducation,
        computerAllowance: computerAllowance,
        phoneAllowance: phoneAllowance,
        vehicleAllowance: vehicleAllowance,
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
