import Question from "./components/Question.vue";
import InputBox from "./components/InputBox.vue";

export default ({ Vue }) => {
  Vue.component("Question", Question);
  Vue.component("InputBox", InputBox);
};
