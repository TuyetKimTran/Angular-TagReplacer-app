import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  inputText: string = '';
  outputText: string = ''; // Variable to store the modified text.
  inputs: { tag: string, replace: string }[] = [];
  // Method to modify the input text.
  // tagList: { tag: string, replacement: string, selected: boolean }[] = [];
  // selectAll = false;
  tagList: any[] = []; // Define your tag list here
  selectAll: boolean = false; // Initialize selectAll to false

  // Toggle select all checkboxes
  toggleSelectAll() {
    this.selectAll = !this.selectAll;
  
    this.tagList.forEach((tagObj) => (tagObj.selected = this.selectAll));

  }
  

  checkStatus() {
    const selectedCount = this.tagList.filter((tagObj) => tagObj.selected).length;
    if (selectedCount == 0 ) {
      this.selectAll = false;
    } else {
          this.selectAll = true;
    }
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

  // Function to determine if some checkboxes are selected
  someComplete(): boolean {
    const selectedCount = this.tagList.filter((tagObj) => tagObj.selected).length;
    return selectedCount > 0 && selectedCount < this.tagList.length;

  }
  
    replaceTags() {
    let outputText = this.inputText;
  
    for (const tagObj of this.tagList) {
      const tag = tagObj.tag;
      const replacement = tagObj.replacement;
      const selected = tagObj.selected;   // checkbox
  
      if (tag && replacement && selected) {
        // Sucht nach {tag} in ABNF-Format und ersetzt es mit der angegebenen Ersetzung
        const tagPattern = new RegExp(`\\{${tag}\\}`, 'g');
        const tagMatches = outputText.match(tagPattern);
  
        if (tagMatches) {
          for (const match of tagMatches) {
              // Überprüfe, ob das Tag durch \{tag} escaped ist
              if (outputText.includes(`\\${match}`)) {
                outputText = outputText.replace(`\\${match}`, `{${tag}}`);
              } else {
                const replacementWithoutBraces = replacement.replace(/^{(.*)}$/, '$1');
                outputText = outputText.replace(match, replacementWithoutBraces);

                // outputText = outputText.replace(match, replacement);
              }

          }
        }
      }
    }
    outputText = outputText.replace(/\\([^{}\\])/g, "$1");
    // Correctly handle the case of \\ to be replaced with a single backslash
    outputText = outputText.replace(/\\\\+/g, "\\");

  
  
    this.outputText = outputText;
  }
  

  

  addInputFields() {
    this.inputs.push({ tag: '', replace: '' });
  }

  }

