import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  inputText: string = '';
  outputText: string = '';
  inputs: { tag: string, replace: string }[] = [];
  tagList: any[] = [];
  selectAll: boolean = false;

  // Select all checkboxes
  toggleSelectAll() {
    this.selectAll = !this.selectAll;
    this.tagList.forEach((tagObj) => (tagObj.selected = this.selectAll));
  }

  // Check the status of checkboxes (If selected or not for the Select-all Button)
  checkStatus() {
    const selectedCount = this.tagList.filter((tagObj) => tagObj.selected).length;
    this.selectAll = selectedCount > 0;
    console.log('selectAll:', this.selectAll);
  }

  // Add a new tag to the list
  addTag() {
    this.tagList.push({ tag: '', replacement: '', selected: false });
  }

  // Remove the last tag from the list
  removeTag() {
    this.tagList.pop();
  }

  // Determine if some checkboxes are selected (for Minus Sign of Select-all Button)
  someComplete(): boolean {
    const selectedCount = this.tagList.filter((tagObj) => tagObj.selected).length;
    return selectedCount > 0 && selectedCount < this.tagList.length;
  }

  // Replace tags in input text
  replaceTags() {
    let outputText = this.inputText;

    for (const tagObj of this.tagList) {
      const tag = tagObj.tag;
      const replacement = tagObj.replacement;
      const selected = tagObj.selected;

      if (tag && replacement && selected) {
        // Search for {tag} in ABNF format and replace it with the specified replacement
        const tagPattern = new RegExp(`\\{${tag}\\}`, 'g');
        const tagMatches = outputText.match(tagPattern);

        if (tagMatches) {
          for (const match of tagMatches) {
            // Check if the tag is escaped as \{tag}
            if (outputText.includes(`\\${match}`)) {
              outputText = outputText.replace(`\\${match}`, `{${tag}}`);
            } else {
              const replacementWithoutBraces = replacement.replace(/^{(.*)}$/, '$1');
              outputText = outputText.replace(match, replacementWithoutBraces);
            }
          }
        }
      }
    }

    // Correctly handle the case of \\ to be replaced with a single backslash
    outputText = outputText.replace(/\\([^{}\\])/g, "$1");
    this.outputText = outputText;
  }

}
