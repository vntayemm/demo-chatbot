const CrmChatBot = {
  name: "crm-chat-bot",
  props: {
    apiBase: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      question: "goi nao phu hop cho doanh nghiep 10 nhan su?",
      topK: 3,
      loading: false,
      answer: "",
      contexts: [],
      error: "",
    };
  },
  methods: {
    async askPriceBot() {
      this.loading = true;
      this.error = "";
      this.answer = "";
      this.contexts = [];
      try {
        const response = await fetch(`${this.apiBase}/chat/price`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: this.question,
            top_k: Number(this.topK),
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        this.answer = data.answer || "";
        this.contexts = Array.isArray(data.contexts) ? data.contexts : [];
      } catch (err) {
        this.error = `API error: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
  template: `
    <div class="card p-3">
      <h2 class="h4 mb-3">crm-chat-bot (Price)</h2>
      <label class="form-label">Question</label>
      <textarea class="form-control mb-2" v-model="question" rows="3"></textarea>
      <label class="form-label">Top K</label>
      <input class="form-control mb-2" v-model="topK" type="number" min="1" max="10" />
      <button class="btn btn-primary" @click="askPriceBot" :disabled="loading">
        {{ loading ? 'Calling API...' : 'Call /chat/price' }}
      </button>
      <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
      <div v-if="answer" class="alert alert-secondary mt-3 mb-0"><strong>Answer:</strong> {{ answer }}</div>
      <div v-if="contexts.length" class="alert alert-light border mt-3 mb-0">
        <strong>Contexts:</strong>
        <ol>
          <li v-for="(ctx, idx) in contexts" :key="idx">{{ ctx }}</li>
        </ol>
      </div>
    </div>
  `,
};

const CrmGuidlineBot = {
  name: "crm-guidline-bot",
  props: {
    apiBase: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      question: "cach import khach hang nhu the nao?",
      topK: 2,
      loading: false,
      answer: "",
      contexts: [],
      error: "",
    };
  },
  methods: {
    async askGuideBot() {
      this.loading = true;
      this.error = "";
      this.answer = "";
      this.contexts = [];
      try {
        const response = await fetch(`${this.apiBase}/chat/guide`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: this.question,
            top_k: Number(this.topK),
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        this.answer = data.answer || "";
        this.contexts = Array.isArray(data.contexts) ? data.contexts : [];
      } catch (err) {
        this.error = `API error: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
  },
  template: `
    <div class="card p-3">
      <h2 class="h4 mb-3">crm-guidline-bot (Guide)</h2>
      <label class="form-label">Question</label>
      <textarea class="form-control mb-2" v-model="question" rows="3"></textarea>
      <label class="form-label">Top K</label>
      <input class="form-control mb-2" v-model="topK" type="number" min="1" max="10" />
      <button class="btn btn-primary" @click="askGuideBot" :disabled="loading">
        {{ loading ? 'Calling API...' : 'Call /chat/guide' }}
      </button>
      <div v-if="error" class="alert alert-danger mt-3 mb-0">{{ error }}</div>
      <div v-if="answer" class="alert alert-secondary mt-3 mb-0"><strong>Answer:</strong> {{ answer }}</div>
      <div v-if="contexts.length" class="alert alert-light border mt-3 mb-0">
        <strong>Contexts:</strong>
        <ol>
          <li v-for="(ctx, idx) in contexts" :key="idx">{{ ctx }}</li>
        </ol>
      </div>
    </div>
  `,
};

Vue.createApp({
  components: {
    CrmChatBot,
    CrmGuidlineBot,
  },
  data() {
    return {
      apiBase: "http://127.0.0.1:8000",
    };
  },
}).mount("#app");
