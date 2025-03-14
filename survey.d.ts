import { LitElement } from 'lit';
/**
 * A survey component that loads questions from a CSV file.
 */
export declare class SurveyComponent extends LitElement {
    static styles: import("lit").CSSResult;
    questions: string[];
    allAnswered: boolean;
    score: number;
    constructor();
    loadQuestions(): Promise<void>;
    parseCSV(text: string): string[];
    checkAnswers(): void;
    showModal(): void;
    printSurvey(): void;
    newSurvey(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'survey-component': SurveyComponent;
    }
}
//# sourceMappingURL=survey.d.ts.map