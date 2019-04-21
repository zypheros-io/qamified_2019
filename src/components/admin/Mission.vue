<template>
  <div>
    <b-field>
      <b-field>
        <b-input
          v-model="mission.title"
          type="text"
          placeholder="Mission title"
          size="is-medium"
          required
        ></b-input>
      </b-field>
      <b-input
        v-model="mission.description"
        type="text"
        placeholder="Mission description"
        size="is-medium"
        required
      ></b-input>
    </b-field>
    <b-field>
      <b-input
        v-model.number="mission.experience"
        type="number"
        placeholder="Mission experience"
        size="is-medium"
        required
      ></b-input>
    </b-field>
    <b-field>
      <b-input
        v-model.number="mission.requirements.required"
        type="number"
        placeholder="Mission requirement"
        size="is-medium"
        required
      ></b-input>
    </b-field>
    <b-field>
      <b-input
        v-model="mission.requirements.context"
        type="text"
        placeholder="Mission Context"
        size="is-medium"
        required
      ></b-input>
    </b-field>
    <b-field>
      <button class="button primary-btn" v-on:click.prevent="addMission">
        add mission
      </button>
    </b-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mission: {
        title: '',
        description: '',
        experience: 0,
        requirements: {
          current: 0,
          required: 0,
          context: ''
        }
      }
    };
  },
  methods: {
    addMission: function addMission() {
      this.$store.dispatch('admin/addMission', this.mission);
      // Reset
      this.mission.title = '';
      this.mission.description = '';
      this.mission.experience = '';
      this.mission.requirements = {
        current: 0,
        required: '',
        context: ''
      };
    }
  }
};
</script>
