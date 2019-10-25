<template>
  <div v-if="topK">
    <h3>Current Top {{ topK.length }} Pages</h3>
  
    <table>
      <thead>
        <tr>
          <th>Request</th>
          <th>Hit Count</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in topK">
          <td><a :href="page.url">{{ page.url }}</a></td>
          <td>{{ page.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import topK from '../../../logs/topK.json'

export default {
  data: () => ({
    topK: topK.map(pair => ({
      url: pair[0].split(' ')[1],
      count: pair[1]
    }))
  })
}
</script>