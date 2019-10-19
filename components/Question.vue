<template>
  <div class="question-box">
    <div
      class="bubble"
      :class="{ green : correct }"
      v-show="bubble"
      @mouseleave="mouse(false)"
      @mouseover="mouse(true)"
    >
      <p class="answer">
        <input
          tabindex="0"
          @focus="showBubble = true"
          ref="answer"
          v-model="entered"
          @blur="focusLost"
          @keyup.enter="enter"
        />
        <transition name="fade">
          <span v-show="correct" class="checkmark">✔️</span>
        </transition>
        <transition name="fade">
          <button class="action-button" @click="reveal">👀</button>
        </transition>
      </p>
    </div>
    <div
      tabindex="0"
      class="solution"
      :class="{wrong: wrong}"
      @click="showBubble = true"
    >&nbsp;{{ entered }}&nbsp;</div>
  </div>
</template>

<script>
export default {
  props: {
    answer: String
  },
  data() {
    return {
      id: -1,
      entered: "",
      showBubble: false,
      suspend: false,
      wrong: false
    };
  },
  computed: {
    correct() {
      return (
        this.entered.toLowerCase().trim() === this.answer.toLowerCase().trim()
      );
    },
    bubble() {
      const v = this.showBubble;
      if (v) {
        this.sel();
      }
      return v;
    }
  },
  methods: {
    mouse(lock) {
      console.log("lock: " + lock);
      this.suspend = lock;
    },
    enter() {
      this.suspend = false;
      this.focusLost();
    },
    sel() {
      this.$nextTick(() => {
        this.$refs.answer.select();
        this.$refs.answer.focus();
      });
    },
    reveal() {
      console.log("click");
      this.entered = this.answer;
      this.sel();
    },
    focusLost() {
      console.log("focus lost, suspend: " + this.suspend);

      if (this.suspend) {
        return;
      }

      this.showBubble = false;
      localStorage[this.id] = this.entered;

      if (!this.correct) {
        this.wrong = true;
      } else {
        this.wrong = false;
      }
    }
  },
  mounted() {
    this.id = this._uid;
    const v = localStorage[this.id];
    if (v) {
      this.entered = v;
    }
  }
};
</script>

<style lang="stylus" scoped>
.bubble {
  background-color: lighten(yellow, 80%);
  border: 1px solid darken(yellow, 10%);
  padding: 0.1rem 1rem;
  margin-top: -5rem;
  position: absolute;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 5 px gray;
}

.green {
  background-color: lighten($accentColor, 80%);
  border: 1px solid $accentColor;
}

.solution {
  cursor: pointer;
  min-width: 2rem;
  text-align: center;
  height: 2rem;
  padding: 0 0;
  color: lighten($textColor, 25%);
  display: inline-block;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid darken($borderColor, 50%);
  font-size: 1.2rem;
  line-height: 2rem;
  padding: 0 0 0 0;
  outline: none;
  transition: all 0.2s ease;
  background-size: 1rem;
}

input {
  cursor: text;
  max-width: 15rem;
  height: 2rem;
  color: lighten($textColor, 25%);
  display: inline-block;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid darken($borderColor, 50%);
  font-size: 1.2rem;
  line-height: 2rem;
  padding: 0 1rem 0 1rem;
  outline: none;
  transition: all 0.2s ease;
  background-size: 1rem;

  &::placeholder {
    font-size: 60%;
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

.question-box {
  display: inline-block;
  padding: 0.1rem 0rem;
}

.action-button {
  cursor: pointer;
  text-transform: capitalize;
  outline: none;
  display: inline-block;
  font-size: 1rem;
  color: alpha(#fff, 0.8);
  background-color: alpha(lighten(gray, 40%), 0.4);
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

.wrong {
  color: darken(red, 25%);
  border-color: darken(red, 25%);
}
</style>