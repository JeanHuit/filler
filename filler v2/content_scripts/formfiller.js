(function() {
  /**
   * Library for generating random data
   */
  const DataGenerator = {
    firstNames: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", 
      "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"],
    
    lastNames: ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
      "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"],
    
    domains: ["example.com", "test.com", "sample.net", "demo.org", "mockup.io", "testing.dev", "fake.info"],
    
    streetNames: ["Main", "Oak", "Park", "Pine", "Maple", "Cedar", "Elm", "Washington", "Lake", "Hill"],
    
    streetTypes: ["St", "Ave", "Blvd", "Rd", "Ln", "Dr", "Way", "Pl", "Ct", "Terrace"],
    
    cities: ["Springfield", "Franklin", "Greenville", "Bristol", "Clinton", "Salem", "Madison", "Georgetown", "Arlington", "Lebanon"],
    
    states: ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD"],
    
    zipCodes: ["12345", "23456", "34567", "45678", "56789", "67890", "78901", "89012", "90123", "01234"],
    
    randomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    
    randomElement: function(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    
    randomString: function(length) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
    
    randomBoolean: function() {
      return Math.random() > 0.5;
    },
    
    randomDate: function(start, end) {
      const startDate = start || new Date(1970, 0, 1);
      const endDate = end || new Date();
      return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    },
    
    randomDateString: function() {
      const date = this.randomDate(new Date(2000, 0, 1), new Date());
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    },
    
    randomEmail: function() {
      const firstName = this.randomElement(this.firstNames).toLowerCase();
      const lastName = this.randomElement(this.lastNames).toLowerCase();
      const domain = this.randomElement(this.domains);
      return `${firstName}.${lastName}@${domain}`;
    },
    
    randomPhone: function() {
      return `${this.randomInt(100, 999)}-${this.randomInt(100, 999)}-${this.randomInt(1000, 9999)}`;
    },
    
    randomFullName: function() {
      return `${this.randomElement(this.firstNames)} ${this.randomElement(this.lastNames)}`;
    },
    
    randomAddress: function() {
      return `${this.randomInt(1, 9999)} ${this.randomElement(this.streetNames)} ${this.randomElement(this.streetTypes)}`;
    },
    
    randomCity: function() {
      return this.randomElement(this.cities);
    },
    
    randomState: function() {
      return this.randomElement(this.states);
    },
    
    randomZipCode: function() {
      return this.randomElement(this.zipCodes);
    },
    
    randomParagraph: function(sentences) {
      const numSentences = sentences || this.randomInt(3, 7);
      const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", 
        "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", 
        "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", 
        "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", 
        "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur"];
      
      let paragraph = '';
      
      for (let i = 0; i < numSentences; i++) {
        const sentenceLength = this.randomInt(5, 15);
        let sentence = '';
        
        for (let j = 0; j < sentenceLength; j++) {
          const word = this.randomElement(words);
          sentence += j === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
          sentence += j < sentenceLength - 1 ? ' ' : '.';
        }
        
        paragraph += sentence + ' ';
      }
      
      return paragraph.trim();
    },
    
    randomURL: function() {
      return `https://www.${this.randomElement(this.domains)}/${this.randomString(8)}`;
    },
    
    randomColor: function() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    
    randomUsername: function() {
      const firstName = this.randomElement(this.firstNames);
      return firstName.toLowerCase() + this.randomInt(10, 999);
    },
    
    randomPassword: function(length) {
      const passwordLength = length || 12;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
      let password = '';
      for (let i = 0; i < passwordLength; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return password;
    },
    
    randomCreditCard: function() {
      // This generates a random format, NOT a valid credit card number
      const prefixes = ["4", "5", "37", "34", "6011"];
      const prefix = this.randomElement(prefixes);
      let number = prefix;
      
      while (number.length < 16) {
        number += this.randomInt(0, 9);
      }
      
      return number;
    }
  };
  
  /**
   * Main form filler functionality
   */
  const FormFiller = {
    /**
     * Fill a specific form element based on its attributes
     */
    fillField: function(field) {
      // Skip hidden fields, submit buttons, and already filled fields with values
      if (field.type === "hidden" || field.type === "submit" || field.type === "button" || field.type === "reset") {
        return;
      }
      
      // Handle different input types
      switch (field.type) {
        case "text":
          this.fillTextField(field);
          break;
        case "email":
          field.value = DataGenerator.randomEmail();
          break;
        case "tel":
          field.value = DataGenerator.randomPhone();
          break;
        case "password":
          field.value = DataGenerator.randomPassword();
          break;
        case "url":
          field.value = DataGenerator.randomURL();
          break;
        case "number":
          this.fillNumberField(field);
          break;
        case "date":
          field.value = DataGenerator.randomDateString();
          break;
        case "checkbox":
        case "radio":
          field.checked = DataGenerator.randomBoolean();
          break;
        case "color":
          field.value = DataGenerator.randomColor();
          break;
        case "range":
          const min = parseInt(field.min) || 0;
          const max = parseInt(field.max) || 100;
          field.value = DataGenerator.randomInt(min, max);
          break;
        default:
          // Handle selects and textareas
          if (field.tagName === 'SELECT') {
            this.fillSelectField(field);
          } else if (field.tagName === 'TEXTAREA') {
            // Always fill textareas with random content, even if they already have some content
            field.value = DataGenerator.randomParagraph(3);
          } else {
            // Default to filling with some random text
            field.value = DataGenerator.randomString(10);
          }
      }
      
      // Trigger change event
      field.dispatchEvent(new Event('change', { bubbles: true }));
      field.dispatchEvent(new Event('input', { bubbles: true }));
    },
    
    /**
     * Fill a text field based on its name, id, or placeholder
     */
    fillTextField: function(field) {
      const attr = (field.name || '').toLowerCase() + ' ' + 
                 (field.id || '').toLowerCase() + ' ' + 
                 (field.placeholder || '').toLowerCase() + ' ' + 
                 (field.className || '').toLowerCase();
      
      // Check for common field names
      if (/name|full.?name/i.test(attr)) {
        field.value = DataGenerator.randomFullName();
      } 
      else if (/first.?name|fname|given.?name/i.test(attr)) {
        field.value = DataGenerator.randomElement(DataGenerator.firstNames);
      } 
      else if (/last.?name|lname|surname|family.?name/i.test(attr)) {
        field.value = DataGenerator.randomElement(DataGenerator.lastNames);
      } 
      else if (/address|street/i.test(attr)) {
        field.value = DataGenerator.randomAddress();
      } 
      else if (/city/i.test(attr)) {
        field.value = DataGenerator.randomCity();
      } 
      else if (/state|province/i.test(attr)) {
        field.value = DataGenerator.randomState();
      } 
      else if (/zip|postal/i.test(attr)) {
        field.value = DataGenerator.randomZipCode();
      } 
      else if (/phone|mobile|cell/i.test(attr)) {
        field.value = DataGenerator.randomPhone();
      } 
      else if (/username|user.?id|login/i.test(attr)) {
        field.value = DataGenerator.randomUsername();
      } 
      else if (/search/i.test(attr)) {
        field.value = DataGenerator.randomString(6);
      }
      else if (/cc|credit|card|payment/i.test(attr)) {
        field.value = DataGenerator.randomCreditCard();
      }
      else {
        // If field is short (likely not a paragraph), use a shorter string
        if (field.size && field.size < 20 || field.maxLength && field.maxLength < 20) {
          field.value = DataGenerator.randomString(Math.min(field.size || field.maxLength || 10, 10));
        } else {
          field.value = DataGenerator.randomString(10);
        }
      }
    },
    
    /**
     * Fill a number field respecting min/max values
     */
    fillNumberField: function(field) {
      let min = field.min !== "" ? parseInt(field.min) : 0;
      let max = field.max !== "" ? parseInt(field.max) : 1000;
      
      // Check for common number fields
      const attr = (field.name || '').toLowerCase() + ' ' + 
                 (field.id || '').toLowerCase() + ' ' + 
                 (field.placeholder || '').toLowerCase();
      
      if (/age/i.test(attr)) {
        min = Math.max(min, 18);
        max = Math.min(max, 80);
      } else if (/year/i.test(attr)) {
        min = Math.max(min, 1950);
        max = Math.min(max, new Date().getFullYear());
      } else if (/month/i.test(attr)) {
        min = Math.max(min, 1);
        max = Math.min(max, 12);
      } else if (/day/i.test(attr)) {
        min = Math.max(min, 1);
        max = Math.min(max, 31);
      }
      
      field.value = DataGenerator.randomInt(min, max);
    },
    
    /**
     * Fill a select field by choosing a random option
     */
    fillSelectField: function(field) {
      const options = field.querySelectorAll('option');
      if (options.length > 1) {
        // Skip the first option if it seems like a placeholder
        const startIndex = options[0].text === "" || 
                         options[0].value === "" || 
                         /select|choose|pick/i.test(options[0].text) ? 1 : 0;
        
        if (options.length > startIndex) {
          const randomIndex = DataGenerator.randomInt(startIndex, options.length - 1);
          field.selectedIndex = randomIndex;
        }
      }
    },
    
    /**
     * Fill TinyMCE editors with random content
     */
    fillTinyMCEEditors: function() {
      // Check if TinyMCE is available on the page
      if (typeof window.tinymce !== 'undefined') {
        const editors = window.tinymce.editors;
        let filledCount = 0;
        
        // Iterate through all TinyMCE instances
        for (let i = 0; i < editors.length; i++) {
          const editor = editors[i];
          if (editor && editor.initialized) {
            // Generate random paragraphs
            const content = DataGenerator.randomParagraph(5);
            
            // Set content in the editor
            editor.setContent(content);
            
            // Trigger change event
            editor.fire('change');
            filledCount++;
          }
        }
        
        console.log(`FormFiller: Filled ${filledCount} TinyMCE editors with random data.`);
        return filledCount;
      }
      return 0;
    },
    
    /**
     * Handle other rich text editors (CKEditor, Quill, etc.)
     */
    fillOtherRichTextEditors: function() {
      let filledCount = 0;
      
      // Try to detect CKEditor instances
      if (typeof window.CKEDITOR !== 'undefined') {
        for (const name in window.CKEDITOR.instances) {
          const editor = window.CKEDITOR.instances[name];
          editor.setData(DataGenerator.randomParagraph(4));
          filledCount++;
        }
        console.log(`FormFiller: Filled ${filledCount} CKEditor instances with random data.`);
      }
      
      // Try to detect Quill editor instances
      const quillEditors = document.querySelectorAll('.ql-editor');
      quillEditors.forEach(editor => {
        editor.innerHTML = `<p>${DataGenerator.randomParagraph(3)}</p>`;
        editor.dispatchEvent(new Event('input', { bubbles: true }));
        filledCount++;
      });
      
      // Try to detect trix editor (used by ActionText in Rails)
      const trixEditors = document.querySelectorAll('trix-editor');
      trixEditors.forEach(editor => {
        editor.editor.loadHTML(`<div>${DataGenerator.randomParagraph(3)}</div>`);
        filledCount++;
      });
      
      return filledCount;
    },
    
    /**
     * Fill all form fields on the page
     */
    fillAllFields: function() {
      // First, get all regular textareas and forcefully fill them
      const textareas = document.querySelectorAll('textarea');
      textareas.forEach(textarea => {
        textarea.value = DataGenerator.randomParagraph(3);
        
        // Fire multiple events to ensure the change is recognized
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
        textarea.dispatchEvent(new Event('keyup', { bubbles: true }));
        textarea.dispatchEvent(new Event('keydown', { bubbles: true }));
      });
      
      console.log(`FormFiller: Force-filled ${textareas.length} textareas with random data.`);
      
      // Get all other input and select elements
      const otherFields = document.querySelectorAll('input, select');
      
      otherFields.forEach(field => {
        this.fillField(field);
      });
      
      // Handle TinyMCE and other rich text editors
      const tinyMCECount = this.fillTinyMCEEditors();
      const otherRichTextCount = this.fillOtherRichTextEditors();
      
      // Handle iframes with the TinyMCE class (for older TinyMCE versions)
      const tinyMCEIframes = document.querySelectorAll('iframe[class*="mce"]');
      tinyMCEIframes.forEach(iframe => {
        try {
          const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
          const body = iframeDocument.body;
          if (body) {
            body.innerHTML = DataGenerator.randomParagraph(4);
            body.dispatchEvent(new Event('input', { bubbles: true }));
          }
        } catch (e) {
          console.error('FormFiller: Error accessing iframe content', e);
        }
      });
      
      // Handle textarea elements that might be hidden or part of complex components
      const hiddenTextareas = document.querySelectorAll('textarea[style*="display: none"], textarea[style*="visibility: hidden"]');
      hiddenTextareas.forEach(textarea => {
        textarea.value = DataGenerator.randomParagraph(2);
        // Fire the events again
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
      });
      
      console.log(`FormFiller: Filled ${otherFields.length} standard form fields, ${tinyMCECount} TinyMCE editors, and ${otherRichTextCount} other rich text editors with random data.`);
    }
  };
  
  // Listen for messages from the popup
  // Listen for messages from the popup
  browser.runtime.onMessage.addListener((message) => {
    if (message.action === "fillForms") {
      // Wait for a short time to ensure all editors are fully initialized
      setTimeout(() => {
        FormFiller.fillAllFields();
        
        // Additional attempt to fill textareas after a short delay
        // Some frameworks might reinitialize textareas or have delayed loading
        setTimeout(() => {
          // Retry filling all textareas
          const textareas = document.querySelectorAll('textarea');
          textareas.forEach(textarea => {
            if (!textarea.value || textarea.value.trim() === '') {
              textarea.value = DataGenerator.randomParagraph(3);
              textarea.dispatchEvent(new Event('input', { bubbles: true }));
              textarea.dispatchEvent(new Event('change', { bubbles: true }));
            }
          });
          
          console.log(`FormFiller: Second pass completed - rechecked ${textareas.length} textareas.`);
        }, 1000);
      }, 500);
      
      return Promise.resolve({status: "success"});
    }
  });
})();
