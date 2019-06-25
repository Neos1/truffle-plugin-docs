const template = `
# {{contractName}}
{{#title}}
### {{title}}
{{/title}}
{{#notice}}
> {{notice}}
{{/notice}}
{{#details}}
> {{details}}
{{/details}}

{{#constructor}}
## {{name}}
{{#inputs.length}}
Params:
{{#inputs}}
{{order}}. **{{name}}{{^name}}input_{{index}}{{/name}}** *of type \`{{type}}\`*{{#description}}- {{description}}{{/description}}
{{/inputs}}
{{/inputs.length}}
{{/constructor}}

{{#fallback}}
## {{name}}
{{#attributes.length}}
**Attributes**: {{attributes}}
{{/attributes.length}}
{{/fallback}}

{{#events.length}}
## Events

{{#events}}
### {{fullName}}
#### {{signature}}
{{#inputs.length}}
Params:
{{#inputs}}
{{order}}. **{{name}}** *of type \`{{type}}\`*
{{/inputs}}
{{/inputs.length}}
--- 
{{/events}}
{{/events.length}}

{{#methods.length}}
## Methods
{{#methods}}
### {{fullName}}
#### {{signature}}

{{#notice}}
> {{notice}}
{{/notice}}

{{#details}}
> {{details}}
{{/details}}

{{#attributes.length}}
**Attributes**: {{attributes}}
{{/attributes.length}}

{{#inputs.length}}
Params:
{{#inputs}}
{{order}}. **{{name}}{{^name}}input_{{index}}{{/name}}** *of type \`{{type}}\`*{{#description}}- {{description}}{{/description}}
{{/inputs}}
{{/inputs.length}}

{{#outputs.length}}
Returns:
{{#result}}
> {{result}}
{{/result}}
{{#outputs}}
{{order}}. **{{name}}{{^name}}output_{{index}}{{/name}}** *of type \`{{type}}\`*
{{/outputs}}
{{/outputs.length}}
--- 
{{/methods}}
{{/methods.length}}

[Back to the top ↑](#{{link}})
`;

module.exports = template;
