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
                        :class="{ 'bg-light': item.active, 'lh-condensed': !item.active }">
                        <div>
                            <h6 class="my-0">{{ item.name }}</h6>
                        </div>
                        <span class="text-success text-danger text-muted">
                    <i class="far fa-circle" v-if="!item.complete && !item.error"></i>
                    <i class="fas fa-check-circle" v-if="item.complete"></i>
                    <i class="fas fa-exclamation-triangle" v-if="item.error"></i>
                </span>
                    </li>
                </ul>
            </div>
            <div class="col-sm-6">
                <div v-if="errors.length">
                     <div v-for="error in errors" class="alert alert-danger" role="alert">{{ error }}</div>

                </div>
                <!-- Personal Info -->
                <form novalidate="" id="personal-info" v-if="step === 1">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label>First name<span class="required">*</span></label>
                            <input type="text" class="form-control" v-model="candidateInfo.firstName" placeholder="" value=""
                                   required="">
                            <div class="invalid-feedback">
                                Valid first name is required.
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="lastName">Last name<span class="required">*</span></label>
                            <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
                            <div class="invalid-feedback">
                                Valid last name is required.
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label>Your LinkedIn URL<span class="required">*</span></label>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">https://linkedin.com/in/</span>
                                </div>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="email">Email<span class="required">*</span></label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com">
                        <div class="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                    </div>

                    <button class="btn btn-light btn-lg pull-right" @click.prevent="nextStep()">Next ></button>
                </form>

                <!-- Location -->
                <form novalidate="" id="location" v-if="step === 2">
                    <div class="mb-3">
                        <label for="address">Address</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">
                        <div class="invalid-feedback">
                            Please enter your shipping address.
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-5 mb-3">
                            <label for="country">Country</label>
                            <select class="custom-select d-block w-100" id="country" required="">
                                <option value="">Choose...</option>
                                <option>United States</option>
                            </select>
                            <div class="invalid-feedback">
                                Please select a valid country.
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="state">State</label>
                            <select class="custom-select d-block w-100" id="state" required="">
                                <option value="">Choose...</option>
                                <option>California</option>
                            </select>
                            <div class="invalid-feedback">
                                Please provide a valid state.
                            </div>
                        </div>
                        <div class="col-md-3 mb-3">
                            <label for="zip">Zip</label>
                            <input type="text" class="form-control" id="zip" placeholder="" required="">
                            <div class="invalid-feedback">
                                Zip code required.
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-light btn-lg pull-right" @click.prevent="nextStep()">Next ></button>
                </form>

                <!-- Experience -->
                <form novalidate="" id="experience" v-if="step === 3">
                    <h3>Work XP</h3>

                    <h3>Education</h3>

                    <button class="btn btn-light btn-lg pull-right" @click.prevent="nextStep()">Next ></button>

                </form>

                <!-- Projects -->
                <form novalidate="" id="projects" v-if="step === 4">
                    <h3>Projects</h3>

                    <button class="btn btn-light btn-lg pull-right" @click.prevent="nextStep()">Next ></button>
                </form>
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
  export default {
    data() {
      return {
        candidateInfo:{
          firstName: ''
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
      validateStep(stepNum) {
        let validStep;
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
      nextStep() {
        let validForNextStep = this.validateStep(this.step);
        if (!validForNextStep) {
          return;
        }

        this.candidateFormMenu.map((item) => {
          item.active = (item.step === this.step + 1);
          return item;
        });

        this.step++;
      },

      validatePersonalInfo() {
        if(!this.candidateInfo.firstName){
          this.errors.push('First name is required');
        }
      },
      validateLocation() {
        return true;
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