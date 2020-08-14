export default {
  props: {
    editProps: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    if (this.editProps) {
      this.componentForm = this.editProps
    }
  }
}
