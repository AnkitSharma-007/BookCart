import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  signal,
} from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";

@Component({
  selector: "app-book-summary",
  templateUrl: "./book-summary.component.html",
  styleUrls: ["./book-summary.component.scss"],
  imports: [MatCard, MatCardContent, MatButton, MatProgressSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSummaryComponent {
  private cd = inject(ChangeDetectorRef);
  geminiInput = "";
  bookSummary = "";
  showLoader = signal<boolean>(false);

  @Input() set bookTitle(title: string) {
    this.geminiInput = `Give me a summary of the book "${title}" in 300 words`;
    this.bookSummary = "";
  }

  MODEL_NAME = "gemini-2.0-flash";
  API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
  genAI = new GoogleGenAI({ apiKey: this.API_KEY });
  config = {
    topP: 0.6,
    topK: 40,
    temperature: 0.8,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, // Block none
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, // Block few
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, // Block none
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, // Block none
      },
    ],
    responseMimeType: "text/plain",
  };

  async fetchSummaryFromGemini() {
    try {
      this.showLoader.set(true);
      this.bookSummary = "";

      const response = await this.genAI.models.generateContentStream({
        model: this.MODEL_NAME,
        config: this.config,
        contents: [{ role: "user", parts: [{ text: this.geminiInput }] }],
      });

      this.showLoader.set(false);

      for await (const chunk of response) {
        this.bookSummary = this.bookSummary.concat(chunk.text);
        // this hack is required to trigger CD as the response is streamed.
        this.cd.detectChanges();
      }
    } catch (e) {
      console.log("An error Occurred: ", e);
    }
  }
}
