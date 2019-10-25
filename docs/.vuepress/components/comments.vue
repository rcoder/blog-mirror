<template>
  <div class="comments">
    <blockquote v-for="comment in comments" class="one-comment">
      {{ comment.message }}
      <br/>
      <sub>{{ new Date(comment.createdAt).toDateString() }} by {{ comment.from }}</sub>
    </blockquote>
    <form @submit.prevent="onClick">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="text" v-model="message" placeholder="Say something..." />
      <input type="submit" value="post" />
    </form>
  </div>
</template>

<script>
import axios from 'axios'

const COMMENT_BASE = 'https://bc8.org/_api/comments'
const commentPage = (page) => `${COMMENT_BASE}/${encodeURIComponent(page.path.replace(/^\/+|\/+$/g, ''))}`

export default {
  data() {
    return {
      comments: [],
      email: '',
      message: '',
    }
  },
  async beforeMount() {
    let result = await axios.get(commentPage(this.$page))
    this.$data.comments = result.data
  },
  methods: {
    async onClick(event) {
      let result = await axios.post(commentPage(this.$page), {
        from: this.$data.email,
        message: this.$data.message
      })

      this.$data.comments = result.data
    }
  }
}
</script>