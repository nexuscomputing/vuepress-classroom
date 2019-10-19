<template>
  <div class="box" :class="{ green : correct }">
    <transition name="fade">
      <button class="action-button" @click="reveal" v-show="!correct">👀</button>
    </transition>
    <slot></slot>
    <p class="answer">
      <input v-model="answer" placeholder="Antwort" />
      <transition name="fade">
        <span v-show="correct" class="checkmark">✔️</span>
      </transition>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    correctAnswer: String
  },
  data() {
    return {
      answer: ""
    };
  },
  computed: {
    correct() {
      return (
        this.answer.toLowerCase().trim() ===
        this.correctAnswer.toLowerCase().trim()
      );
    }
  },
  methods: {
    reveal() {
      this.answer = this.correctAnswer;
    }
  }
};
</script>

<style lang="stylus" scoped>
.answer {
}

input {
  cursor: text;
  width: 10rem;
  height: 2.4rem;
  color: lighten($textColor, 25%);
  display: inline-block;
  border: 1px solid darken($borderColor, 10%);
  border-radius: 0.2rem;
  font-size: 1.2rem;
  line-height: 2rem;
  padding: 0 1rem 0 1rem;
  outline: none;
  transition: all 0.2s ease;
  background-size: 1rem;

  &::placeholder {
    color: lighten(grey, 60%);
  }

  &:focus {
    cursor: auto;
    border-color: darken(yellow, 10%);
  }

  .green &:focus {
    cursor: auto;
    border-color: $accentColor;
  }
}

.box {
  background-color: lighten(yellow, 80%);
  border-left: 10px solid darken(yellow, 10%);
  padding: 0.1rem 1rem;
}

.green {
  background-color: lighten($accentColor, 80%);
  border-left: 10px solid $accentColor;
}

.action-button {
  position: relative;
  margin-top: 1rem;
  float: right;
  text-transform: capitalize;
  outline: none;
  display: inline-block;
  font-size: 1rem;
  color: alpha(#fff, 0.8);
  background-color: alpha(lighten(gray, 40%), 0.2);
  padding: 0.5rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  border: none;
  transition: visibility 0s linear 0.33s, opacity 0.33s linear;

  &:hover {
    background-color: darken(gray, 40%);
  }
}

.checkmark {
  position: relative;
  font-size: 1rem;
  margin-left: 0.2rem;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.7s cubic-bezier(0.47, 2.4, 0.41, 0.8);
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
  font-size: 10%;
}
</style>