import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent {
  @ViewChild('suggestionPopover') suggestionPopover!: TemplateRef<any>;
  suggestions: string[] = [];
  selectedText = '';
  
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  
  onSelectionChange(event: any): void {
    const selection = event.range;
    if (selection && selection.length > 0) {
      const selectedText = event.editor.getText(selection.index, selection.length);
      this.selectedText = selectedText;
  
      // Send selected text to backend for suggestions
      this.getSuggestions(selectedText);
    }
  }
  
  getSuggestions(selectedText: string): void {
    this.suggestions = ['Hello', 'Hi'];
          this.openPopover();
    // this.http.post<string[]>('your-backend-url/suggestions', { text: selectedText })
    //   .subscribe(
    //     (data) => {
    //     },
    //     (error) => {
    //       console.error('Error fetching suggestions', error);
    //     }
    //   );
  }
  
  openPopover(): void {
    this.dialog.open(this.suggestionPopover, {
      data: { selectedText: this.selectedText },
      position: { top: '200px', left: '200px' }  // Adjust as needed for placement
    });
  }
  }