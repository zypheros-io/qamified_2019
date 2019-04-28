<template>
  <div class="box media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img id="trophy" :src="`../../${mission.trophy_url}`" />
      </figure>
    </div>
    <div class="media-content">
      <p class="is-primary-text" id="achievement-title">
        {{ mission.title }}
      </p>
      <p class="is-secondary-text" id="achievement-description">
        {{ mission.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['mission']
};
</script>

<style scoped>
#achievement-title {
  color: #17b79c !important;
}
#achievement-description {
  margin-top: 5px !important;
}
.media-left {
  padding-top: 17px !important;
}
.media-content {
  padding-top: 13px !important;
}
#trophy {
  width: 60% !important;
}
</style>
