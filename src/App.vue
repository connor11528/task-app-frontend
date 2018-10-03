<template>
    <div>
        <div class="row">
            <div class="col-sm-10 offset-sm-3">
                <h3>Build your profile</h3>
                <p>Fill out this information if you're interested in exploring new opportunities in San Francisco</p>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-2 offset-sm-1">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between" v-for="item in candidateFormMenu"
                        :class="{ 'bg-light': item.active, 'lh-condensed': !item.active }" @click="setStep(item.step)">
                        <div>
                            <h6 class="my-0">{{ item.name }}</h6>
                        </div>
                        <span class="text-muted" v-if="!item.complete && !item.error">
                            <i class="far fa-circle"></i>
                        </span>
                        <span class="text-success" v-if="item.complete">
                            <i class="fas fa-check-circle"></i>
                        </span>
                        <span class="text-danger" v-if="item.error">
                            <i class="fas fa-exclamation-triangle"></i>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="col-sm-6">
                <!-- Personal Info -->
                <div id="personal-info" v-if="step === 1">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label>First name<span class="required">*</span></label>
                            <input type="text" class="form-control" v-model="candidateInfo.firstName" placeholder=""
                                   required="">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label>Last name<span class="required">*</span></label>
                            <input type="text" class="form-control" v-model="candidateInfo.lastName" placeholder="" value="" required="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label>Your LinkedIn URL<span class="required">*</span></label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">https://linkedin.com/in/</span>
                                </div>
                                <input type="text" class="form-control" v-model="candidateInfo.linkedinUrl">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label>Email<span class="required">*</span></label>
                        <input type="email" class="form-control" placeholder="you@example.com" v-model="candidateInfo.email">
                    </div>

                    <button class="btn btn-light btn-lg pull-right" @click.prevent="nextStep()">Next ></button>
                </div>

                <!-- Location -->
                <div id="location" v-if="step === 2">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label>City</label>
                            <input type="text" class="form-control" placeholder="" v-model="candidateInfo.city">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label>State</label>
                            <select class="custom-select d-block w-100" v-model="candidateInfo.state">
                                <option value="">Choose...</option>
                                <option value="AL">AL</option>
                                <option value="AK">AK</option>
                                <option value="AR">AR</option>
                                <option value="AZ">AZ</option>
                                <option value="CA">CA</option>
                                <option value="CO">CO</option>
                                <option value="CT">CT</option>
                                <option value="DC">DC</option>
                                <option value="DE">DE</option>
                                <option value="FL">FL</option>
                                <option value="GA">GA</option>
                                <option value="HI">HI</option>
                                <option value="IA">IA</option>
                                <option value="ID">ID</option>
                                <option value="IL">IL</option>
                                <option value="IN">IN</option>
                                <option value="KS">KS</option>
                                <option value="KY">KY</option>
                                <option value="LA">LA</option>
                                <option value="MA">MA</option>
                                <option value="MD">MD</option>
                                <option value="ME">ME</option>
                                <option value="MI">MI</option>
                                <option value="MN">MN</option>
                                <option value="MO">MO</option>
                                <option value="MS">MS</option>
                                <option value="MT">MT</option>
                                <option value="NC">NC</option>
                                <option value="NE">NE</option>
                                <option value="NH">NH</option>
                                <option value="NJ">NJ</option>
                                <option value="NM">NM</option>
                                <option value="NV">NV</option>
                                <option value="NY">NY</option>
                                <option value="ND">ND</option>
                                <option value="OH">OH</option>
                                <option value="OK">OK</option>
                                <option value="OR">OR</option>
                                <option value="PA">PA</option>
                                <option value="RI">RI</option>
                                <option value="SC">SC</option>
                                <option value="SD">SD</option>
                                <option value="TN">TN</option>
                                <option value="TX">TX</option>
                                <option value="UT">UT</option>
                                <option value="VT">VT</option>
                                <option value="VA">VA</option>
                                <option value="WA">WA</option>
                                <option value="WI">WI</option>
                                <option value="WV">WV</option>
                                <option value="WY">WY</option>
                            </select>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label>Zip</label>
                            <input type="text" class="form-control" placeholder="" v-model="candidateInfo.zipCode">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 mb-3">
                            <label>I will relocate to the Bay Area to start a new job there</label>
                            <select class="custom-select d-block w-100" v-model="candidateInfo.relocate">
                                <option>--</option>
                                <option value="true">Yes I'm interested in relocating to the Bay or live here already</option>
                                <option value="false">No I don't live in the Bay and require remote work</option>
                            </select>
                        </div>
                    </div>

                    <button class="btn btn-light btn-lg pull-right" @click.prevent="nextStep()">Next ></button>
                </div>

                <!-- Experience -->
                <div id="experience" v-if="step === 3">
                    <div class="row">
                        <div class="col-sm-12 mb-3">
                            <h3>Work XP</h3>
                            <div class="row" v-for="workHistory in candidateInfo.workHistory">
                                <div class="col-sm-12">
                                    <label>Title</label>
                                    <input type="text" class="form-control" v-model="workHistory.title">
                                    <label>Company</label>
                                    <input type="text" class="form-control" v-model="workHistory.company">
                                    <label>Start Date</label>
                                    <input type="month" class="form-control" v-model="workHistory.startDate">
                                    <label v-if="!workHistory.current">End Date</label>
                                    <input type="month" class="form-control" v-model="workHistory.endDate" v-if="!workHistory.current">
                                    <input type="checkbox" v-model="workHistory.current"> I currently work here
                                    <br>
                                    <label>Description</label>
                                    <textarea v-model="workHistory.description" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="col-sm-12 text-center mt-3">
                                <div class="btn btn-primary" @click.prevent="addWorkHistory()"><i class="fas fa-plus"></i> Add work experience</div>
                            </div>
                        </div>

                        <h3>Education</h3>

                        <button class="btn btn-light btn-lg pull-right" @click.prevent="nextStep()">Next ></button>
                    </div>

                </div>

                <!-- Projects -->
                <div id="projects" v-if="step === 4">
                    <h3>Projects</h3>


                </div>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-success btn-lg pull-right mb-3" @click.prevent="nextStep()">Next ></button>
                <div v-if="errors.length">
                    <div v-for="error in errors" class="alert alert-danger" role="alert">{{ error }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .required {
        color: darkred;
    }
</style>
<script>
  import _ from 'lodash';
  import Multiselect from 'vue-multiselect';

  function WorkHistoryModel(){
    return { title: '', company: '', startDate: '', endDate: '', description: '' };
  }

  function EducationModel(){
    return { degree: '', school: '', year_start: '', year_end: '' };
  }

  function ProjectModel(){
    return { title: '', description: '', url: '', technologies_used: [] };
  }

  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        candidateInfo:{
          firstName: '',
          lastName: '',
          email: '',
          linkedinUrl: '',
          state: '',
          city: '',
          zipCode: '',
          relocate: '',
          workHistory: [
            new WorkHistoryModel()
          ],
          education: [
            new EducationModel()
          ],
          projects: [
            new ProjectModel()
          ]
        },
        errors: [],
        step: 1,
        candidateFormMenu: [
          {active: true, name: 'Personal Info', complete: false, error: false, step: 1},
          {active: false, name: 'Location', complete: false, error: false, step: 2},
          {active: false, name: 'Experience', complete: false, error: false, step: 3},
          {active: false, name: 'Projects', complete: false, error: false, step: 4},
          {active: false, name: 'Share', complete: false, error: false, step: 5}
        ],

      }
    },
    methods: {
      addWorkHistory(){
        this.candidateInfo.workHistory.push(new WorkHistoryModel());
      },
      setErrorStatusFor(name, value = true){
        let menuIndex = _.findIndex(this.candidateFormMenu, (item) => {
          return item.name === name;
        });

        this.candidateFormMenu[menuIndex].error = value;
        this.candidateFormMenu[menuIndex].complete = !value;
      },
      validateStep(stepNum) {
        let validStep = false;
        switch (stepNum) {
          case 1:
            validStep = this.validatePersonalInfo();
            break;
          case 2:
            validStep = this.validateLocation();
            break;
          case 3:
            validStep = this.validateExperience();
            break;
          case 4:
            validStep = this.validateProjects();
            break;
          case 5:
            validStep = this.validateShare();
            break;
          default:
            validStep = false;
        }
        return validStep;
      },
      setStep(stepNum){
        this.step = stepNum;
        this.candidateFormMenu.map((item) => {
          item.active = (item.step === stepNum);
          return item;
        });
      },
      nextStep() {
        let validForNextStep = this.validateStep(this.step);
        if (!validForNextStep) return;

        this.candidateFormMenu.map((item) => {
          item.active = (item.step === this.step + 1);
          return item;
        });

        this.step++;
      },
      displayErrors(stepName){
        if(this.errors.length){
          this.setErrorStatusFor(stepName, true);
          return false;
        }

        this.setErrorStatusFor(stepName, false);
        return true;
      },
      validatePersonalInfo() {
        this.errors = [];

        if(!this.candidateInfo.firstName){
          this.errors.push('First name is required');
        }
        if(!this.candidateInfo.lastName){
          this.errors.push('Last name is required');
        }
        if(!this.candidateInfo.email){
          this.errors.push('Please enter a valid email address for shipping updates.');
        }
        this.displayErrors('Personal Info');
      },
      validateLocation() {
        if(!this.candidateInfo.state){
          this.errors.push('Please provide a valid state.');
        }

        if(!this.candidateInfo.city){
          this.errors.push('Please provide a valid city.');
        }

        if(!this.candidateInfo.zipCode){
          this.errors.push('Please provide a valid zip code.');
        }

        this.displayErrors('Location');
      },
      validateExperience() {
        return true;
      },
      validateProjects() {
        return true;
      },
      validateShare() {
        return true;
      }
    }

  }
</script>