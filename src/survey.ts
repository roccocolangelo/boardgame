import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';

/**
 * A survey component that loads questions from a CSV file.
 */
@customElement('survey-component')
export class SurveyComponent extends LitElement {
  static override styles = css`
  :host {
    display: block;
    padding: 16px;
    max-width: 800px;
    background-color: #f0f8ff; /* Alice Blue */
    font-family: 'Arial', sans-serif;
    color: #333;
    box-sizing: border-box;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  label {
    margin: 12px 0 6px;
    font-size: 1.2em;
    color: #2e8b57; /* Sea Green */
  }
  input {
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    width: 80%;
  }
  input:focus {
    outline: none;
    border-color: #2e8b57; /* Sea Green */
    box-shadow: 0 0 5px rgba(46, 139, 87, 0.5);
  }
  button {
    padding: 12px 24px;
    background-color: #2e8b57; /* Sea Green */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
    margin-top: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  button:disabled {
    background-color: #ccc; /* Disabled button color */
    cursor: not-allowed;
    box-shadow: none;
  }
  button:hover:enabled {
    background-color: #3cb371; /* Medium Sea Green */
  }
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: 10% auto;
    padding: 30px;
    border: 1px solid #888;
    width: 80%;
    max-width: 800px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
    margin: 20px auto;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  .print-button, .new-survey-button {
    padding: 12px 24px;
    background-color: #2e8b57; /* Sea Green */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1em;
    margin-top: 20px;
    display: none; /* Initially hidden */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .print-button.show, .new-survey-button.show {
    display: inline-block; /* Show when the class is added */
  }
  .print-button:hover, .new-survey-button:hover {
    background-color: #3cb371; /* Medium Sea Green */
  }
  .score {
    display: none;
    margin-top: 20px;
    font-size: 1.2em;
    color: #2e8b57; /* Sea Green */
  }
  .score.show {
    display: block;
  }
  @media print {
    .score {
      display: block;
      margin-bottom: 20px;
      font-size: 1.4em;
      color: #2e8b57; /* Sea Green */
    }
  }

  /* Tablet-first styles */
  @media (min-width: 768px) {
    :host {
      padding: 24px;
    }
    label {
      font-size: 1.4em;
    }
    input {
      font-size: 1.2em;
      width: 90%; /* Increased width for tablets */
    }
    button {
      font-size: 1.2em;
    }
  }

  /* Desktop styles */
  @media (min-width: 1024px) {
    :host {
      padding: 32px;
    }
    label {
      font-size: 1.6em;
    }
    input {
      font-size: 1.4em;
      width: 80%; /* Adjusted width for desktops */
    }
    button {
      font-size: 1.4em;
    }
  }
`;

  @property({type: Array})
  questions: string[] = [];

  @state()
  allAnswered: boolean = false;

  @state()
  score: number = 0;

  constructor() {
    super();
    this.loadQuestions();
  }

  async loadQuestions() {
    const response = await fetch('/data/questions.csv');
    const text = await response.text();
    this.questions = this.parseCSV(text);
  }

  parseCSV(text: string): string[] {
    const lines: string[] = text.split('\n');
    return lines.slice(1).map(line => line.split(',')[0]);
  }

  checkAnswers() {
    const inputs = this.shadowRoot!.querySelectorAll('input');
    this.allAnswered = Array.from(inputs).every(input => input.value.trim() !== '');
  }

  showModal() {
    const modal = this.shadowRoot!.getElementById('myModal') as HTMLElement;
    const scoreMessage = this.shadowRoot!.getElementById('scoreMessage') as HTMLElement;
    const loader = this.shadowRoot!.querySelector('.loader') as HTMLElement;
    const printButton = this.shadowRoot!.querySelector('.print-button') as HTMLElement;
    const newSurveyButton = this.shadowRoot!.querySelector('.new-survey-button') as HTMLElement;
    const scoreElement = this.shadowRoot!.querySelector('.score') as HTMLElement;
    modal.style.display = 'block';
    scoreMessage.textContent = '';
    loader.style.display = 'block';
    printButton.classList.remove('show');
    newSurveyButton.classList.remove('show');
    scoreElement.classList.remove('show');

    setTimeout(() => {
      this.score = Math.floor(Math.random() * 60) + 41; // Ensure score is between 41 and 100
      scoreMessage.textContent = `Your mindfulness score is ${this.score}. Please remember that this is just a fun exercise and not a professional assessment.`;
      scoreElement.textContent = `Your mindfulness score is ${this.score}.`;
      loader.style.display = 'none';
      printButton.classList.add('show');
      newSurveyButton.classList.add('show');
      scoreElement.classList.add('show');
    }, 2000);
  }

  printSurvey() {
    const modal = this.shadowRoot!.getElementById('myModal') as HTMLElement;
    modal.style.display = 'none'; // Hide the modal
    window.print();
    modal.style.display = 'block'; // Show the modal again
  }

  newSurvey() {
    const inputs = this.shadowRoot!.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
    this.allAnswered = false;
    const modal = this.shadowRoot!.getElementById('myModal') as HTMLElement;
    modal.style.display = 'none'; // Hide the modal
    const scoreElement = this.shadowRoot!.querySelector('.score') as HTMLElement;
    scoreElement.classList.remove('show');
  }

  override render() {
    return html`
      <form @input=${this.checkAnswers}>
        <div class="score"></div>
        ${this.questions.map(question => html`
          <label>${question}</label>
          <input type="text" />
        `)}
        <button type="button" @click=${this.showModal} ?disabled=${!this.allAnswered}>Mindfulness</button>
      </form>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <div class="loader"></div>
          <p id="scoreMessage"></p>
          <button class="print-button" @click=${this.printSurvey}>Print Survey</button>
          <button class="new-survey-button" @click=${this.newSurvey}>New Survey</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'survey-component': SurveyComponent;
  }
}