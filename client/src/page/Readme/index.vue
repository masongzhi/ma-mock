<template>
  <div>
    <VueMarkdown :source="data">
      README
    </VueMarkdown>
  </div>
</template>

<script>
import { getReadme } from '@/api';
import VueMarkdown from 'vue-markdown';

export default {
  name: 'readme',
  components: { VueMarkdown },
  data() {
    return {
      data: null,
    };
  },
  methods: {
    async search() {
      const data = await getReadme();
      this.data = data.message;
    },
  },
  created() {
    this.search();
  },
};
</script>
