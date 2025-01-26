import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";

@Component({
    selector: "app-book-summary",
    templateUrl: "./book-summary.component.html",
    styleUrls: ["./book-summary.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatCard, MatCardContent, MatButton, MatProgressSpinner]
})
export class BookSummaryComponent {
  geminiInput = "";
  bookSummary = "";

  @Input() set bookTitle(title: string) {
    this.geminiInput = `Give me a summary of the book "${title}" in 300 words`;
    this.bookSummary = "";
  }
  showLoader = false;

  MODEL_NAME = "gemini-1.5-flash";
  API_KEY = "AIzaSyB88VzQVRWpEl5UKPUvzVZ8dIlYR-FV8gg";

  generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  async fetchSummaryFromGemini() {
    const genAI = new GoogleGenerativeAI(this.API_KEY);
    const model = genAI.getGenerativeModel({
      model: this.MODEL_NAME,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
    });

    try {
      this.showLoader = true;
      this.bookSummary = "";
      const parts = [{ text: this.geminiInput }];

      const result = await model.generateContentStream({
        contents: [{ role: "user", parts }],
        generationConfig: this.generationConfig,
        safetySettings: this.safetySettings,
      });

      this.showLoader = false;

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        this.bookSummary = this.bookSummary.concat(chunkText);
        console.log(chunkText);
      }
    } catch (e) {
      console.log("An error Occurred: ", e);
    }
  }
}
