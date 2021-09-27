<template>
  <div class="section">
    <h2 class="title is-3">Call Letter</h2>

  <div class="container box">
      <div class="field">
        <label class="label"
        >Pastor's name</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="text" size=40 v-model="callLocal.pastorName" autocomplete="off">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      
      <div class="field">
        <label class="label"
        >Name of your church</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="text" size=40 v-model="callLocal.churchName" autocomplete="off">
              <span class="icon is-small is-left">
                <i class="fas fa-church"></i>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label"
        >Church's city</label>
        <div class="control">
          <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="text" v-model="callLocal.churchCity" autocomplete="off">
              <span class="icon is-small is-left">
                <i class="fas fa-map-marker-alt"></i>
              </span>
            </p>
          </div>
        </div>
      </div>      
      
      <div class="field">
        <label class="label">Church's state</label>
        <p class="control has-icons-left">
          <span class="select">
            <select v-model="callLocal.churchState" autocomplete="off">
              <option
                v-bind:key="index"
                v-for="(value, name, index) in callLocal.stateOptions"
                v-bind:value="value"
              >{{ value }}</option>
            </select>
          </span>
          <span class="icon is-small is-left">
            <i class="fas fa-map-marked-alt"></i>
          </span>
        </p>
      </div>      
      
      <div class="field">
        <label class="label">Include the clause "And that you may be free from worldly care and employment," before
            "We promise and oblige ourselves to pay you the following"?</label>
          <div id="errorClauseRequired" class="has-text-danger is-hidden">
                <b>Please indicate Yes or No on whether to include the clause "And that you may be free from worldly care and employment"</b>
          </div>
        <p class="control">
          <span class="select">
            <select v-model="callLocal.includeClause" id=selClause onchange='document.getElementById("errorClauseRequired").classList.add("is-hidden");'>
              <option value="">Select...</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </span>
        </p>
      </div>
           
      <div class="field">
        <label class="label">How many weeks of vacation are provided?</label>
        <div class="control">
            <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="callLocal.weeksVacation" autocomplete="off">
              <span class="icon is-small is-left">
                <i class="fas fa-plane-departure"></i>
              </span>
            </p>    
            <div class="control">
              <a class="button is-static">weeks</a>
            </div>            
            </div>
        </div>   
      </div>  
      
      <div class="field">
        <label class="label">How many weeks of study leave are provided?</label>
        <div class="control">
            <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="callLocal.weeksStudyLeave" autocomplete="off">
              <span class="icon is-small is-left">
                <i class="fas fa-book-reader"></i>
              </span>
            </p>    
            <div class="control">
              <a class="button is-static">weeks</a>
            </div>            
            </div>
        </div>          
      </div>     

      <div class="field">
        <label class="label">After how many years of service in ministry would the church like to offer a sabbatical? </label>
        <div class="control">
            <div class="field has-addons">
            <p class="control has-icons-left">
              <input class="input" type="number" v-model.number="callLocal.sabbaticalYears" autocomplete="off">
              <span class="icon is-small is-left">
                <i class="fas fa-cross"></i>
              </span>
            </p>    
            <div class="control">
              <a class="button is-static">years</a>
            </div>            
            </div>
        </div>          
        <p class="help">(Enter '0' if no sabbatical is planned to be offered).</p>
      </div>    
      
      <br />
      <br />
      <button class="button is-medium is-info" :class="{ 'is-loading': docxLoading }"  @click="submitCallLetter('DOCX')" >
          <span class="icon">
            <i class="fas fa-file-word"></i>
          </span>
          <span>Generate Call Letter</span>
      </button>   
      <br />      
      <span class="content is-small">Generates the call letter as a Microsoft Word compatible document that can be edited as needed.</span>
      <br />
      <br />
      <button class="button is-medium is-danger" :class="{ 'is-loading': pdfLoading }" @click="submitCallLetter('PDF')" >
          <span class="icon">
            <i class="fas fa-file-pdf"></i>
          </span>
          <span>Generate Call Letter</span>
      </button>   
      <br />      
      <span class="content is-small">Generates the call letter as a finished PDF document (and cannot be edited).</span>
    </div>
      
    </div>
</template>
    

<script>

function base64ToArrayBuffer(data) {
  const bString = window.atob(data);
  const bLength = bString.length;
  const bytes = new Uint8Array(bLength);
  for (let i = 0; i < bLength; i++) {
      bytes[i] = bString.charCodeAt(i);
  }
  return bytes;
}

function base64toPDF(base64EncodedData, fileName = 'file') {
  const bufferArray = base64ToArrayBuffer(base64EncodedData);
  const blobStore = new Blob([bufferArray], { type: 'application/pdf' });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
  }
  const data = window.URL.createObjectURL(blobStore);
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = data;
  link.download = `${fileName}.pdf`;
  link.click();
  window.URL.revokeObjectURL(data);
  link.remove();
}

function base64toDOCX(base64EncodedData, fileName = 'file') {
  const bufferArray = base64ToArrayBuffer(base64EncodedData);
  const blobStore = new Blob([bufferArray], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
  }
  const data = window.URL.createObjectURL(blobStore);
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = data;
  link.download = `${fileName}.docx`;
  link.click();
  window.URL.revokeObjectURL(data);
  link.remove();
}
  
function formatDollar(text) {
    var amt = Number.parseFloat(text);
    if (isNaN(amt)) amt = 0;
    
    var formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    return formatter.format(amt);
    
}

