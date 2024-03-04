import { Component, Input } from "@angular/core";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

@Component({
  selector: "app-book-summary",
  templateUrl: "./book-summary.component.html",
  styleUrls: ["./book-summary.component.scss"],
})
export class BookSummaryComponent {
  geminiInput = "";
  bookSummary = "";

  @Input() set bookTitle(title: string) {
    this.geminiInput = `Give me a summary of the book "${title}" in 300 words`;
    this.bookSummary = "";
  }
  showLoader = false;

  MODEL_NAME = "gemini-1.0-pro";
  API_KEY = "Your_API_Key_Here";
  generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
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
      const parts = [{ text: this.geminiInput }];

      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: this.generationConfig,
        safetySettings: this.safetySettings,
      });

      this.bookSummary = result.response.text();
      console.log(this.bookSummary);
      this.showLoader = false;
    } catch (e) {
      console.log("An error Occurred: ", e);
    }
  }
}
