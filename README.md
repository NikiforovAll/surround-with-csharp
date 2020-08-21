# Surround with CSharp

Brings support of surround-with functionality to vscode for C#. Inspiration comes from from *Visual Studio 2019*.

## Features

* You can surround you code based on two approaches:
  * Trigger snippet insertion as a Command
  * Trigger snippet insertion as a CompletionItem

## Supported Snippets

| Snippet     | Alias      | Keybinding          |
|-------------|------------|---------------------|
| namespace   | #namespace | CTRL+SHIFT+S N      |
| class       | #class     |                     |
| interface   | #interface |                     |
| struct      | #struct    |                     |
| enum        | #enum      |                     |
| if          | #if        | CTRL+SHIFT+S I      |
| dif         | #dif       |                     |
| else        | #else      | CTRL+SHIFT+S E      |
| do          | #do        | CTRL+SHIFT+S D      |
| while       | #while     | CTRL+SHIFT+S W      |
| for         | #for       | CTRL+SHIFT+S F      |
| foreach     | #foreach   | CTRL+SHIFT+S CTRL+F |
| reverse for | #forr      |                     |
| try-catch   | #try       | CTRL+SHIFT+S T      |
| try-finally | #tryf      | CTRL+SHIFT+S CTRL+T |
| lock        | #lock      | CTRL+SHIFT+S L      |
| checked     | #checked   |                     |
| unchecked   | #unchecked |                     |
| unsafe      | #unsafe    |                     |
| using       | #using     |                     |
| region      | #region    |                     |

### Demo: Surround via command

<!-- ![surround-with-csharp-demo1](./images/surr-w-cs-d1.gif) -->
![surr-w-cs-d1](https://user-images.githubusercontent.com/8037439/90891007-af748b80-e3c3-11ea-8b38-435acaad56ce.gif)

### Demo: Surround via CompletionItem

<!-- ![surround-with-csharp-demo1](./images/surr-w-cs-d2.gif) -->
![surr-w-cs-d2](https://user-images.githubusercontent.com/8037439/90891009-b13e4f00-e3c3-11ea-8285-6243d4601a99.gif)

Action             | Alias                          | Shortcut
-------------------|--------------------------------|-------------------------------------
C#: Surround With  | `surround.with`                | `CTRL + SHIFT + S, CTRL + SHIFT + S`
Trigger completion | `editor.action.triggerSuggest` | `CTRL + SPACE`

## Known Issues

## Release Notes

Please see [CHANGELOG.md](./CHANGELOG.md)