export default {
  name: "CallLetter",
  props: [
    "call",
    "salary",
    "housing",
    "medical",
    "life",
    "disability",
    "pension",
    "seca",
    "bookAllowance",
    "continueEdAllowance",
    "computerAllowance",
    "phoneAllowance",
    "vehicleAllowance",
    "childEdAllowance",
    "debtAllowance",
    "otherAllowance",
  ],
  data() {
      return { 
        docxLoading: false, 
        pdfLoading: false
        };
  },
  computed: {
    callLocal: {
      get: function() {
        return this.call;
      },
      set: function(value) {
        this.$emit("update:call", value);
      }
    },
  },
  methods: {
  
    submitCallLetter(format) {
        /* eslint-disable */
        
        if (this.call.includeClause == '') {
            document.getElementById('errorClauseRequired').classList.remove("is-hidden");
            document.getElementById('selClause').focus();
            return;
        }
        
        var request = require('request');
        var timestamp = Date.now();

        var SHA256 = require("crypto-js/sha256");
        var Base64 = require("crypto-js/enc-base64");
        
        var key = Base64.stringify(SHA256(this.call.app + timestamp));    

        var otherExp = '';
        if (this.bookAllowance > 0 || 
            this.continueEdAllowance > 0 ||
            this.computerAllowance > 0 || 
            this.phoneAllowance > 0 || 
            this.vehicleAllowance > 0 ||
            this.childEdAllowance > 0 || 
            this.debtAllowance > 0 ||
            this.otherAllowance > 0) {
            
            otherExp = 'Other expenses annually include ';
            
            if (this.bookAllowance > 0)
                otherExp = otherExp + 'a book allowance of ' + formatDollar(this.bookAllowance) + ', ';
            if (this.continueEdAllowance > 0)
                otherExp = otherExp + 'a continuing education allowance of ' + formatDollar(this.continueEdAllowance) + ', ';
            if (this.computerAllowance > 0)
                otherExp = otherExp + 'a computer education allowance of ' + formatDollar(this.computerAllowance) + ', ';
            if (this.phoneAllowance > 0)
                otherExp = otherExp + 'a phone allowance of ' + formatDollar(this.phoneAllowance) + ', ';
            if (this.vehicleAllowance > 0)
                otherExp = otherExp + 'a vehicle allowance of ' + formatDollar(this.vehicleAllowance) + ', ';
            if (this.childEdAllowance > 0)
                otherExp = otherExp + 'a child education allowance of ' + formatDollar(this.childEdAllowance) + ', ';
            if (this.debtAllowance > 0)
                otherExp = otherExp + 'a debt discharge allowance of ' + formatDollar(this.debtAllowance) + ', ';
            if (this.otherAllowance > 0)
                otherExp = otherExp + 'an additional expense allowance of ' + formatDollar(this.otherAllowance) + ', ';
                
            otherExp = otherExp + 'as well as any other church related expenses that are approved in advance by the session.';
        }
        
        var insuranceMessage = '';
        if (this.medical > 0) {
            if (this.life > 0) 
                insuranceMessage = 'medical insurance or life insurance';
            else 
                insuranceMessage = 'medical insurance';
        }
        else if (this.life > 0)
            insuranceMessage = 'life insurance';                
        
        var options = {
          'method': 'POST',
          'url': 'https://pclservice.azurewebsites.net/api/Merge', 
          //'url': 'http://localhost:61327/api/Merge',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },

          form: {
            'PastorName': this.call.pastorName,            
            'ChurchName': this.call.churchName,
            'City': this.call.churchCity,
            'State': this.call.churchState,
            'OutputFormat': format,
            'Salary': this.salary.toFixed(2),
            'HousingAllowance': this.housing.toFixed(2),
            'Medical': this.medical.toFixed(2),
            'Life': this.life.toFixed(2),
            'Disability': this.disability.toFixed(2),
            'Pension': this.pension.toFixed(2),
            'SECA': this.seca.toFixed(2),
            'Vacation': this.call.weeksVacation.toFixed(0),
            'StudyLeave': this.call.weeksStudyLeave.toFixed(0),
            'Sabbatical': this.call.sabbaticalYears.toFixed(0),
            'WorldlyCareClause': this.call.includeClause,
            'OtherExpenses': otherExp,
            'InsuranceMessage': insuranceMessage,
            'TimeStamp': timestamp,
            'Key': key,
          }
        };
        
        
        var fname = 'Call_Letter_for_' + this.call.pastorName.replace(/[^\w\s]|_/g, "")
                                                             .replace(/\s+/g, "_");
        var isDOCX = (format == 'DOCX');
        var isPDF = (format == 'PDF');
        
        if (isDOCX)
            this.docxLoading = true;   
        else if (isPDF)
            this.pdfLoading = true;
            
        var thisObj = this;
        
        request(options, function (error, response) {
          thisObj.docxLoading = false;
          thisObj.pdfLoading = false;
          
          if (error) throw new Error(error);
          
          if (isDOCX) {
            base64toDOCX(response.body.replace(/"/g, ''), fname);
          }
          else if (isPDF) {
            base64toPDF(response.body.replace(/"/g, ''), fname);
          }
          
          
        });
        

        

    },
    
  }  
};
</script>

<style scoped>
.container {
  background: #eeeeee;
  padding: 10px;
}
</style>    