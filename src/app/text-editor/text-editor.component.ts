// import { HttpClient } from '@angular/common/http';
// import { Component, TemplateRef, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';

// @Component({
//   selector: 'app-text-editor',
//   templateUrl: './text-editor.component.html',
//   styleUrl: './text-editor.component.css'
// })
// export class TextEditorComponent {
//   @ViewChild('suggestionPopover') suggestionPopover!: TemplateRef<any>;
//   suggestions: string[] = [];
//   selectedText = '';
  
//   constructor(private http: HttpClient, private dialog: MatDialog) {}
  
//   onSelectionChange(event: any): void {
//     const selection = event.range;
//     if (selection && selection.length > 0) {
//       const selectedText = event.editor.getText(selection.index, selection.length);
//       this.selectedText = selectedText;
  
//       // Send selected text to backend for suggestions
//       this.getSuggestions(selectedText);
//     }
//   }
  
//   getSuggestions(selectedText: string): void {
//     this.suggestions = ['Hello', 'Hi'];
//           this.openPopover();
//     // this.http.post<string[]>('your-backend-url/suggestions', { text: selectedText })
//     //   .subscribe(
//     //     (data) => {
//     //     },
//     //     (error) => {
//     //       console.error('Error fetching suggestions', error);
//     //     }
//     //   );
//   }
  
//   openPopover(): void {
//     this.dialog.open(this.suggestionPopover, {
//       data: { selectedText: this.selectedText },
//       position: { top: '200px', left: '200px' }  // Adjust as needed for placement
//     });
//   }
//   }

import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, HostListener } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {
  @ViewChild('editor') editor!: QuillEditorComponent;
  showToolbar = false;
  toolbarPosition = { top: '14px', left: '0px' };
  showAISuggestions = false;
  aiPopoverPosition = { top: '0px', left: '0px' };
  suggestions = ['Hello', 'Hi', 'How are you?', 'What is your name?'];
  aiSuggestions = ['AI Suggestion 1', 'AI Suggestion 2', 'AI Suggestion 3'];
  selectedAISuggestion = '';
  selectionRange: any = null;

  constructor(private http: HttpClient) {}

  onSelectionChange(event: any): void {
    const selection = event.range;
    if (selection && selection.length > 0) {
      this.selectionRange = selection;
      const quillBounds = event.editor.getBounds(selection.index, selection.length);
      this.toolbarPosition = {
        top: `${quillBounds.top + 150}px`,
        left: `${quillBounds.left}px`
      };
      this.showToolbar = true;
      // this.showAISuggestions = false;
    } else  {
      this.showToolbar = false;
      this.showAISuggestions = false;
      this.selectionRange = null;
    }
  }

  formatText(command: string, value: any = true): void {
    this.editor.quillEditor.format(command, value);
    this.showToolbar = false;
  }

  applySuggestion(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const suggestion = selectElement.value;
    if (!suggestion) return;
    const quillEditor = this.editor.quillEditor;
    const selection = quillEditor.getSelection();
    if (selection) {
      quillEditor.deleteText(selection.index, selection.length);
      quillEditor.insertText(selection.index, suggestion);
    }
    this.showToolbar = false;
  }

  toggleAISuggestions(event: MouseEvent): void {
    this.showAISuggestions = true;
    this.selectionRange = this.editor.quillEditor.getSelection();
    // this.showAISuggestions = !this.showAISuggestions;
    if (this.showAISuggestions) {
      this.aiPopoverPosition = { ...this.toolbarPosition };
      this.showToolbar = false;
    }
  }

  selectAISuggestion(suggestion: string): void {
    this.selectedAISuggestion = suggestion;
  }

  replaceWithAISuggestion(event: MouseEvent): void {
    event.preventDefault(); 
    event.stopPropagation(); // Add this line
    const quillEditor = this.editor.quillEditor;
    if (this.selectionRange && this.selectedAISuggestion) {
      quillEditor.setSelection(this.selectionRange.index, this.selectionRange.length);
      quillEditor.deleteText(this.selectionRange.index, this.selectionRange.length);
      quillEditor.insertText(this.selectionRange.index, this.selectedAISuggestion);
      this.selectionRange = null;
      this.selectedAISuggestion = '';
      this.hideAISuggestions(event);
      quillEditor.focus(); // Add this line
    }
  }
  

  regenerateAISuggestions(event: MouseEvent): void {
    event.preventDefault(); 
    event.stopPropagation(); // Add this line
    this.aiSuggestions = ['New AI Suggestion 1', 'New AI Suggestion 2', 'New AI Suggestion 3'];
    this.selectedAISuggestion = '';
    this.editor.quillEditor.focus(); // Add this line
  }
  
  hideAISuggestions(event?: MouseEvent): void {
    if (event) {
      event.preventDefault(); 
      event.stopPropagation(); // Add this line
    }
    this.showAISuggestions = false;
    this.selectedAISuggestion = '';
    this.editor.quillEditor.focus(); // Add this line
  }
  
  // @HostListener('document:mousedown', ['$event'])
  // onClickOutside(event: Event): void {
  //   const target = event.target as HTMLElement;
  //   if (
  //     !target.closest('.ai-suggestions-popover') &&
  //     !target.closest('.editor-container')
  //   ) {
  //     this.showToolbar = false;
  //   }
  // }
}
