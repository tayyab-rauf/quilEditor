import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TextEditor2Component } from './text-editor2/text-editor2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'editor1',
    pathMatch: 'full',
  },
  { path: 'editor1', component: TextEditorComponent },
  { path: 'editor2', component: TextEditor2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
