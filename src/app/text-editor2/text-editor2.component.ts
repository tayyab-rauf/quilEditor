import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-text-editor2',
  templateUrl: './text-editor2.component.html',
  styleUrl: './text-editor2.component.css'
})
export class TextEditor2Component {
  @ViewChild('editor') editor!: QuillEditorComponent;
  showToolbar = false;
  toolbarPosition = { top: '14px', left: '0px' };
  suggestions = ['Hello', 'Hi', 'How are you?', 'What is your name?'];

  constructor(private http: HttpClient) {}

  onSelectionChange(event: any): void {
    const selection = event.range;
    if (selection && selection.length > 0) {
      // Position the toolbar popover
      const quillBounds = event.editor.getBounds(selection.index, selection.length);
      this.toolbarPosition = {
        top: `${quillBounds.top + 150}px`,  // Adjust position as needed
        left: `${quillBounds.left}px`
      };

      // Show toolbar
      this.showToolbar = true;
    } else {
      // Hide toolbar if no text is selected
      this.showToolbar = false;
    }
  }

  formatText(command: string, value: any = true): void {
    this.editor.quillEditor.format(command, value);
    this.showToolbar = false;  // Hide toolbar after formatting
  }

  applySuggestion(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const suggestion = selectElement.value;
  
    if (!suggestion) return;  // Ignore if no suggestion is selected
  
    const quillEditor = this.editor.quillEditor;
    const selection = quillEditor.getSelection();
  
    if (selection) {
      // Replace selected text with the suggestion
      quillEditor.deleteText(selection.index, selection.length);
      quillEditor.insertText(selection.index, suggestion);
    }
  
    this.showToolbar = false;  // Hide toolbar after applying suggestion
  }
  
  

}
